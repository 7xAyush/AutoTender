from pathlib import Path
from shutil import copyfileobj

from fastapi import Depends, FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func
from sqlalchemy.orm import Session, joinedload

from database import Base, engine, get_db
from models import Criterion, EvaluationReport, Tender, Vendor
from schemas import (
    CriterionResponse,
    CriterionUpdate,
    DashboardSummary,
    EvaluationReportResponse,
    EvaluationRequest,
    TenderResponse,
    UploadTenderResponse,
    VendorCreate,
    VendorResponse,
)
from services.extractor import extract_criteria_from_document
from services.report_generator import deserialize_report, serialize_report
from services.rule_engine import evaluate_vendor


app = FastAPI(title="AutoTender API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path(__file__).resolve().parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)
Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "AutoTender backend is running"}


@app.post("/upload-tender", response_model=UploadTenderResponse)
def upload_tender(
    title: str = Form(...),
    department: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    file_path = UPLOAD_DIR / file.filename
    with file_path.open("wb") as buffer:
        copyfileobj(file.file, buffer)

    tender = Tender(
        title=title,
        department=department,
        file_name=file.filename,
        file_path=str(file_path),
        status="processed",
    )
    db.add(tender)
    db.commit()
    db.refresh(tender)

    extracted = extract_criteria_from_document(str(file_path), title, department)
    criteria_records = []
    for item in extracted:
        payload = dict(item)
        payload["value"] = str(payload["value"])
        criterion = Criterion(tender_id=tender.id, **payload)
        db.add(criterion)
        criteria_records.append(criterion)

    db.commit()
    for criterion in criteria_records:
        db.refresh(criterion)
    db.refresh(tender)

    return {"tender": tender, "extracted_criteria": criteria_records}


@app.get("/tenders", response_model=list[TenderResponse])
def list_tenders(db: Session = Depends(get_db)):
    return db.query(Tender).options(joinedload(Tender.criteria)).order_by(Tender.created_at.desc()).all()


@app.get("/tenders/{tender_id}", response_model=TenderResponse)
def get_tender(tender_id: int, db: Session = Depends(get_db)):
    tender = (
        db.query(Tender)
        .options(joinedload(Tender.criteria))
        .filter(Tender.id == tender_id)
        .first()
    )
    if not tender:
        raise HTTPException(status_code=404, detail="Tender not found")
    return tender


@app.put("/criteria/{criterion_id}", response_model=CriterionResponse)
def update_criterion(criterion_id: int, payload: CriterionUpdate, db: Session = Depends(get_db)):
    criterion = db.query(Criterion).filter(Criterion.id == criterion_id).first()
    if not criterion:
        raise HTTPException(status_code=404, detail="Criterion not found")

    for key, value in payload.model_dump().items():
        if key == "value":
            value = str(value)
        setattr(criterion, key, value)

    db.commit()
    db.refresh(criterion)
    return criterion


@app.post("/vendors", response_model=VendorResponse)
def create_vendor(payload: VendorCreate, db: Session = Depends(get_db)):
    vendor = Vendor(**payload.model_dump())
    db.add(vendor)
    db.commit()
    db.refresh(vendor)
    return vendor


@app.get("/vendors", response_model=list[VendorResponse])
def list_vendors(db: Session = Depends(get_db)):
    return db.query(Vendor).order_by(Vendor.created_at.desc()).all()


@app.post("/evaluate", response_model=EvaluationReportResponse)
def evaluate(payload: EvaluationRequest, db: Session = Depends(get_db)):
    tender = (
        db.query(Tender)
        .options(joinedload(Tender.criteria))
        .filter(Tender.id == payload.tender_id)
        .first()
    )
    if not tender:
        raise HTTPException(status_code=404, detail="Tender not found")

    vendor = db.query(Vendor).filter(Vendor.id == payload.vendor_id).first()
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")

    verdict, confidence, criteria_results, audit_trail, summary_reason = evaluate_vendor(
        tender.criteria, vendor
    )
    serialized_results, serialized_audit = serialize_report(criteria_results, audit_trail)

    report = EvaluationReport(
        tender_id=tender.id,
        vendor_id=vendor.id,
        verdict=verdict,
        confidence_score=confidence,
        summary_reason=summary_reason,
        criteria_results=serialized_results,
        audit_trail=serialized_audit,
    )
    db.add(report)
    db.commit()
    db.refresh(report)

    result_payload, audit_payload = deserialize_report(report.criteria_results, report.audit_trail)
    return {
        "id": report.id,
        "tender_id": report.tender_id,
        "vendor_id": report.vendor_id,
        "verdict": report.verdict,
        "confidence_score": report.confidence_score,
        "summary_reason": report.summary_reason,
        "criteria_results": result_payload,
        "audit_trail": audit_payload,
        "created_at": report.created_at,
    }


@app.get("/reports/{report_id}", response_model=EvaluationReportResponse)
def get_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(EvaluationReport).filter(EvaluationReport.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    result_payload, audit_payload = deserialize_report(report.criteria_results, report.audit_trail)
    return {
        "id": report.id,
        "tender_id": report.tender_id,
        "vendor_id": report.vendor_id,
        "verdict": report.verdict,
        "confidence_score": report.confidence_score,
        "summary_reason": report.summary_reason,
        "criteria_results": result_payload,
        "audit_trail": audit_payload,
        "created_at": report.created_at,
    }


@app.get("/dashboard/summary", response_model=DashboardSummary)
def dashboard_summary(db: Session = Depends(get_db)):
    total_tenders = db.query(func.count(Tender.id)).scalar() or 0
    total_vendors = db.query(func.count(Vendor.id)).scalar() or 0
    passed_vendors = db.query(EvaluationReport).filter(EvaluationReport.verdict == "Pass").count()
    failed_vendors = db.query(EvaluationReport).filter(EvaluationReport.verdict == "Fail").count()

    recent_reports = (
        db.query(EvaluationReport, Vendor.vendor_name, Tender.title)
        .join(Vendor, Vendor.id == EvaluationReport.vendor_id)
        .join(Tender, Tender.id == EvaluationReport.tender_id)
        .order_by(EvaluationReport.created_at.desc())
        .limit(10)
        .all()
    )

    recent_evaluations = [
        {
            "report_id": report.id,
            "vendor_name": vendor_name,
            "tender_title": tender_title,
            "verdict": report.verdict,
            "confidence_score": report.confidence_score,
            "created_at": report.created_at,
        }
        for report, vendor_name, tender_title in recent_reports
    ]

    return {
        "total_tenders_uploaded": total_tenders,
        "total_vendors_evaluated": total_vendors,
        "passed_vendors": passed_vendors,
        "failed_vendors": failed_vendors,
        "recent_evaluations": recent_evaluations,
    }

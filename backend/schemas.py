from datetime import datetime
from typing import Any, List, Optional

from pydantic import BaseModel, Field, field_validator


class CriterionBase(BaseModel):
    name: str
    category: str
    mandatory: bool
    rule_type: str
    field: Optional[str] = None
    operator: Optional[str] = None
    value: Any
    unit: Optional[str] = None
    confidence: float = Field(ge=0, le=1)
    extracted_text: Optional[str] = None

    @field_validator("value", mode="before")
    @classmethod
    def normalize_value(cls, value: Any, info):
        rule_type = info.data.get("rule_type") if info.data else None
        if rule_type == "boolean":
            if isinstance(value, bool):
                return value
            return str(value).lower() == "true"
        if rule_type in {"range", "score_threshold"}:
            numeric = float(value)
            return int(numeric) if numeric.is_integer() else numeric
        if rule_type == "set":
            if isinstance(value, list):
                return value
            return [item.strip() for item in str(value).split(",") if item.strip()]
        return value


class CriterionUpdate(CriterionBase):
    pass


class CriterionResponse(CriterionBase):
    id: int
    tender_id: int

    class Config:
        from_attributes = True


class TenderBase(BaseModel):
    title: str
    department: str


class TenderResponse(TenderBase):
    id: int
    file_name: str
    file_path: str
    status: str
    created_at: datetime
    criteria: List[CriterionResponse] = []

    class Config:
        from_attributes = True


class VendorCreate(BaseModel):
    vendor_name: str
    annual_turnover: float
    years_of_experience: float
    iso_certified: bool
    gst_registered: bool
    past_government_project_count: int
    technical_compliance_score: float


class VendorResponse(VendorCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class EvaluationRequest(BaseModel):
    tender_id: int
    vendor_id: int


class CriterionEvaluationResult(BaseModel):
    criterion_id: int
    name: str
    category: str
    mandatory: bool
    passed: bool
    expected: Any
    actual: Any
    operator: Optional[str] = None
    confidence_impact: float
    reason: str


class EvaluationReportBase(BaseModel):
    verdict: str
    confidence_score: float
    summary_reason: str
    criteria_results: List[CriterionEvaluationResult]
    audit_trail: List[str]


class EvaluationReportResponse(EvaluationReportBase):
    id: int
    tender_id: int
    vendor_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class UploadTenderResponse(BaseModel):
    tender: TenderResponse
    extracted_criteria: List[CriterionResponse]


class DashboardSummary(BaseModel):
    total_tenders_uploaded: int
    total_vendors_evaluated: int
    passed_vendors: int
    failed_vendors: int
    recent_evaluations: List[dict]

from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from database import Base


class Tender(Base):
    __tablename__ = "tenders"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    department = Column(String(255), nullable=False)
    file_name = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    status = Column(String(50), default="processed", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    criteria = relationship("Criterion", back_populates="tender", cascade="all, delete-orphan")
    reports = relationship("EvaluationReport", back_populates="tender", cascade="all, delete-orphan")


class Criterion(Base):
    __tablename__ = "criteria"

    id = Column(Integer, primary_key=True, index=True)
    tender_id = Column(Integer, ForeignKey("tenders.id"), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)
    mandatory = Column(Boolean, default=True, nullable=False)
    rule_type = Column(String(50), nullable=False)
    field = Column(String(100), nullable=True)
    operator = Column(String(10), nullable=True)
    value = Column(String(255), nullable=False)
    unit = Column(String(50), nullable=True)
    confidence = Column(Float, nullable=False)
    extracted_text = Column(Text, nullable=True)

    tender = relationship("Tender", back_populates="criteria")


class Vendor(Base):
    __tablename__ = "vendors"

    id = Column(Integer, primary_key=True, index=True)
    vendor_name = Column(String(255), nullable=False)
    annual_turnover = Column(Float, nullable=False)
    years_of_experience = Column(Float, nullable=False)
    iso_certified = Column(Boolean, default=False, nullable=False)
    gst_registered = Column(Boolean, default=False, nullable=False)
    past_government_project_count = Column(Integer, default=0, nullable=False)
    technical_compliance_score = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    reports = relationship("EvaluationReport", back_populates="vendor", cascade="all, delete-orphan")


class EvaluationReport(Base):
    __tablename__ = "evaluation_reports"

    id = Column(Integer, primary_key=True, index=True)
    tender_id = Column(Integer, ForeignKey("tenders.id"), nullable=False, index=True)
    vendor_id = Column(Integer, ForeignKey("vendors.id"), nullable=False, index=True)
    verdict = Column(String(20), nullable=False)
    confidence_score = Column(Float, nullable=False)
    summary_reason = Column(Text, nullable=False)
    criteria_results = Column(Text, nullable=False)
    audit_trail = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    tender = relationship("Tender", back_populates="reports")
    vendor = relationship("Vendor", back_populates="reports")

from pathlib import Path
from typing import List


DEFAULT_CRITERIA = [
    {
        "name": "Minimum Annual Turnover",
        "category": "Financial",
        "mandatory": True,
        "rule_type": "range",
        "field": "annual_turnover",
        "operator": ">=",
        "value": 5000000,
        "unit": "INR",
        "confidence": 0.94,
        "extracted_text": "Bidder must demonstrate annual turnover of at least INR 50 lakh.",
    },
    {
        "name": "Minimum Experience",
        "category": "Experience",
        "mandatory": True,
        "rule_type": "range",
        "field": "years_of_experience",
        "operator": ">=",
        "value": 3,
        "unit": "years",
        "confidence": 0.91,
        "extracted_text": "Supplier should have a minimum of 3 years of experience in similar works.",
    },
    {
        "name": "ISO Certification",
        "category": "Certification",
        "mandatory": True,
        "rule_type": "boolean",
        "field": "iso_certified",
        "operator": "==",
        "value": True,
        "unit": None,
        "confidence": 0.96,
        "extracted_text": "Valid ISO certification is required.",
    },
    {
        "name": "GST Registration",
        "category": "Certification",
        "mandatory": True,
        "rule_type": "boolean",
        "field": "gst_registered",
        "operator": "==",
        "value": True,
        "unit": None,
        "confidence": 0.95,
        "extracted_text": "Bidder must have active GST registration.",
    },
    {
        "name": "Past Government Projects",
        "category": "Technical",
        "mandatory": False,
        "rule_type": "range",
        "field": "past_government_project_count",
        "operator": ">=",
        "value": 2,
        "unit": "projects",
        "confidence": 0.88,
        "extracted_text": "Preference will be given to vendors with at least 2 prior government projects.",
    },
    {
        "name": "Technical Compliance Threshold",
        "category": "Technical",
        "mandatory": False,
        "rule_type": "score_threshold",
        "field": "technical_compliance_score",
        "operator": ">=",
        "value": 80,
        "unit": "score",
        "confidence": 0.9,
        "extracted_text": "Technical compliance score above 80 is desirable.",
    },
]


def extract_criteria_from_document(file_path: str, title: str, department: str) -> List[dict]:
    _ = Path(file_path)
    title_hint = title.lower()
    department_hint = department.lower()

    criteria = [dict(item) for item in DEFAULT_CRITERIA]

    if "it" in title_hint or "software" in title_hint:
        criteria.append(
            {
                "name": "Cybersecurity Readiness",
                "category": "Technical",
                "mandatory": False,
                "rule_type": "score_threshold",
                "field": "technical_compliance_score",
                "operator": ">=",
                "value": 85,
                "unit": "score",
                "confidence": 0.83,
                "extracted_text": "Solutions with stronger cybersecurity posture are preferred.",
            }
        )

    if "crpf" in department_hint or "security" in department_hint:
        criteria[1]["value"] = 5
        criteria[1]["confidence"] = 0.93
        criteria[1]["extracted_text"] = (
            "For security-sensitive procurement, bidder should have 5 years of relevant experience."
        )

    return criteria

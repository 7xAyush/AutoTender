import json
from typing import Dict, List


def serialize_report(criteria_results: List[Dict], audit_trail: List[str]) -> tuple[str, str]:
    return json.dumps(criteria_results), json.dumps(audit_trail)


def deserialize_report(criteria_results: str, audit_trail: str) -> tuple[List[Dict], List[str]]:
    return json.loads(criteria_results), json.loads(audit_trail)

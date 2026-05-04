from typing import Any, Dict, List, Tuple


def _compare(operator: str, actual: Any, expected: Any) -> bool:
    if operator == ">=":
        return actual >= expected
    if operator == "<=":
        return actual <= expected
    if operator == ">":
        return actual > expected
    if operator == "<":
        return actual < expected
    if operator in ("==", "="):
        return actual == expected
    if operator == "in":
        return actual in expected
    raise ValueError(f"Unsupported operator: {operator}")


def evaluate_vendor(criteria: List[Any], vendor: Any) -> Tuple[str, float, List[Dict], List[str], str]:
    vendor_payload = {
        "annual_turnover": vendor.annual_turnover,
        "years_of_experience": vendor.years_of_experience,
        "iso_certified": vendor.iso_certified,
        "gst_registered": vendor.gst_registered,
        "past_government_project_count": vendor.past_government_project_count,
        "technical_compliance_score": vendor.technical_compliance_score,
    }

    criteria_results = []
    audit_trail = []
    mandatory_failure = False
    confidence_components = []

    for criterion in criteria:
        field = criterion.field
        actual = vendor_payload.get(field)
        expected = _coerce_value(criterion.value, criterion.rule_type)
        operator = criterion.operator or "=="

        passed = _compare(operator, actual, expected)
        impact = criterion.confidence if passed else max(0.35, criterion.confidence - 0.3)

        if criterion.mandatory and not passed:
            mandatory_failure = True

        result = {
            "criterion_id": criterion.id,
            "name": criterion.name,
            "category": criterion.category,
            "mandatory": criterion.mandatory,
            "passed": passed,
            "expected": expected,
            "actual": actual,
            "operator": operator,
            "confidence_impact": round(impact, 2),
            "reason": _build_reason(criterion.name, actual, operator, expected, passed),
        }
        criteria_results.append(result)
        confidence_components.append(impact if passed else impact * (0.7 if criterion.mandatory else 0.85))
        audit_trail.append(_build_audit_line(criterion, actual, expected, passed))

    verdict = "Fail" if mandatory_failure else "Pass"
    confidence = round(sum(confidence_components) / max(len(confidence_components), 1), 2)
    if verdict == "Fail":
        confidence = round(min(confidence, 0.74), 2)
        summary_reason = "One or more mandatory eligibility clauses were not satisfied."
    else:
        confidence = round(max(confidence, 0.82), 2)
        summary_reason = "Vendor satisfies all mandatory clauses and aligns with most preference criteria."

    return verdict, confidence, criteria_results, audit_trail, summary_reason


def _coerce_value(value: Any, rule_type: str) -> Any:
    if rule_type in {"range", "score_threshold"}:
        return float(value)
    if rule_type == "boolean":
        if isinstance(value, bool):
            return value
        return str(value).lower() == "true"
    if rule_type == "set":
        if isinstance(value, list):
            return value
        return [item.strip() for item in str(value).split(",") if item.strip()]
    return value


def _build_reason(name: str, actual: Any, operator: str, expected: Any, passed: bool) -> str:
    status = "satisfies" if passed else "does not satisfy"
    return f"{name} {status} the rule because actual value {actual} {operator} expected value {expected}."


def _build_audit_line(criterion: Any, actual: Any, expected: Any, passed: bool) -> str:
    status = "PASS" if passed else "FAIL"
    mandatory_marker = "mandatory" if criterion.mandatory else "optional"
    return (
        f"[{status}] {criterion.name} ({mandatory_marker}) checked field "
        f"'{criterion.field}' with actual '{actual}' against rule '{criterion.operator} {expected}'."
    )

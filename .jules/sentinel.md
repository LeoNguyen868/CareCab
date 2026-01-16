## 2024-05-23 - Hardcoded Email Credentials
**Vulnerability:** Found valid Gmail app password hardcoded in `backend/Utils/base.py`.
**Learning:** Credentials were likely added for local testing and never externalized. The codebase lacked secret scanning.
**Prevention:** Enforce use of environment variables for all sensitive data. Implement pre-commit hooks to detect potential secrets.

## 2024-05-24 - Unauthenticated Password Reset
**Vulnerability:** `change_password` endpoint allowed changing passwords without old password verification or session checks.
**Learning:** API endpoints are implementing business logic without enforcing authorization or authentication checks (IDOR/Auth Bypass). Pydantic models were used for input but not for enforcing security constraints (like old password).
**Prevention:** Ensure all sensitive state-changing operations verify current credentials (old password) and session validity.

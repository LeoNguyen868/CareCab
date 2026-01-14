## 2024-05-23 - Hardcoded Email Credentials
**Vulnerability:** Found valid Gmail app password hardcoded in `backend/Utils/base.py`.
**Learning:** Credentials were likely added for local testing and never externalized. The codebase lacked secret scanning.
**Prevention:** Enforce use of environment variables for all sensitive data. Implement pre-commit hooks to detect potential secrets.

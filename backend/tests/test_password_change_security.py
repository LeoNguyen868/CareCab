import unittest
import sys
import os
import asyncio
from unittest.mock import patch, AsyncMock, MagicMock

# Setup paths
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi.testclient import TestClient
from backend.main import app

# Mock security functions
# We need to mock verify_password and get_password_hash in the router
# The router imports them from Utils.security
from backend.Utils import security

class TestPasswordChangeSecurity(unittest.TestCase):
    def setUp(self):
        app.router.on_startup = []
        self.client = TestClient(app)

    @patch('Routers.auth_router.User')
    @patch('Routers.auth_router.verify_password')
    @patch('Routers.auth_router.get_password_hash')
    def test_password_change_flow(self, mock_get_hash, mock_verify, mock_user_model):
        """
        Verify the fix:
        1. Correct old password -> Success
        2. Incorrect old password -> Failure
        3. Pass-the-hash attempt -> Failure
        """
        # --- Setup Mock User ---
        mock_user = MagicMock()
        mock_user.password_hash = "$2b$12$hashed_old_password" # Simulate a bcrypt hash
        mock_user.save = AsyncMock()

        future = asyncio.Future()
        future.set_result(mock_user)
        mock_user_model.get_or_none.return_value = future

        # --- Test Case 1: Correct Credentials ---
        mock_verify.return_value = True # verify_password returns True
        mock_get_hash.return_value = "hashed_new_password"

        payload = {
            "email": "user@example.com",
            "old_password": "correct_old_password",
            "new_password": "new_password_123"
        }

        response = self.client.post("/auth/change_password", json=payload)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Password changed successfully"})
        mock_user.save.assert_called_once()
        self.assertEqual(mock_user.password_hash, "hashed_new_password")

        # --- Test Case 2: Incorrect Old Password ---
        # Reset mocks
        mock_user.save.reset_mock()
        mock_user.password_hash = "$2b$12$hashed_old_password"
        mock_verify.return_value = False # verify_password returns False

        payload_wrong = {
            "email": "user@example.com",
            "old_password": "wrong_password",
            "new_password": "new_password_123"
        }

        response = self.client.post("/auth/change_password", json=payload_wrong)

        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json(), {"detail": "Invalid old password"})
        mock_user.save.assert_not_called()

        # --- Test Case 3: Pass-the-Hash Attempt ---
        # Attacker tries to use the hash itself as the password
        mock_user.save.reset_mock()
        mock_user.password_hash = "$2b$12$hashed_old_password"
        mock_verify.return_value = False # hashing the hash != hash

        payload_pth = {
            "email": "user@example.com",
            "old_password": "$2b$12$hashed_old_password", # The hash itself
            "new_password": "new_password_123"
        }

        response = self.client.post("/auth/change_password", json=payload_pth)

        # Before fix, this would return 200 because string equality matches.
        # After fix, it should return 401 because checks if is_bcrypt is True.
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json(), {"detail": "Invalid old password"})
        mock_user.save.assert_not_called()

        # --- Test Case 4: Legacy Plaintext Password ---
        # If the DB has a plaintext password (no bcrypt prefix), equality check should work.
        mock_user.save.reset_mock()
        mock_user.password_hash = "legacy_password" # Not bcrypt
        mock_verify.return_value = False # verify_password assumes bcrypt, so it returns False

        payload_legacy = {
            "email": "user@example.com",
            "old_password": "legacy_password",
            "new_password": "new_password_123"
        }

        response = self.client.post("/auth/change_password", json=payload_legacy)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Password changed successfully"})
        mock_user.save.assert_called_once()

    def test_validation_error(self):
        """Test that request fails if old_password is missing"""
        payload = {
            "email": "victim@example.com",
            "new_password": "hacked_password"
        }
        response = self.client.post("/auth/change_password", json=payload)
        self.assertEqual(response.status_code, 422) # Unprocessable Entity (Missing field)

if __name__ == '__main__':
    unittest.main()

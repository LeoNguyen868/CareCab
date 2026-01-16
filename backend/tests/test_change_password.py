import unittest
import os
import sys
from unittest.mock import patch, AsyncMock, MagicMock
from fastapi import HTTPException

# Add backend directory to sys.path so imports work as they do in the app
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from Routers.auth_router import change_password
from pydanticModels import ChangePassword

class TestChangePasswordVulnerability(unittest.IsolatedAsyncioTestCase):

    @patch('Routers.auth_router.User')
    @patch('Routers.auth_router.get_password_hash')
    @patch('Routers.auth_router.verify_password')
    async def test_change_password_success(self, mock_verify, mock_get_hash, mock_user_cls):
        """
        Verify password change succeeds with correct old password.
        """
        # Setup mock user
        mock_user = MagicMock()
        mock_user.password_hash = "hashed_old_secret"
        mock_user.save = AsyncMock()
        mock_user_cls.get_or_none = AsyncMock(return_value=mock_user)

        mock_get_hash.return_value = "new_hashed_secret"
        mock_verify.return_value = True # Password matches

        # Payload with correct old password
        payload = ChangePassword(
            email="test@example.com",
            old_password="old_secret",
            new_password="new_secret"
        )

        result = await change_password(payload)

        self.assertEqual(result, {"message": "Password changed successfully"})
        self.assertEqual(mock_user.password_hash, "new_hashed_secret")
        mock_user.save.assert_called_once()
        mock_verify.assert_called_with("old_secret", "hashed_old_secret")

    @patch('Routers.auth_router.User')
    @patch('Routers.auth_router.get_password_hash')
    @patch('Routers.auth_router.verify_password')
    async def test_change_password_wrong_old_password(self, mock_verify, mock_get_hash, mock_user_cls):
        """
        Verify password change fails with incorrect old password.
        """
        # Setup mock user
        mock_user = MagicMock()
        mock_user.password_hash = "hashed_old_secret"
        mock_user.save = AsyncMock()
        mock_user_cls.get_or_none = AsyncMock(return_value=mock_user)

        mock_verify.return_value = False # Password does not match

        payload = ChangePassword(
            email="test@example.com",
            old_password="wrong_secret",
            new_password="new_secret"
        )

        with self.assertRaises(HTTPException) as cm:
            await change_password(payload)

        self.assertEqual(cm.exception.status_code, 401)
        self.assertEqual(cm.exception.detail, "Incorrect old password")

        # Ensure user was NOT saved
        mock_user.save.assert_not_called()

if __name__ == '__main__':
    unittest.main()

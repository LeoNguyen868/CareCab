import unittest
import os
import sys
from unittest.mock import patch, MagicMock

# Add project root and backend directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.Utils.base import send_otp_email

class TestEmailSecurity(unittest.TestCase):
    @patch('backend.Utils.base.smtplib.SMTP')
    def test_send_otp_email_uses_env_vars(self, mock_smtp):
        """Test that send_otp_email uses environment variables for credentials."""
        test_env = {
            'EMAIL_SENDER': 'test_sender@example.com',
            'EMAIL_PASSWORD': 'test_password'
        }

        with patch.dict(os.environ, test_env):
            # Setup mock server
            mock_server = MagicMock()
            mock_smtp.return_value.__enter__.return_value = mock_server

            # Run function
            otp = send_otp_email("receiver@example.com")

            # Verify
            self.assertIsNotNone(otp)
            mock_server.login.assert_called_with('test_sender@example.com', 'test_password')

    @patch('backend.Utils.base.smtplib.SMTP')
    def test_send_otp_email_fails_safely_without_env_vars(self, mock_smtp):
        """Test that send_otp_email fails safely when credentials are missing."""
        # Ensure env vars are missing
        with patch.dict(os.environ, {}, clear=True):
            # Run function
            otp = send_otp_email("receiver@example.com")

            # Verify
            self.assertIsNone(otp)
            mock_smtp.assert_not_called()

if __name__ == '__main__':
    unittest.main()

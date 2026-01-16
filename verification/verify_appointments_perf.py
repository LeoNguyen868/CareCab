
from playwright.sync_api import sync_playwright, expect
import json

def test_appointments_filtering():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Mock the API response for appointments
        appointments_data = [
            {
                "id": 1,
                "appointment_date": "2023-10-27",
                "appointment_time": "10:00:00",
                "status": "pending",
                "doctor_name": "Dr. Smith",
                "created_at": "2023-10-20T10:00:00"
            },
            {
                "id": 2,
                "appointment_date": "2023-10-28",
                "appointment_time": "11:00:00",
                "status": "confirmed",
                "doctor_name": "Dr. Jones",
                "created_at": "2023-10-21T10:00:00"
            },
            {
                "id": 3,
                "appointment_date": "2023-10-29",
                "appointment_time": "12:00:00",
                "status": "cancelled",
                "doctor_name": "Dr. Brown",
                "created_at": "2023-10-22T10:00:00"
            }
        ]

        # Mock API routes
        page.route("**/appointments/patient/*", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body=json.dumps(appointments_data)
        ))

        # Mock patient data fetch if needed
        page.route("**/patients/user/*", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"id": 123, "user_id": 1}'
        ))

        # Set localStorage for authentication
        page.add_init_script("""
            localStorage.setItem('userData', JSON.stringify({
                user_id: 1,
                username: 'testuser',
                role: 'patient'
            }));
            localStorage.setItem('patientData', JSON.stringify({
                id: 123,
                user_id: 1
            }));
        """)

        try:
            # Navigate to Appointments page
            page.goto("http://localhost:5173/home/appointments")

            # Wait for content to load
            page.wait_for_load_state("networkidle")

            # Verify initial load (All tab)
            expect(page.get_by_text("Dr. Smith")).to_be_visible()
            expect(page.get_by_text("Dr. Jones")).to_be_visible()
            expect(page.get_by_text("Dr. Brown")).to_be_visible()

            # Click "Chờ xác nhận" (Pending)
            page.get_by_role("button", name="Chờ xác nhận", exact=True).click()
            expect(page.get_by_text("Dr. Smith")).to_be_visible()
            expect(page.get_by_text("Dr. Jones")).not_to_be_visible()
            expect(page.get_by_text("Dr. Brown")).not_to_be_visible()

            # Click "Đã xác nhận" (Confirmed)
            page.get_by_role("button", name="Đã xác nhận", exact=True).click()
            expect(page.get_by_text("Dr. Smith")).not_to_be_visible()
            expect(page.get_by_text("Dr. Jones")).to_be_visible()
            expect(page.get_by_text("Dr. Brown")).not_to_be_visible()

            # Click "Đã hủy" (Cancelled)
            page.get_by_role("button", name="Đã hủy", exact=True).click()
            expect(page.get_by_text("Dr. Smith")).not_to_be_visible()
            expect(page.get_by_text("Dr. Jones")).not_to_be_visible()
            expect(page.get_by_text("Dr. Brown")).to_be_visible()

            # Click "Tất cả" (All)
            page.get_by_role("button", name="Tất cả", exact=True).click()
            expect(page.get_by_text("Dr. Smith")).to_be_visible()
            expect(page.get_by_text("Dr. Jones")).to_be_visible()
            expect(page.get_by_text("Dr. Brown")).to_be_visible()

            print("Verification successful!")

        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error_perf.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    test_appointments_filtering()

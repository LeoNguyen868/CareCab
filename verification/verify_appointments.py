
from playwright.sync_api import sync_playwright, expect

def test_appointments_accessibility():
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
            }
        ]

        # Mock API routes
        page.route("**/appointments/patient/*", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body=str(appointments_data).replace("'", '"')
        ))

        # Mock patient data fetch if needed
        page.route("**/patients/user/*", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"id": 123, "user_id": 1}'
        ))

        # Set localStorage for authentication
        # We need to inject this before the page loads or right after
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

        # Navigate to Appointments page (assuming default vite port 5173)
        # Route is /home/appointments
        try:
            page.goto("http://localhost:5173/home/appointments")

            # Wait for content to load
            page.wait_for_load_state("networkidle")

            # 1. Verify Tabs (Standard Buttons now)
            # Use exact=True to avoid matching appointment content
            pending_btn = page.get_by_role("button", name="Chờ xác nhận", exact=True)
            expect(pending_btn).to_be_visible()

            # Check aria-pressed
            # 'All' is active by default
            all_btn = page.get_by_role("button", name="Tất cả", exact=True)
            expect(all_btn).to_have_attribute("aria-pressed", "true")
            expect(pending_btn).to_have_attribute("aria-pressed", "false")

            # 2. Verify Appointment Item (should be button role)
            expect(page.get_by_text("Dr. Smith")).to_be_visible()

            # Use class selector to be specific
            appointment_item = page.locator(".appointment-item").first
            expect(appointment_item).to_have_attribute("role", "button")
            expect(appointment_item).to_have_attribute("tabindex", "0")

            # 3. Verify Popup Accessibility
            # Click the item to open popup
            appointment_item.click()

            # Check for dialog role
            popup = page.get_by_role("dialog", name="Chi tiết lịch hẹn")
            expect(popup).to_be_visible()
            expect(popup).to_have_attribute("aria-modal", "true")

            # Check close button (X) via label
            close_x = popup.get_by_label("Đóng")
            expect(close_x).to_be_visible()

            # Take screenshot
            page.screenshot(path="verification/appointments_a11y_fixed.png")
            print("Verification successful!")

        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    test_appointments_accessibility()

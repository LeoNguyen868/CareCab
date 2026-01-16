## 2024-05-22 - Keyboard Accessibility for Modals
**Learning:** Modals in this app rely on `onClick` overlays but miss standard keyboard interactions like Escape to close, which is a common accessibility oversight.
**Action:** Always add `keydown` listeners for Escape (and ideally focus trapping) when implementing custom modals.

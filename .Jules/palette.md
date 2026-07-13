# Palette's Journal - New Year 2026 Time Capsule & Countdown

This journal tracks critical UX and accessibility insights discovered during development.

## 2025-11-20 - Visual Feedback and Accessibility in Simple Apps
**Learning:** In simple single-page static web applications, visual state changes (like showing which audio track is active) are often overlooked, resulting in confusion for both sighted and screen-reader users. Combining CSS active state styles with ARIA state attributes (`aria-pressed`) ensures delightful, multi-sensory feedback that bridges visual and assistive technology.
**Action:** Always pair visual active classes (`.active`, `.selected`) with their semantic accessibility counterparts (`aria-pressed="true"`, `aria-selected="true"`) and provide in-context loading/disabled states for async actions.

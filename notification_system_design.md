# Stage 1

# Campus Notifications System Design

## Project Overview

This project is a responsive frontend application developed using React and Material UI for managing and displaying campus notifications such as:

- Placements
- Results
- Events

The application connects to the provided evaluation API to fetch live notifications and uses a priority-based system to highlight the most important notifications for students.

The main goal of the project is to improve the user experience by helping students quickly identify important unread notifications instead of searching through large volumes of alerts.

---

# Technology Stack

## Frontend
- React 18 with Vite

## UI & Styling
- Material UI (MUI)
- Vanilla CSS

## API Communication
- Axios

## Logging System
A reusable custom logging middleware is implemented to send structured logs to the evaluation logging API.

---

# Project Structure

```plaintext
AP23110011538/
├── logging_middleware/
│   └── logger.js
│
├── notification_system_design.md
│
├── notification_app_be/
│   └── Backend placeholder
│
├── notification_app_fe/
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── middleware/
│       ├── pages/
│       ├── services/
│       ├── config/
│       └── theme/
│
└── .gitignore
# Campus Notifications System

A comprehensive, responsive React-based frontend application for managing campus alerts, including Placements, Results, and Events.

## Project Structure
- **logging_middleware/**: Reusable frontend logging logic.
- **notification_app_fe/**: Main React application (Vite + MUI).
- **notification_app_be/**: Placeholder for backend logic.
- **notification_system_design.md**: Detailed architecture and design documentation.

## Key Features
- **Dashboard Overview**: Statistics on active placements, total notifications, and unread alerts.
- **All Notifications Page**: List view with pagination and type-based filtering.
- **Priority Notifications**: View top N notifications sorted by weight (Placement > Result > Event) and recency.
- **Read/Unread Tracking**: Visual indicator for new notifications with the ability to mark them as read.
- **Logging Middleware**: Operational logs sent to a remote API for monitoring.
- **Responsive Design**: Fully optimized for desktop and mobile viewports.

## Tech Stack
- **Framework**: React 18 (Vite)
- **UI Library**: Material UI (MUI)
- **HTTP Client**: Axios
- **Routing**: React Router 6

## Setup and Installation
1. Navigate to `notification_app_fe/`.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the application on `http://localhost:3000`.

## API Integration
The application is integrated with the following endpoints:
- **Notifications**: `GET http://20.207.122.201/evaluation-service/notifications`
- **Auth**: `POST http://20.207.122.201/evaluation-service/auth`
- **Registration**: `POST http://20.207.122.201/evaluation-service/register`
- **Logging**: `POST http://20.207.122.201/evaluation-service/logs`

*Note: Access Code `QkbpxH` is required for registration.*

## Application Screenshots

<div align="center">
  <img src="assets/Screenshot 2026-05-02 124806.png" width="800" alt="App Screenshot 1" />
  <br/><br/>
  <img src="assets/Screenshot 2026-05-02 124828.png" width="800" alt="App Screenshot 2" />
  <br/><br/>
  <img src="assets/Screenshot 2026-05-02 124844.png" width="800" alt="App Screenshot 3" />
  <br/><br/>
  <img src="assets/Screenshot 2026-05-02 124901.png" width="800" alt="App Screenshot 4" />
  <br/><br/>
  <img src="assets/Screenshot 2026-05-02 124915.png" width="800" alt="App Screenshot 5" />
  <br/><br/>
  <img src="assets/Screenshot 2026-05-02 124930.png" width="800" alt="App Screenshot 6" />
  <br/><br/>
  <img src="assets/Screenshot 2026-05-02 124948.png" width="800" alt="App Screenshot 7" />
  <br/><br/>
  <img src="assets/Screenshot 2026-05-02 125005.png" width="800" alt="App Screenshot 8" />
  <br/><br/>
  <img src="assets/Screenshot 2026-05-02 125018.png" width="800" alt="App Screenshot 9" />
</div>

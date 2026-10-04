# Student Profile Mobile Application (Activity 7 — Database & Authentication)

## Project Description
This application is a database-driven mobile application built with Apache Cordova, backed by a RESTful Express/Node.js API and SQLite database. It incorporates user authentication, CRUD operations, camera integration, and secure token management.

## Application Pages & Authentication
- **Login (`index.html`):** Unauthenticated entry point requiring Student ID/Email and Password.
- **Profile (`index.html`):** Protected dashboard displaying database-stored student details, interactive profile picture, and logout controls.
- **About, Skills, Projects, Contact:** Complementary profile sections.

## Authentication & Database Integration
- **Backend Stack:** Node.js, Express.js, SQLite (`sqlite3`), and JSON Web Tokens (`jsonwebtoken`).
- **Security:** Passwords are hashed using `bcryptjs` before database storage. No plain text passwords or API keys are stored in source code.
- **Data Flow:**
  `Cordova App` ➔ `REST API (/api/login)` ➔ `SQLite Database` ➔ `JWT Token Granted` ➔ `Fetch Profile Data`

## CRUD Operations
- **Create:** Seeds initial student records and user credentials in SQLite database.
- **Read:** Retrieves profile fields (`full_name`, `course`, `year_level`, `about_me`, `skills`, `photo`) from SQLite via JWT authentication.
- **Update:** Edits text information and updates profile picture references directly in SQLite.
- **Delete:** Implements endpoint `/api/profile/delete-test` to execute record deletion.

## How to Run

1. **Start the Database Backend Server:**
   ```bash
   cd server
   npm install
   node server.js
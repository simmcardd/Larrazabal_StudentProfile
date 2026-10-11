# Student Profile Application — Activity 7 (Database & Authentication)

**Student Name:** Ivan Larrazabal  
**Course & Year:** BS Information Technology — 2nd Year  
**Course Code:** ITCC 41 — Mobile Application Development  

---

## Overview
This mobile application is built using **Apache Cordova**, connected to a **Node.js (Express)** backend server and an **SQLite3** database with **JWT (JSON Web Token)** authentication. 

It supports full user authentication (Login/Logout) and CRUD operations (fetching and updating profile data live on the Android Emulator).

---

## Prerequisites
Ensure the following tools are installed on your system before running the server and application:
* **Node.js** (v16+ recommended)
* **npm** (Node Package Manager)
* **Android Studio** with Android Emulator setup
* **Apache Cordova CLI** (`npm install -g cordova`)

---

## System Architecture & IP Routing
* **Server Address:** `0.0.0.0:3000` (Binds Express to all network interfaces).
* **Emulator Network Bridge:** `http://10.0.2.2:3000/api` (Android's standard alias for local host `127.0.0.1`).
* **Cleartext Network Policy:** `usesCleartextTraffic="true"` and custom `network_security_config.xml` are configured in Android native code to allow HTTP requests from the emulator.

---

## Step-by-Step Setup & Running Instructions

### 1. Start the Backend Server

1. Open a terminal and navigate to the `server/` directory:
   ```bash
   cd server
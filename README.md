# Student Profile Mobile Application (Activity 6)

## Project Description
This is an expanded multi-page mobile application built using Apache Cordova for ITCC 41. It integrates native device capabilities through the Cordova Camera Plugin, allowing users to capture a new profile photo directly from their device camera, view real-time previews, and persist the image across app restarts.

## Application Pages
- **Profile (`index.html`):** The main interface displaying student information, interactive profile photo, **Edit Profile** modal trigger, and **Change Profile Picture** camera button.
- **About (`about.html`):** Background history, studies at Xavier University, personal interests, and goals.
- **Skills (`skills.html`):** Categorized list of technical, business, and athletic competencies.
- **Projects (`projects.html`):** Highlights software projects, business operations, and sports tournament organization.
- **Contact (`contact.html`):** Student contact info, location, and GitHub repository links.

## Profile Editing & Data Storage
- **Profile Editing:** Modal form allowing users to update Full Name, Course, Year Level, About Me, and Skills with JavaScript input validation.
- **Local Data Storage:** Text profile fields and base64-encoded camera images are stored in browser `localStorage` (`localStorage.setItem('studentProfile', ...)`), maintaining persistence across app reboots.

## Camera Integration & Device Features
The app integrates the official `cordova-plugin-camera` API:
1. User taps the profile picture or clicks **Change Profile Picture**.
2. Cordova calls `navigator.camera.getPicture()`, requesting native camera permissions and launching the device camera interface.
3. Upon capturing a photo, the image is encoded as a Base64 JPEG string (`Camera.DestinationType.DATA_URL`).
4. The JavaScript callback updates the `src` attribute of the `#profile-img` element and updates the saved image string in `localStorage`.

## Image & Error Handling
- **Cancellation:** If the user opens the camera and cancels without taking a picture, the existing profile photo remains untouched and the app continues operating smoothly.
- **Error Handling:** Camera access failures or permission denials trigger a clear inline status notification (*"Unable to access the camera..."*) without causing app crashes.

## Responsive Design
Retains full responsiveness across **Desktop**, **Tablet**, and **Mobile** viewports using CSS media queries and flexbox layouts.

## How to Run
1. Navigate to project root:
   ```bash
   cd Larrazabal_StudentProfile
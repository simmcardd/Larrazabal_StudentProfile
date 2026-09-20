# Student Profile Mobile Application (Activity 5)

## Project Description
This is an enhanced multi-page mobile application built using Apache Cordova for ITCC 41. It features dynamic profile editing capabilities powered by JavaScript DOM manipulation and persistent data storage using `localStorage`.

## Application Pages
- **Profile (`index.html`):** The primary homepage displaying student details and the interactive **Edit Profile** button.
- **About (`about.html`):** Detailed narrative covering personal background, education at Xavier University, and goals.
- **Skills (`skills.html`):** Comprehensive list of personal, technical, and sports competencies.
- **Projects (`projects.html`):** Highlights academic projects, business ventures, and sports events.
- **Contact (`contact.html`):** Contact details including email, location, and GitHub repository links.

## Profile Editing
Clicking **Edit Profile** opens a modal interface that allows users to edit:
- Full Name
- Course / Program
- Year Level
- About Me summary
- Skills list

## JavaScript Functionality
- **Form Handling & Updates:** Form inputs pre-fill with current profile data and dynamically re-render on the screen upon saving.
- **Validation:** Prevents submission if any field is empty, displaying an inline error message (*"Please complete all required fields."*).
- **Save & Cancel Controls:** Save updates both the interface and local storage; Cancel discards changes and closes the modal without altering profile state.

## Local Data Storage
Profile data is stored as a JSON string using browser `localStorage` (`localStorage.setItem('studentProfile', ...)`). When the app launches, JavaScript automatically retrieves and populates the saved profile data (`localStorage.getItem('studentProfile')`). If no saved data exists, default student information is loaded.

## Responsive Design
Maintains responsive design across Desktop, Tablet, and Mobile devices using standard CSS media queries and flexbox/grid structures. Form fields and modal controls adjust automatically for touch devices.

## How to Run
1. Open Terminal and navigate to the project directory:
   ```bash
   cd Larrazabal_StudentProfile
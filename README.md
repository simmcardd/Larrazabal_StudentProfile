# Multi-Page Responsive Student Profile Application

## Project Description
This is an expanded multi-page mobile application built using Apache Cordova. The application reorganizes personal, academic, professional, and skill information across five distinct pages using pure HTML and responsive CSS without JavaScript navigation dependencies.

## Application Pages
- **Profile (`index.html`):** The primary entry point featuring a summary profile picture, title, and quick introduction.
- **About (`about.html`):** Provides in-depth personal background details, interests, educational status at Xavier University, and aspirations.
- **Skills (`skills.html`):** Categorizes core skills including Entrepreneurship, Web Development, Social Media Management, Karate, and Event Organizing.
- **Projects (`projects.html`):** Showcases key works, current business operations, and sports tournament organization.
- **Contact (`contact.html`):** Provides student email address, GitHub repository link, and geographical location.

## Navigation
Page navigation is constructed using native HTML relative hyperlinks (`href="index.html"`, `href="about.html"`, etc.) integrated into an accessible top navigation header present on all screens.

## Responsive Design
Every page retains full media query responsiveness across **Desktop**, **Tablet**, and **Mobile** viewports:
- Flexbox and CSS Grid adapt layouts from side-by-side structures to stacked columns on smaller viewports.
- Touch controls feature a minimum height of 44px to satisfy mobile UI/UX usability requirements.

## UI/UX Principles Applied (Module 4)
- **Consistency:** Standardized dark theme (`#15171c`), gold accents (`#d4af37`), and typography across all 5 pages.
- **Visual Hierarchy:** Distinct Oswald headers paired with readable Source Sans 3 body text.
- **Usability:** Active page states highlighted in the navigation bar.
- **Accessibility:** High contrast ratios, semantic HTML tags (`<header>`, `<main>`, `<nav>`, `<footer>`), and accessible image labels.

## How to Run
1. Navigate to the project directory:
   ```bash
   cd Larrazabal_StudentProfile
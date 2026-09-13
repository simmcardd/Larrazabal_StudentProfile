# Responsive Student Profile Application

## Project Description
This is an improved, fully responsive Student Profile mobile application built using Apache Cordova. It displays personal background information, interests, education, aspirations, and technical skills while adapting seamlessly to Desktop, Tablet, and Mobile viewport sizes.

## Application Structure
- **Header:** Contains profile image, full name, subtitle ("About Myself"), visual accent stripe, and navigation links.
- **Navigation Menu:** Accessible controls navigating directly to internal section anchors.
- **About Section:** Details personal journey, background narrative, interests, educational history, base location, and future aspirations.
- **Skills Section:** Itemized list of 5 core competencies paired with descriptive summaries.
- **Footer:** Displays copyright details, author name, and year.

## Responsive Design
Responsive behavior is achieved using pure CSS media queries (`@media` rules) and fluid CSS grid/flexbox layouts without relying on JavaScript:
- **Desktop (default):** Utilizes a multi-column grid layout for cards and side-by-side skill entries.
- **Tablet (`<= 768px`):** Adjusts padding and scales typography to maintain readability on medium screens.
- **Mobile (`<= 600px`):** Re-organizes grid cards into a single column, stacks skill headers vertically above descriptions, and expands navigation controls to full width for touch usability.

## UI/UX Principles Applied (Module 4)
- **Responsive Layout:** Flexbox and CSS Grid adapt gracefully across screen dimensions without triggering horizontal scrollbars.
- **Mobile-Friendly Spacing:** Standardized padding and margin proportions ensure touch targets do not feel cramped on small displays.
- **Appropriate Typography:** Leverages fluid typography (`clamp()`) and legible system/Google fonts (`Oswald` and `Source Sans 3`) with high contrast ratios.
- **Clear Visual Hierarchy:** Distinct text scaling, accent colors, and structural borders establish an intuitive path for the user's eyes.
- **Usable Controls:** Navigation elements feature explicit minimum touch heights (`44px`) and visual `:hover`/`:focus` states.
- **Basic Accessibility:** Includes `lang="en"`, descriptive `alt` tags on imagery, structural landmarks (`<header>`, `<main>`, `<section>`, `<footer>`), and strong background-to-text color contrast.
- **Consistent Design:** Cohesive color palette (`--bg`, `--panel`, `--gold`), typography rules, and recurring accent elements unify all page sections.

## Navigation
Navigation between the "About" and "Skills" sections is driven strictly by native HTML anchor tags (`href="#about"` and `href="#skills"`). It requires zero JavaScript, adhering to assignment constraints.

## How to Run
1. Install Node.js and Apache Cordova globally:
   ```bash
   npm install -g cordova
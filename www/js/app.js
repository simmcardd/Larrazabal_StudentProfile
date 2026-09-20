// Default profile fallback values
const defaultProfile = {
  fullName: "Ivan Larrazabal",
  course: "BS Information Technology",
  yearLevel: "2nd Year",
  aboutMe: "I am a second-year BS Information Technology student at Xavier University, balancing my academic pursuits with multi-venture entrepreneurship and Shotokan karate athletics.",
  skills: "Entrepreneurship, Web Development, Social Media Management, Shotokan Karate, Event Organizing"
};

// Load saved data or use defaults
function loadProfile() {
  const savedData = localStorage.getItem("studentProfile");
  const profile = savedData ? JSON.parse(savedData) : defaultProfile;

  // Render on homepage if elements exist
  if (document.getElementById("display-name")) document.getElementById("display-name").textContent = profile.fullName;
  if (document.getElementById("display-course")) document.getElementById("display-course").textContent = profile.course;
  if (document.getElementById("display-year")) document.getElementById("display-year").textContent = profile.yearLevel;
  if (document.getElementById("display-about")) document.getElementById("display-about").textContent = profile.aboutMe;
  if (document.getElementById("display-skills")) document.getElementById("display-skills").textContent = profile.skills;
}

// Open Edit Modal and pre-fill form
function openEditModal() {
  const savedData = localStorage.getItem("studentProfile");
  const profile = savedData ? JSON.parse(savedData) : defaultProfile;

  document.getElementById("edit-fullname").value = profile.fullName;
  document.getElementById("edit-course").value = profile.course;
  document.getElementById("edit-year").value = profile.yearLevel;
  document.getElementById("edit-about").value = profile.aboutMe;
  document.getElementById("edit-skills").value = profile.skills;

  document.getElementById("error-message").style.display = "none";
  document.getElementById("edit-modal").style.display = "flex";
}

// Close Edit Modal without saving
function closeEditModal() {
  document.getElementById("edit-modal").style.display = "none";
}

// Save Profile with validation
function saveProfile(event) {
  event.preventDefault();

  const fullName = document.getElementById("edit-fullname").value.trim();
  const course = document.getElementById("edit-course").value.trim();
  const yearLevel = document.getElementById("edit-year").value.trim();
  const aboutMe = document.getElementById("edit-about").value.trim();
  const skills = document.getElementById("edit-skills").value.trim();
  const errorMsg = document.getElementById("error-message");

  // JavaScript Validation
  if (!fullName || !course || !yearLevel || !aboutMe || !skills) {
    errorMsg.textContent = "Please complete all required fields.";
    errorMsg.style.display = "block";
    return;
  }

  const updatedProfile = { fullName, course, yearLevel, aboutMe, skills };

  // Store in localStorage
  localStorage.setItem("studentProfile", JSON.stringify(updatedProfile));

  // Dynamically update UI
  loadProfile();

  // Close modal
  closeEditModal();
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  loadProfile();

  const editBtn = document.getElementById("edit-profile-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const editForm = document.getElementById("edit-profile-form");

  if (editBtn) editBtn.addEventListener("click", openEditModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeEditModal);
  if (editForm) editForm.addEventListener("submit", saveProfile);
});
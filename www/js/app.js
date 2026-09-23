// Default profile fallback values
const defaultProfile = {
  fullName: "Ivan Larrazabal",
  course: "BS Information Technology",
  yearLevel: "2nd Year",
  aboutMe: "I am a second-year BS Information Technology student at Xavier University, balancing my academic pursuits with multi-venture entrepreneurship and Shotokan karate athletics.",
  skills: "Entrepreneurship, Web Development, Social Media Management, Shotokan Karate, Event Organizing",
  photo: "karts.jpeg"
};

// Load saved profile data & image from localStorage
function loadProfile() {
  const savedData = localStorage.getItem("studentProfile");
  const profile = savedData ? JSON.parse(savedData) : defaultProfile;

  if (document.getElementById("display-name")) document.getElementById("display-name").textContent = profile.fullName;
  if (document.getElementById("display-course")) document.getElementById("display-course").textContent = profile.course;
  if (document.getElementById("display-year")) document.getElementById("display-year").textContent = profile.yearLevel;
  if (document.getElementById("display-about")) document.getElementById("display-about").textContent = profile.aboutMe;
  if (document.getElementById("display-skills")) document.getElementById("display-skills").textContent = profile.skills;
  
  if (document.getElementById("profile-img") && profile.photo) {
    document.getElementById("profile-img").src = profile.photo;
  }
}

// Open Edit Profile Modal
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

// Close Edit Profile Modal
function closeEditModal() {
  document.getElementById("edit-modal").style.display = "none";
}

// Save Profile text fields
function saveProfile(event) {
  event.preventDefault();

  const fullName = document.getElementById("edit-fullname").value.trim();
  const course = document.getElementById("edit-course").value.trim();
  const yearLevel = document.getElementById("edit-year").value.trim();
  const aboutMe = document.getElementById("edit-about").value.trim();
  const skills = document.getElementById("edit-skills").value.trim();
  const errorMsg = document.getElementById("error-message");

  if (!fullName || !course || !yearLevel || !aboutMe || !skills) {
    errorMsg.textContent = "Please complete all required fields.";
    errorMsg.style.display = "block";
    return;
  }

  const savedData = localStorage.getItem("studentProfile");
  const existingProfile = savedData ? JSON.parse(savedData) : defaultProfile;

  const updatedProfile = {
    ...existingProfile,
    fullName,
    course,
    yearLevel,
    aboutMe,
    skills
  };

  localStorage.setItem("studentProfile", JSON.stringify(updatedProfile));
  loadProfile();
  closeEditModal();
}

// Cordova Camera Integration
function capturePhoto() {
  const statusDiv = document.getElementById("camera-status");
  if (statusDiv) statusDiv.style.display = "none";

  // Check if camera plugin is installed
  if (!navigator.camera) {
    showCameraStatus("Unable to access the camera. Please check your device permissions or plugin configuration.", true);
    return;
  }

  const cameraOptions = {
    quality: 60,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.CAMERA,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    correctOrientation: true,
    targetWidth: 400,
    targetHeight: 400
  };

  try {
    navigator.camera.getPicture(onCameraSuccess, onCameraError, cameraOptions);
  } catch (err) {
    showCameraStatus("Unable to access the camera. Please check your device permissions.", true);
  }
}

// Camera Success Handler
function onCameraSuccess(imageData) {
  const imageSrc = imageData.startsWith("data:image") ? imageData : "data:image/jpeg;base64," + imageData;

  // Render on homepage
  const profileImg = document.getElementById("profile-img");
  if (profileImg) {
    profileImg.src = imageSrc;
  }

  // Persist to localStorage
  const savedData = localStorage.getItem("studentProfile");
  const profile = savedData ? JSON.parse(savedData) : defaultProfile;
  profile.photo = imageSrc;
  localStorage.setItem("studentProfile", JSON.stringify(profile));
}

// Camera Error / Cancellation Handler
function onCameraError(message) {
  if (message && (message.toLowerCase().includes("cancelled") || message.toLowerCase().includes("no image selected"))) {
    return; // User cancelled without taking a photo
  }
  showCameraStatus("Unable to access the camera. Please check your device permissions.", true);
}

function showCameraStatus(msg, isError = false) {
  const statusDiv = document.getElementById("camera-status");
  if (statusDiv) {
    statusDiv.textContent = msg;
    statusDiv.className = isError ? "status-msg error" : "status-msg";
    statusDiv.style.display = "block";
  }
}

// Initialize listeners on deviceready / DOMContentLoaded
function init() {
  loadProfile();

  const editBtn = document.getElementById("edit-profile-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const editForm = document.getElementById("edit-profile-form");
  const changePhotoBtn = document.getElementById("change-photo-btn");
  const profileImgRing = document.getElementById("profile-img-ring");

  if (editBtn) editBtn.addEventListener("click", openEditModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeEditModal);
  if (editForm) editForm.addEventListener("submit", saveProfile);
  if (changePhotoBtn) changePhotoBtn.addEventListener("click", capturePhoto);
  if (profileImgRing) profileImgRing.addEventListener("click", capturePhoto);
}

document.addEventListener("deviceready", init, false);
document.addEventListener("DOMContentLoaded", () => {
  if (!window.cordova) init();
});
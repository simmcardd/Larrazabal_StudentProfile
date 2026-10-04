const API_BASE = 'http://10.0.2.2:3000/api';

document.addEventListener('DOMContentLoaded', initApp);
document.addEventListener('deviceready', initApp, false);

function initApp() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  const editBtn = document.getElementById('edit-profile-btn');
  if (editBtn) {
    editBtn.addEventListener('click', openEditModal);
  }

  const cancelBtn = document.getElementById('cancel-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeEditModal);
  }

  const editForm = document.getElementById('edit-profile-form');
  if (editForm) {
    editForm.addEventListener('submit', handleProfileUpdate);
  }

  checkAuthState();
}

async function handleLogin(event) {
  if (event) event.preventDefault();

  const studentId = document.getElementById("login-id").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!studentId || !password) {
    alert("Please enter both Student ID and Password.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Login Failed: " + (data.error || "Invalid credentials"));
      return;
    }

    localStorage.setItem("authToken", data.token);
    alert("Login Successful!");
    checkAuthState();
  } catch (err) {
    alert("Connection Error! Unable to reach http://10.0.2.2:3000/api/login. Make sure 'node server.js' is running in Terminal.");
  }
}

function checkAuthState() {
  const token = localStorage.getItem("authToken");
  const loginView = document.getElementById("login-view");
  const profileView = document.getElementById("profile-view");

  if (token) {
    if (loginView) loginView.style.display = "none";
    if (profileView) profileView.style.display = "block";
    loadProfileData();
  } else {
    if (loginView) loginView.style.display = "flex";
    if (profileView) profileView.style.display = "none";
  }
}

async function loadProfileData() {
  const token = localStorage.getItem("authToken");
  if (!token) return;

  try {
    const res = await fetch(`${API_BASE}/profile`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok) {
      // Header Info
      const nameElem = document.getElementById("display-name");
      if (nameElem) nameElem.innerText = data.fullName || data.full_name || "Ivan Larrazabal";

      const courseElem = document.getElementById("display-course");
      if (courseElem) courseElem.innerText = data.course || "BS Information Technology";

      const yearElem = document.getElementById("display-year");
      if (yearElem) yearElem.innerText = data.yearLevel || data.year_level || "2nd Year";

      // Profile Body Info
      const aboutElem = document.getElementById("display-about");
      if (aboutElem) aboutElem.innerText = data.aboutMe || data.about_me || "";

      const skillsElem = document.getElementById("display-skills");
      if (skillsElem) skillsElem.innerText = data.skills || "";
    }
  } catch (err) {
    console.error("Error loading profile data:", err);
  }
}

function openEditModal() {
  const modal = document.getElementById("edit-modal");
  if (modal) modal.style.display = "flex";

  const token = localStorage.getItem("authToken");
  if (!token) return;

  fetch(`${API_BASE}/profile`, {
    headers: { "Authorization": `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(data => {
    if (document.getElementById("edit-fullname")) document.getElementById("edit-fullname").value = data.fullName || data.full_name || "";
    if (document.getElementById("edit-course")) document.getElementById("edit-course").value = data.course || "";
    if (document.getElementById("edit-year")) document.getElementById("edit-year").value = data.yearLevel || data.year_level || "";
    if (document.getElementById("edit-about")) document.getElementById("edit-about").value = data.aboutMe || data.about_me || "";
    if (document.getElementById("edit-skills")) document.getElementById("edit-skills").value = data.skills || "";
  })
  .catch(err => console.error("Error pre-filling edit modal:", err));
}

function closeEditModal() {
  const modal = document.getElementById("edit-modal");
  if (modal) modal.style.display = "none";
}

async function handleProfileUpdate(event) {
  if (event) event.preventDefault();

  const token = localStorage.getItem("authToken");
  if (!token) {
    alert("Session expired. Please log in again.");
    return;
  }

  const payload = {
    fullName: document.getElementById("edit-fullname").value,
    course: document.getElementById("edit-course").value,
    yearLevel: document.getElementById("edit-year").value,
    aboutMe: document.getElementById("edit-about").value,
    skills: document.getElementById("edit-skills").value
  };

  try {
    const res = await fetch(`${API_BASE}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Profile updated successfully!");
      closeEditModal();
      loadProfileData();
    } else {
      alert("Failed to update profile: " + (data.error || "Server error"));
    }
  } catch (err) {
    alert("Network error while saving updates.");
  }
}

function handleLogout() {
  localStorage.removeItem("authToken");
  checkAuthState();
}
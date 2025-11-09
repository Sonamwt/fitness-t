// ---------------------------
// User Registration
// ---------------------------
function registerUser(email, password) {
  // Get users from localStorage or create empty array
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user already exists
  if (users.some(u => u.email === email)) {
    alert("User already exists!");
    return false;
  }

  // Add new user
  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered successfully! Please login.");
  return true;
}

// Attach registration to form
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (registerUser(email, password)) {
      // Optional: redirect to login page after registration
      window.location.href = "login.html";
    }
  });
}

// ---------------------------
// User Login
// ---------------------------
function loginUser(email, password) {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    alert("Login successful!");
    // Save logged-in user info to localStorage
    localStorage.setItem("currentUser", email);
    window.location.href = "progress.html"; // redirect after login
  } else {
    alert("Invalid credentials!");
  }
}

// Attach login to form
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    loginUser(email, password);
  });
}

// ---------------------------
// Workout / Progress Tracking
// ---------------------------
function saveWorkout(workout) {
  const email = localStorage.getItem("currentUser");
  if (!email) {
    alert("Please login first.");
    return;
  }

  let allProgress = JSON.parse(localStorage.getItem("progress")) || {};
  if (!allProgress[email]) {
    allProgress[email] = [];
  }

  allProgress[email].push({
    date: new Date().toLocaleDateString(),
    workout: workout
  });

  localStorage.setItem("progress", JSON.stringify(allProgress));
  alert("Workout saved!");
}

function loadProgress() {
  const email = localStorage.getItem("currentUser");
  if (!email) return [];

  let allProgress = JSON.parse(localStorage.getItem("progress")) || {};
  return allProgress[email] || [];
}

// Example: display progress on progress.html
const progressContainer = document.getElementById("progressContainer");
if (progressContainer) {
  const progressData = loadProgress();
  progressContainer.innerHTML = progressData.map(p => 
    `<li>${p.date}: ${p.workout}</li>`).join("");
}

// ---------------------------
// Logout
// ---------------------------
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}

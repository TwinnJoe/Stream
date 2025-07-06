const API_URL = "https://stream-5j8w.onrender.com";

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.getElementById("main-header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// FAQ accordion
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.parentNode;
    item.classList.toggle("active");

    // Close other open items
    document.querySelectorAll(".faq-item").forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains("active")) {
        otherItem.classList.remove("active");
      }
    });
  });
});

// Modal and mobile menu functionality
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const loginModal = document.getElementById("login-modal");
const registerModal = document.getElementById("register-modal");
const closeButtons = document.querySelectorAll(".close-modal");
const switchToRegister = document.getElementById("switch-to-register");
const switchToLogin = document.getElementById("switch-to-login");
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
const mobileLoginBtn = document.getElementById("mobile-login-btn");
const mobileRegisterBtn = document.getElementById("mobile-register-btn");
const getStartedBtn = document.getElementById("get-started-btn");
const authAlertModal = document.getElementById("auth-alert-modal");
const alertCloseBtn = authAlertModal.querySelector(".close-alert");
const alertOkBtn = document.getElementById("alert-ok-btn");

// Store pending download information
window.pendingDownload = null;

// Update UI for logged in users
function updateAuthUI() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const searchBarContainer = document.getElementById("search-bar-desktop");

  if (isLoggedIn) {
    loginBtn.textContent = "Sign Out";
    loginBtn.id = "logout-btn";
    registerBtn.style.display = "none";

    if (mobileLoginBtn) {
      mobileLoginBtn.textContent = "Sign Out";
    }
  } else {
    loginBtn.textContent = "Sign In";
    loginBtn.id = "login-btn";
    registerBtn.style.display = "";

    if (mobileLoginBtn) {
      mobileLoginBtn.textContent = "Sign In";
    }
  } 
if (searchBarContainer) {
  const isDesktop = window.innerWidth >= 1024; // Only show for desktops
  searchBarContainer.style.display = isLoggedIn && isDesktop ? "flex" : "none";
}
}

let alertContext = null;

function showAuthAlert(
  message = "You must be logged in.",
  title = "See You Soon, Binger! 👋",
  context = null
) {
  alertContext = context;

  const messageEl = document.querySelector(".alert-message");
  const titleEl = document.getElementById("alert-title");

  if (messageEl) {
    messageEl.textContent = message;
  }

  if (titleEl) {
    titleEl.textContent = title;
  }

  authAlertModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function hideAuthAlert() {
  authAlertModal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Download button click handler
document.body.addEventListener("click", function (e) {
  const downloadBtn = e.target.closest(".btn-download");
  if (!downloadBtn) return;

  e.preventDefault();
  e.stopPropagation();

  if (localStorage.getItem("isLoggedIn") !== "true") {
    showAuthAlert(
      "You must be logged in to download content.",
      "Hey there, Binger!",
      "auth-required"
    );
    return;
  }

  const card = downloadBtn.closest(".content-card");
  const title = card.querySelector("h3").textContent;

  // Store download context
  window.pendingDownload = {
    title: title,
    element: downloadBtn,
  };

  // Show custom confirmation modal
  showAuthAlert(`Download "${title}"?`, "Confirm Download", "download-confirm");
});

// Alert OK button handler
alertOkBtn.addEventListener("click", () => {
  hideAuthAlert();

  if (alertContext === "download-confirm" && window.pendingDownload) {
    const { title, element } = window.pendingDownload;
    console.log(`Downloading: ${title}`);

    const originalText = element.innerHTML;
    element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    element.disabled = true;

    setTimeout(() => {
      element.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
      setTimeout(() => {
        element.innerHTML = originalText;
        element.disabled = false;
      }, 2000);
    }, 1500);

    // Clear pending download
    window.pendingDownload = null;
  } else if (alertContext === "auth-required") {
    loginModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
});

alertCloseBtn.addEventListener("click", () => {
  hideAuthAlert();
  window.pendingDownload = null; // Clear any pending download on cancel
});

// Close alert modal if clicking outside content
window.addEventListener("click", (e) => {
  if (e.target === authAlertModal) {
    hideAuthAlert();
    window.pendingDownload = null; // Clear any pending download on cancel
  }
});

// Initialize UI state on load
updateAuthUI();

// Handle login button click (now serves dual purpose for login/logout)
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // If user is logged in (button says "Sign Out"), log them out
  if (localStorage.getItem("isLoggedIn") === "true") {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    updateAuthUI();
    showAuthAlert("Logged out successfully.");
    return;
  }

  // Otherwise, show login modal
  loginModal.style.display = "flex";
  document.body.style.overflow = "hidden";
});

// Handle mobile login button click (same functionality as desktop)
mobileLoginBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // If user is logged in (button says "Sign Out"), log them out
  if (localStorage.getItem("isLoggedIn") === "true") {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    updateAuthUI();
    showAuthAlert("Logged out successfully.");
    return;
  }

  // Otherwise, show login modal
  mobileMenuToggle.classList.remove("active");
  mobileMenu.classList.remove("active");
  mobileMenuOverlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
  loginModal.style.display = "flex";
  document.body.style.overflow = "hidden";
});

mobileMenuToggle.addEventListener("click", function () {
  this.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  mobileMenuOverlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

mobileMenuOverlay.addEventListener("click", function () {
  mobileMenuToggle.classList.remove("active");
  mobileMenu.classList.remove("active");
  this.classList.remove("active");
  document.body.classList.remove("no-scroll");
});

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", function (e) {
    if (!this.classList.contains("btn")) {
      mobileMenuToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
      mobileMenuOverlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
  });
});

getStartedBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.style.display = "flex";
  document.body.style.overflow = "hidden";
});

mobileRegisterBtn.addEventListener("click", function (e) {
  e.preventDefault();
  mobileMenuToggle.classList.remove("active");
  mobileMenu.classList.remove("active");
  mobileMenuOverlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
  registerModal.style.display = "flex";
  document.body.style.overflow = "hidden";
});

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  registerModal.style.display = "flex";
  document.body.style.overflow = "hidden";
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    loginModal.style.display = "none";
    registerModal.style.display = "none";
    document.body.style.overflow = "auto";
  });
});

switchToRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.style.display = "none";
  registerModal.style.display = "flex";
});

switchToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerModal.style.display = "none";
  loginModal.style.display = "flex";
});

window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
  if (e.target === registerModal) {
    registerModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// ======= Authentication forms submission with backend integration =======

// LOGIN FORM
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const response = await fetch(`${API_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("token", data.token);
    localStorage.setItem("userName", username);

    loginModal.style.display = "none";
    document.body.style.overflow = "auto";

    updateAuthUI();

    showAuthAlert("Login successful!", "Success", "login-success");
  } catch (error) {
    showAuthAlert(error.message, "Login Error");
  }
});

// REGISTER FORM
document
  .getElementById("register-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirm-password")
      .value.trim();

    if (password !== confirmPassword) {
      showAuthAlert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      // Show login modal to prompt user login
      registerModal.style.display = "none";
      loginModal.style.display = "flex";
      document.body.style.overflow = "hidden";

      showAuthAlert(
        "Account created successfully. Please log in.",
        "Success",
        "register-success"
      );
    } catch (error) {
      showAuthAlert(error.message, "Registration Error");
    }
  });

const baseImagePath = `${API_URL}/images/`;

document.addEventListener("DOMContentLoaded", () => {
  fetch(`${API_URL}/api/media`)
    .then((res) => res.json())
    .then((data) => {
     allMediaItems = data; // Store for search use
      renderMediaCards(data); // Reuse rendering logic
    })
    .catch((err) => console.error("Failed to load media:", err));
});

      function renderMediaCards(data) {
      const moviesGrid = document.querySelector("#movies .content-grid");
      const seriesGrid = document.querySelector("#series .content-grid");
      const noResultsMoviesMsg = document.getElementById("no-results-movies");
const noResultsSeriesMsg = document.getElementById("no-results-series");

      moviesGrid.innerHTML = "";
      seriesGrid.innerHTML = "";

      let hasMovies = false;
  let hasSeries = false;

      data.forEach((item) => {
        const card = document.createElement("div");
        card.className = "content-card";

        let durationOrSeasons = item.duration;
        if (item.type === "series" && item.seasons) {
          durationOrSeasons =
            item.seasons + " Season" + (item.seasons > 1 ? "s" : "");
        }

        card.innerHTML = `
          <img src="${baseImagePath}${item.image_url}" alt="${item.title}">
          <div class="card-info">
            <h3>${item.title}</h3>
            <p>${item.release_year} • ${item.category} • ${
          durationOrSeasons || ""
        }</p>
            <div class="card-actions">
              <a href="#" onclick='saveToDownloads(${JSON.stringify(
                item
              )}); return false;' class="btn-download">
                <i class="fas fa-download"></i> Download
              </a>
              <span class="quality-badge">HD</span>
            </div>
          </div>
          <div class="card-badge">1080p</div>
        `;

        if (item.type === "movie") {
          moviesGrid.appendChild(card);
          hasMovies = true;
        } else if (item.type === "series") {
          seriesGrid.appendChild(card);
          hasSeries = true;
        }
      });
      
      noResultsMoviesMsg.style.display = hasMovies ? "none" : "block";
  noResultsSeriesMsg.style.display = hasSeries ? "none" : "block";
    }

function setupSearchBar(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;

  input.addEventListener("input", function (e) {
    const query = e.target.value.trim().toLowerCase();

    const filtered = allMediaItems.filter((item) =>
      item.title.toLowerCase().includes(query)
    );

    renderMediaCards(filtered);
  });
}

// Run on load
window.addEventListener("DOMContentLoaded", () => {
  setupSearchBar("search-bar-desktop");
  setupSearchBar("search-bar-mobile");
});


function saveToDownloads(item) {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    showAuthAlert(
      "You must be logged in to download content.",
      "Hey there, Binger!",
      "auth-required"
    );
    return;
  }

  const downloads = JSON.parse(localStorage.getItem("downloads")) || [];

  if (!downloads.some((d) => d.title === item.title)) {
    downloads.push(item);
    localStorage.setItem("downloads", JSON.stringify(downloads));
    renderDownloads();
  }
}

function renderDownloads() {
  const downloads = JSON.parse(localStorage.getItem("downloads")) || [];
  const container = document.querySelector(
    "#downloads-container .download-cards"
  );
  container.innerHTML = "";

  if (downloads.length === 0) {
    container.innerHTML =
      "<p>No downloads yet. Click the download button on any movie or series.</p>";
    return;
  }

  downloads.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "download-card";
    card.innerHTML = `
      <img src="${baseImagePath}${item.image_url}" alt="${item.title}">
      <div class="download-card-info">
        <h4>${item.title}</h4>
        <p>${item.release_year} • ${item.category} • ${item.duration || ""}</p>

        <div class="button-group">
          <button class="btn-play" data-index="${index}">
            <i class="fas fa-play"></i> Play
          </button>
          <button class="btn-remove" data-index="${index}">
            <i class="fas fa-trash-alt"></i> Remove
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Delegated event listener for Play and Remove buttons (outside renderDownloads)
document
  .querySelector("#downloads-container")
  .addEventListener("click", (e) => {
    const playBtn = e.target.closest(".btn-play");
    if (playBtn) {
      const index = playBtn.dataset.index;
      const downloads = JSON.parse(localStorage.getItem("downloads")) || [];
      const item = downloads[index];
      if (item) {
        console.log("Play:", item.title);
        // Implement your play logic here (modal, redirect, etc.)
      }
    }

    const removeBtn = e.target.closest(".btn-remove");
    if (removeBtn) {
      const index = removeBtn.dataset.index;
      removeDownload(index);
    }
  });

function removeDownload(index) {
  let downloads = JSON.parse(localStorage.getItem("downloads")) || [];
  downloads.splice(index, 1);
  localStorage.setItem("downloads", JSON.stringify(downloads));
  renderDownloads();
}

document.addEventListener("DOMContentLoaded", () => {
  renderDownloads();
  updateAuthUI();
});

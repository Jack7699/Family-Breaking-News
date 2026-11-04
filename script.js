
const news = [
  {
    category: "ANNOUNCEMENT",
    title: "Welcome to Family Breaking News",
    description: "Our family news network is officially online. Stay tuned for updates and announcements.",
    date: "November 4, 2026"
  },
  {
    category: "FAMILY",
    title: "A New Chapter Begins",
    description: "A new place to share important family news, updates and memorable moments.",
    date: "November 4, 2026"
  },
  {
    category: "NETWORK",
    title: "The Newsroom Is Open",
    description: "Family Breaking News is ready to bring the latest updates to everyone.",
    date: "November 4, 2026"
  }
];

// EVENTS
const events = [
  {
    date: "TBA",
    title: "Upcoming Family Event",
    description: "More information will be announced soon."
  },
  {
    date: "TBA",
    title: "Family Newsroom Update",
    description: "Stay tuned for future announcements."
  }
];

// ==========================================
// DISPLAY NEWS
// ==========================================

const grid = document.getElementById("news-grid");

if (grid) {
  grid.innerHTML = news.map(item => `
    <article class="news-card">
      <div class="news-image"></div>
      <div class="news-content">
        <span class="category">${item.category}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <span class="news-date">${item.date}</span>
      </div>
    </article>
  `).join("");
}

// ==========================================
// DISPLAY EVENTS
// ==========================================

const eventList = document.getElementById("events-list");

if (eventList) {
  eventList.innerHTML = events.map(event => `
    <div class="event-item">
      <div class="event-date">${event.date}</div>
      <div>
        <h3>${event.title}</h3>
        <p>${event.description}</p>
      </div>
    </div>
  `).join("");
}

// ==========================================
// FOOTER YEAR
// ==========================================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ==========================================
// ADMIN LOGIN
// ==========================================

(() => {
  const ADMIN_USERNAME = "Mohamed";

  // TEMPORARY DEMO ONLY.
  // Replace with a new password, not your exposed old one.
  const ADMIN_PASSWORD = "CHANGE_THIS_TO_A_NEW_PASSWORD";

  const adminButton = document.getElementById("admin-button");
  const overlay = document.getElementById("login-overlay");
  const closeButton = document.getElementById("close-login");
  const loginForm = document.getElementById("login-form");
  const dashboard = document.getElementById("admin-dashboard");
  const message = document.getElementById("login-message");
  const logoutButton = document.getElementById("logout-button");

  if (
    !adminButton ||
    !overlay ||
    !closeButton ||
    !loginForm ||
    !dashboard ||
    !message ||
    !logoutButton
  ) {
    console.error("Admin elements missing. Check index.html.");
    return;
  }

  // OPEN LOGIN
  adminButton.addEventListener("click", (event) => {
    event.preventDefault();
    overlay.style.display = "flex";
    message.textContent = "";
  });

  // CLOSE LOGIN
  closeButton.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  // CLOSE WHEN CLICKING OUTSIDE
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.style.display = "none";
    }
  });

  // LOGIN VALIDATION
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document
      .getElementById("admin-username")
      .value.trim();

    const password = document
      .getElementById("admin-password")
      .value;

    message.style.display = "block";

    if (
      username === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {
      message.textContent = "Login successful!";
      message.style.color = "#70df9b";

      dashboard.classList.add("active");
      overlay.style.display = "none";

      dashboard.scrollIntoView({
        behavior: "smooth"
      });

      loginForm.reset();

    } else {
      message.textContent = "Incorrect username or password.";
      message.style.color = "#ff737b";
    }
  });

  // LOGOUT
  logoutButton.addEventListener("click", () => {
    dashboard.classList.remove("active");
    loginForm.reset();
    message.textContent = "";
  });

})();


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

const grid = document.getElementById("news-grid");

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

const eventList = document.getElementById("events-list");

eventList.innerHTML = events.map(event => `
  <div class="event-item">
    <div class="event-date">${event.date}</div>
    <div>
      <h3>${event.title}</h3>
      <p>${event.description}</p>
    </div>
  </div>
`).join("");
// ADMIN LOGIN

(() => {
  const ADMIN_USERNAME = "Mohamed";
  const ADMIN_PASSWORD = "LaFarandoleCestMonEcole";

  const adminButton = document.getElementById("admin-button");
  const overlay = document.getElementById("login-overlay");
  const closeButton = document.getElementById("close-login");
  const loginForm = document.getElementById("login-form");
  const dashboard = document.getElementById("admin-dashboard");
  const message = document.getElementById("login-message");
  const logoutButton = document.getElementById("logout-button");

  if (!adminButton || !overlay || !closeButton || !loginForm ||
      !dashboard || !message || !logoutButton) {
    console.error("Admin elements missing.");
    return;
  }

  adminButton.addEventListener("click", (e) => {
    e.preventDefault();
    overlay.style.display = "flex";
  });

  closeButton.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("LOGIN SUBMITTED");

  const username = document.getElementById("admin-username").value.trim();
  const password = document.getElementById("admin-password").value;

  message.style.display = "block";

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    message.textContent = "Login successful!";
    dashboard.classList.add("active");
    overlay.style.display = "none";
    dashboard.scrollIntoView({ behavior: "smooth" });
  } else {
    message.textContent = "Incorrect username or password.";
    message.style.color = "#ff737b";
  }
});

    const username = document.getElementById("admin-username").value.trim();
    const password = document.getElementById("admin-password").value;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      overlay.style.display = "none";
      dashboard.classList.add("active");
      message.textContent = "";
      dashboard.scrollIntoView({ behavior: "smooth" });
    } else {
      message.textContent = "Invalid username or password.";
    }
  });

  logoutButton.addEventListener("click", () => {
    dashboard.classList.remove("active");
  });
})();

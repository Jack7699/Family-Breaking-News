
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
  const adminButton = document.getElementById("admin-button");
  const overlay = document.getElementById("login-overlay");
  const closeButton = document.getElementById("close-login");

  if (!adminButton || !overlay || !closeButton) {
    console.error("Admin login elements not found.");
    return;
  }

  adminButton.addEventListener("click", (e) => {
    e.preventDefault();
    overlay.style.display = "flex";
  });

  closeButton.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
    }
  });
})();

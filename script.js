// ==========================================
// FAMILY BREAKING NEWS — SUPABASE CONNECTION
// ==========================================

const SUPABASE_URL = "https://rrxdjaerxcgtgjkdghge.supabase.co";

// Paste your Supabase PUBLISHABLE key between the quotes.
// Never use your secret/service_role key here.
const SUPABASE_PUBLISHABLE_KEY = "PASTE_YOUR_PUBLISHABLE_KEY_HERE";

const db = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

// ==========================================
// PAGE ELEMENTS
// ==========================================

const main = document.querySelector("main");
const footer = document.querySelector("footer");

const adminButton = document.getElementById("admin-button");
const overlay = document.getElementById("login-overlay");
const closeButton = document.getElementById("close-login");
const loginForm = document.getElementById("login-form");
const dashboard = document.getElementById("admin-dashboard");
const loginMessage = document.getElementById("login-message");
const logoutButton = document.getElementById("logout-button");

const postForm = document.getElementById("create-post-form");
const postTitle = document.getElementById("post-title");
const postCategory = document.getElementById("post-category");
const postDescription = document.getElementById("post-description");
const postMessage = document.getElementById("post-message");

const newsGrid = document.getElementById("news-grid");
const ticker = document.getElementById("ticker");
const eventsList = document.getElementById("events-list");
const yearElement = document.getElementById("year");

// ==========================================
// INITIAL PAGE STATE
// ==========================================

if (main) main.style.display = "none";
if (footer) footer.style.display = "none";

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Make the login button available to all family members.
if (adminButton) {
  adminButton.textContent = "FAMILY LOGIN";
}

// ==========================================
// UPCOMING EVENTS
// ==========================================

const events = [
  {
    date: "TBA",
    title: "Coming Soon",
    description: "More family updates will be announced soon."
  },
  {
    date: "TBA",
    title: "Family Newsroom Update",
    description: "Stay tuned for future announcements."
  }
];

if (eventsList) {
  eventsList.replaceChildren();

  events.forEach(event => {
    const item = document.createElement("div");
    item.className = "event-item";

    const date = document.createElement("div");
    date.className = "event-date";
    date.textContent = event.date;

    const details = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = event.title;

    const description = document.createElement("p");
    description.textContent = event.description;

    details.append(title, description);
    item.append(date, details);
    eventsList.appendChild(item);
  });
}

// ==========================================
// LOGIN OVERLAY
// ==========================================

if (adminButton) {
  adminButton.addEventListener("click", event => {
    event.preventDefault();
    overlay.style.display = "flex";
    loginMessage.textContent = "";
  });
}

if (closeButton) {
  closeButton.addEventListener("click", () => {
    overlay.style.display = "none";
  });
}

if (overlay) {
  overlay.addEventListener("click", event => {
    if (event.target === overlay) {
      overlay.style.display = "none";
    }
  });
}

// ==========================================
// SHOW / HIDE PRIVATE WEBSITE
// ==========================================

function showFamilySite() {
  if (main) main.style.display = "";
  if (footer) footer.style.display = "";
}

function hideFamilySite() {
  if (main) main.style.display = "none";
  if (footer) footer.style.display = "none";

  if (dashboard) {
    dashboard.classList.remove("active");
  }
}

// ==========================================
// LOAD POSTS FROM SUPABASE
// ==========================================

async function loadPosts() {
  if (!newsGrid) return;

  newsGrid.replaceChildren();

  const { data, error } = await db
    .from("posts")
    .select("id, title, category, content, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Could not load posts:", error);
    newsGrid.textContent = "Unable to load family news.";
    return;
  }

  if (!data || data.length === 0) {
    newsGrid.textContent = "No family news has been published yet.";
    if (ticker) ticker.textContent = "Welcome to Family Breaking News";
    return;
  }

  data.forEach(post => {
    const card = document.createElement("article");
    card.className = "news-card";

    const image = document.createElement("div");
    image.className = "news-image";

    const content = document.createElement("div");
    content.className = "news-content";

    const category = document.createElement("span");
    category.className = "category";
    category.textContent = post.category;

    const title = document.createElement("h3");
    title.textContent = post.title;

    const description = document.createElement("p");
    description.textContent = post.content;

    const date = document.createElement("span");
    date.className = "news-date";
    date.textContent = new Date(post.created_at).toLocaleDateString();

    content.append(category, title, description, date);
    card.append(image, content);
    newsGrid.appendChild(card);
  });

  if (ticker) {
    ticker.textContent = data[0].title;
  }
}

// ==========================================
// CHECK FAMILY MEMBERSHIP
// ==========================================

async function openFamilyAccount(session) {
  const { data: member, error } = await db
    .from("family_members")
    .select("role")
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (error || !member) {
    await db.auth.signOut();
    hideFamilySite();

    if (loginMessage) {
      loginMessage.textContent =
        "You do not have access to this family network.";
    }

    if (overlay) overlay.style.display = "flex";
    return;
  }

  showFamilySite();

  if (member.role === "admin") {
    dashboard.classList.add("active");
  } else {
    dashboard.classList.remove("active");
  }

  if (overlay) overlay.style.display = "none";

  await loadPosts();
}

// ==========================================
// FAMILY LOGIN
// ==========================================

if (loginForm) {
  loginForm.addEventListener("submit", async event => {
    event.preventDefault();

    loginMessage.textContent = "Signing in...";

    const email = document
      .getElementById("admin-username")
      .value.trim();

    const password = document
      .getElementById("admin-password")
      .value;

    const { data, error } = await db.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      loginMessage.textContent = "Login failed. Check your email and password.";
      return;
    }

    loginForm.reset();

    await openFamilyAccount(data.session);
  });
}

// ==========================================
// CREATE A FAMILY NEWS POST
// ==========================================

if (postForm) {
  postForm.addEventListener("submit", async event => {
    event.preventDefault();

    postMessage.textContent = "Publishing...";

    const {
      data: { user },
      error: userError
    } = await db.auth.getUser();

    if (userError || !user) {
      postMessage.textContent = "Please log in again.";
      return;
    }

    const { error } = await db.from("posts").insert({
      title: postTitle.value.trim(),
      category: postCategory.value,
      content: postDescription.value.trim(),
      author_id: user.id
    });

    if (error) {
      console.error(error);
      postMessage.textContent = "Could not publish. Please try again.";
      return;
    }

    postForm.reset();
    postMessage.textContent = "Post published successfully!";

    await loadPosts();
  });
}

// ==========================================
// LOG OUT
// ==========================================

if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    const { error } = await db.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    hideFamilySite();
    overlay.style.display = "flex";
    loginMessage.textContent = "You have been logged out.";
  });
}

// ==========================================
// RESTORE LOGIN AFTER PAGE REFRESH
// ==========================================

async function restoreSession() {
  const { data, error } = await db.auth.getSession();

  if (error) {
    console.error(error);
    return;
  }

  if (data.session) {
    await openFamilyAccount(data.session);
  }
}

restoreSession();

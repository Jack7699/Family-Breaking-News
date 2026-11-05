
// ==========================================
// FAMILY BREAKING NEWS — SUPABASE CONNECTION
// ==========================================

const SUPABASE_URL = "https://rrxdjaerxcgtgjkdghge.supabase.co";

// Keep your existing publishable key here.
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_YJhB36PS5fVR9dcr5tfJZg__25aZcFf";

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

// Tracks whether the currently signed-in user is an admin.
let isAdmin = false;

// ==========================================
// INITIAL PAGE STATE
// ==========================================

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

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
  isAdmin = false;

  if (dashboard) {
    dashboard.classList.remove("active");
  }
}

// ==========================================
// EDIT A POST
// ==========================================

async function editPost(post) {
  if (!isAdmin) return;

  const newTitle = prompt("Edit the post title:", post.title);

  if (newTitle === null) return;

  if (!newTitle.trim()) {
    alert("The title cannot be empty.");
    return;
  }

  const newCategory = prompt(
    "Edit category (ANNOUNCEMENT, FAMILY, NETWORK, BREAKING NEWS):",
    post.category
  );

  if (newCategory === null) return;

  if (!newCategory.trim()) {
    alert("The category cannot be empty.");
    return;
  }

  const newContent = prompt("Edit the post content:", post.content);

  if (newContent === null) return;

  if (!newContent.trim()) {
    alert("The post content cannot be empty.");
    return;
  }

  const { error } = await db
    .from("posts")
    .update({
      title: newTitle.trim(),
      category: newCategory.trim().toUpperCase(),
      content: newContent.trim()
    })
    .eq("id", post.id);

  if (error) {
    console.error("Could not edit post:", error);
    alert("Could not update the post. Check your permissions.");
    return;
  }

  alert("Post updated successfully!");
  await loadPosts();
}

// ==========================================
// DELETE A POST
// ==========================================

async function deletePost(post) {
  if (!isAdmin) return;

  const confirmed = confirm(
    "Are you sure you want to delete this post?\n\n" +
    "This action cannot be undone."
  );

  if (!confirmed) return;

  const { error } = await db
    .from("posts")
    .delete()
    .eq("id", post.id);

  if (error) {
    console.error("Could not delete post:", error);
    alert("Could not delete the post. Check your permissions.");
    return;
  }

  alert("Post deleted successfully!");
  await loadPosts();
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
    card.style.cursor = "pointer";

    // ADMIN CONTROLS
    if (isAdmin) {
      const actions = document.createElement("div");
      actions.className = "post-admin-actions";

      const editButton = document.createElement("button");
      editButton.className = "post-edit-button";
      editButton.type = "button";
      editButton.textContent = "✎";
      editButton.title = "Edit post";
      editButton.setAttribute("aria-label", "Edit post");

      editButton.addEventListener("click", event => {
        event.stopPropagation();
        editPost(post);
      });

      const deleteButton = document.createElement("button");
      deleteButton.className = "post-delete-button";
      deleteButton.type = "button";
      deleteButton.textContent = "🗑";
      deleteButton.title = "Delete post";
      deleteButton.setAttribute("aria-label", "Delete post");

      deleteButton.addEventListener("click", event => {
        event.stopPropagation();
        deletePost(post);
      });

      actions.append(editButton, deleteButton);
      card.appendChild(actions);
    }

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

    // OPEN ARTICLE IN A NEW TAB
    card.addEventListener("click", () => {
      const articleURL = new URL("./article.html", window.location.href);
      articleURL.searchParams.set("id", post.id);
      window.open(articleURL.href, "_blank", "noopener,noreferrer");
    });

    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");

    card.addEventListener("keydown", event => {
      if (
        event.target === card &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();

        const articleURL = new URL("./article.html", window.location.href);
        articleURL.searchParams.set("id", post.id);
        window.open(articleURL.href, "_blank", "noopener,noreferrer");
      }
    });

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
    await loadPosts();
    return;
  }

  showFamilySite();

  isAdmin = member.role === "admin";

  if (isAdmin) {
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
    await loadPosts();

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

loadPosts();
restoreSession();

// ==========================================
// FAMILY BREAKING NEWS — SUPABASE
// ==========================================

const SUPABASE_URL = "https://rrxdjaerxcgtgjkdghge.supabase.co";
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
const postLanguage = document.getElementById("post-language");

const newsGrid = document.getElementById("news-grid");
const newsSearch = document.getElementById("news-search");
const categoryFilter = document.getElementById("category-filter");
const ticker = document.getElementById("ticker");
const eventsList = document.getElementById("events-list");
const yearElement = document.getElementById("year");
const languageSelect = document.getElementById("language-select");

let isAdmin = false;
let currentLanguage = localStorage.getItem("fbn-language") || "fr";

// ==========================================
// TRANSLATIONS
// ==========================================

const translations = {
  fr: {
    tagline: "VOTRE FAMILLE. VOTRE ACTUALITÉ. VOTRE RÉSEAU.",
    live: "RÉSEAU EN DIRECT",
    home: "ACCUEIL",
    latest: "ACTUALITÉS",
    events: "ÉVÉNEMENTS",
    about: "À PROPOS",
    family_login: "CONNEXION FAMILLE",
    restricted: "ACCÈS RESTREINT",
    login_title: "Connexion",
    login_description: "Connectez-vous à l'administration de la salle de rédaction.",
    email: "E-mail",
    email_placeholder: "Entrez votre e-mail",
    password: "Mot de passe",
    password_placeholder: "Entrez votre mot de passe",
    sign_in: "SE CONNECTER →",
    admin_panel: "Panneau d'administration",
    admin_welcome: "Bienvenue dans l'administration de Family Breaking News.",
    create_post: "CRÉER UN ARTICLE",
    title_label: "TITRE :",
    title_placeholder: "Entrez le titre...",
    category_label: "CATÉGORIE :",
    category_announcement: "ANNONCE",
    category_family: "FAMILLE",
    category_network: "RÉSEAU",
    category_breaking: "DERNIÈRE MINUTE",
    post_language: "LANGUE DE L'ARTICLE :",
    post_label: "ARTICLE :",
    post_placeholder: "Écrivez votre actualité ici...",
    publish: "PUBLIER →",
    logout: "SE DÉCONNECTER",
    newsroom: "LA RÉDACTION FAMILIALE",
    hero_line1: "Restez informés.",
    hero_line2: "Restez connectés.",
    hero_description: "Votre destination centrale pour les annonces familiales, les actualités importantes, les événements et les histoires.",
    explore: "DÉCOUVRIR LES ACTUALITÉS →",
    network_status: "ÉTAT DU RÉSEAU",
    operational: "OPÉRATIONNEL",
    network_name: "Réseau d'actualités familiales",
    systems_normal: "TOUS LES SYSTÈMES SONT NORMAUX",
    breaking: "DERNIÈRE MINUTE",
    latest_headlines: "Dernières actualités",
    recent_updates: "ACTUALITÉS RÉCENTES",
    calendar: "AU CALENDRIER",
    upcoming_events: "Événements à venir",
    about_network: "À PROPOS DU RÉSEAU",
    about_title: "Une famille. Un réseau.",
    about_description: "Family Breaking News est une plateforme familiale dédiée au partage d'annonces, d'actualités et de moments mémorables en un seul endroit.",
    footer_description: "Réseau indépendant d'actualités familiales.",
    coming_soon: "Bientôt disponible",
    event_description: "D'autres actualités familiales seront bientôt annoncées.",
    event_update: "Actualités de la rédaction familiale",
    event_update_description: "Restez à l'écoute des prochaines annonces.",
    no_posts: "Aucune actualité familiale n'a encore été publiée.",
    load_error: "Impossible de charger les actualités familiales.",
    welcome: "Bienvenue sur Family Breaking News.",
    signing_in: "Connexion en cours...",
    login_failed: "Échec de connexion. Vérifiez votre e-mail et votre mot de passe.",
    no_access: "Vous n'avez pas accès à ce réseau familial.",
    publishing: "Publication en cours...",
    login_again: "Veuillez vous reconnecter.",
    publish_error: "Publication impossible. Veuillez réessayer.",
    published: "Article publié avec succès !",
    logged_out: "Vous êtes déconnecté.",
    edit_title: "Modifier le titre :",
    edit_category: "Modifier la catégorie :",
    edit_content: "Modifier le contenu :",
    empty_title: "Le titre ne peut pas être vide.",
    empty_category: "La catégorie ne peut pas être vide.",
    empty_content: "Le contenu ne peut pas être vide.",
    update_error: "Impossible de modifier l'article. Vérifiez vos autorisations.",
    updated: "Article modifié avec succès !",
    delete_confirm: "Voulez-vous vraiment supprimer cet article ?\n\nCette action est irréversible.",
    delete_error: "Impossible de supprimer l'article. Vérifiez vos autorisations.",
    deleted: "Article supprimé avec succès !",
    edit_post: "Modifier l'article",
    delete_post: "Supprimer l'article",
    translation_error: "Traduction indisponible"
  },

  en: {
    tagline: "YOUR FAMILY. YOUR NEWS. YOUR NETWORK.",
    live: "LIVE NETWORK",
    home: "HOME",
    latest: "LATEST NEWS",
    events: "EVENTS",
    about: "ABOUT",
    family_login: "FAMILY LOGIN",
    restricted: "RESTRICTED ACCESS",
    login_title: "Login",
    login_description: "Sign in to the newsroom administration.",
    email: "Email",
    email_placeholder: "Enter your email",
    password: "Password",
    password_placeholder: "Enter your password",
    sign_in: "SIGN IN →",
    admin_panel: "Administration Panel",
    admin_welcome: "Welcome to Family Breaking News administration.",
    create_post: "CREATE A POST",
    title_label: "TITLE:",
    title_placeholder: "Enter post title...",
    category_label: "CATEGORY:",
    category_announcement: "ANNOUNCEMENT",
    category_family: "FAMILY",
    category_network: "NETWORK",
    category_breaking: "BREAKING NEWS",
    post_language: "POST LANGUAGE:",
    post_label: "POST:",
    post_placeholder: "Write your news post here...",
    publish: "PUBLISH POST →",
    logout: "LOG OUT",
    newsroom: "THE FAMILY NEWSROOM",
    hero_line1: "Stay informed.",
    hero_line2: "Stay connected.",
    hero_description: "Your central destination for family announcements, important updates, events and stories.",
    explore: "EXPLORE THE NEWS →",
    network_status: "NETWORK STATUS",
    operational: "OPERATIONAL",
    network_name: "Family News Network",
    systems_normal: "ALL SYSTEMS NORMAL",
    breaking: "BREAKING NEWS",
    latest_headlines: "Latest Headlines",
    recent_updates: "RECENT UPDATES",
    calendar: "ON THE CALENDAR",
    upcoming_events: "Upcoming Events",
    about_network: "ABOUT THE NETWORK",
    about_title: "One family. One network.",
    about_description: "Family Breaking News is a family-focused news platform dedicated to sharing announcements, updates and memorable moments in one place.",
    footer_description: "Independent family news network.",
    coming_soon: "Coming Soon",
    event_description: "More family updates will be announced soon.",
    event_update: "Family Newsroom Update",
    event_update_description: "Stay tuned for future announcements.",
    no_posts: "No family news has been published yet.",
    load_error: "Unable to load family news.",
    welcome: "Welcome to Family Breaking News.",
    signing_in: "Signing in...",
    login_failed: "Login failed. Check your email and password.",
    no_access: "You do not have access to this family network.",
    publishing: "Publishing...",
    login_again: "Please log in again.",
    publish_error: "Could not publish. Please try again.",
    published: "Post published successfully!",
    logged_out: "You have been logged out.",
    edit_title: "Edit the post title:",
    edit_category: "Edit the category:",
    edit_content: "Edit the post content:",
    empty_title: "The title cannot be empty.",
    empty_category: "The category cannot be empty.",
    empty_content: "The post content cannot be empty.",
    update_error: "Could not update the post. Check your permissions.",
    updated: "Post updated successfully!",
    delete_confirm: "Are you sure you want to delete this post?\n\nThis action cannot be undone.",
    delete_error: "Could not delete the post. Check your permissions.",
    deleted: "Post deleted successfully!",
    edit_post: "Edit post",
    delete_post: "Delete post",
    translation_error: "Translation unavailable"
  },

  ar: {
    tagline: "عائلتك. أخبارك. شبكتك.",
    live: "الشبكة مباشرة",
    home: "الرئيسية",
    latest: "آخر الأخبار",
    events: "الأحداث",
    about: "من نحن",
    family_login: "دخول العائلة",
    restricted: "دخول مقيّد",
    login_title: "تسجيل الدخول",
    login_description: "سجّل الدخول إلى إدارة غرفة الأخبار.",
    email: "البريد الإلكتروني",
    email_placeholder: "أدخل بريدك الإلكتروني",
    password: "كلمة المرور",
    password_placeholder: "أدخل كلمة المرور",
    sign_in: "تسجيل الدخول ←",
    admin_panel: "لوحة الإدارة",
    admin_welcome: "مرحباً بك في إدارة أخبار العائلة.",
    create_post: "إنشاء منشور",
    title_label: "العنوان:",
    title_placeholder: "أدخل عنوان المنشور...",
    category_label: "الفئة:",
    category_announcement: "إعلان",
    category_family: "العائلة",
    category_network: "الشبكة",
    category_breaking: "خبر عاجل",
    post_language: "لغة المنشور:",
    post_label: "المحتوى:",
    post_placeholder: "اكتب الخبر هنا...",
    publish: "نشر المنشور ←",
    logout: "تسجيل الخروج",
    newsroom: "غرفة أخبار العائلة",
    hero_line1: "ابقَ على اطلاع.",
    hero_line2: "ابقَ على تواصل.",
    hero_description: "وجهتك المركزية للإعلانات العائلية والتحديثات المهمة والأحداث والقصص.",
    explore: "اكتشف الأخبار ←",
    network_status: "حالة الشبكة",
    operational: "تعمل بشكل طبيعي",
    network_name: "شبكة أخبار العائلة",
    systems_normal: "جميع الأنظمة تعمل بشكل طبيعي",
    breaking: "أخبار عاجلة",
    latest_headlines: "آخر العناوين",
    recent_updates: "آخر التحديثات",
    calendar: "على التقويم",
    upcoming_events: "الأحداث القادمة",
    about_network: "حول الشبكة",
    about_title: "عائلة واحدة. شبكة واحدة.",
    about_description: "Family Breaking News منصة عائلية مخصصة لمشاركة الإعلانات والتحديثات واللحظات المميزة في مكان واحد.",
    footer_description: "شبكة أخبار عائلية مستقلة.",
    coming_soon: "قريباً",
    event_description: "سيتم الإعلان عن المزيد من أخبار العائلة قريباً.",
    event_update: "تحديث غرفة أخبار العائلة",
    event_update_description: "ترقبوا الإعلانات القادمة.",
    no_posts: "لم يتم نشر أي أخبار عائلية بعد.",
    load_error: "تعذر تحميل أخبار العائلة.",
    welcome: "مرحباً بكم في Family Breaking News.",
    signing_in: "جارٍ تسجيل الدخول...",
    login_failed: "فشل تسجيل الدخول. تحقق من بريدك الإلكتروني وكلمة المرور.",
    no_access: "ليس لديك صلاحية الوصول إلى هذه الشبكة العائلية.",
    publishing: "جارٍ النشر...",
    login_again: "يرجى تسجيل الدخول مرة أخرى.",
    publish_error: "تعذر النشر. حاول مرة أخرى.",
    published: "تم نشر المنشور بنجاح!",
    logged_out: "تم تسجيل خروجك.",
    edit_title: "تعديل عنوان المنشور:",
    edit_category: "تعديل الفئة:",
    edit_content: "تعديل محتوى المنشور:",
    empty_title: "لا يمكن أن يكون العنوان فارغاً.",
    empty_category: "لا يمكن أن تكون الفئة فارغة.",
    empty_content: "لا يمكن أن يكون المحتوى فارغاً.",
    update_error: "تعذر تحديث المنشور. تحقق من الصلاحيات.",
    updated: "تم تحديث المنشور بنجاح!",
    delete_confirm: "هل أنت متأكد أنك تريد حذف هذا المنشور؟\n\nلا يمكن التراجع عن هذا الإجراء.",
    delete_error: "تعذر حذف المنشور. تحقق من الصلاحيات.",
    deleted: "تم حذف المنشور بنجاح!",
    edit_post: "تعديل المنشور",
    delete_post: "حذف المنشور",
    translation_error: "الترجمة غير متاحة"
  },

  es: {
    tagline: "TU FAMILIA. TUS NOTICIAS. TU RED.",
    live: "RED EN DIRECTO",
    home: "INICIO",
    latest: "ÚLTIMAS NOTICIAS",
    events: "EVENTOS",
    about: "ACERCA DE",
    family_login: "ACCESO FAMILIAR",
    restricted: "ACCESO RESTRINGIDO",
    login_title: "Iniciar sesión",
    login_description: "Accede a la administración de la sala de noticias.",
    email: "Correo electrónico",
    email_placeholder: "Introduce tu correo electrónico",
    password: "Contraseña",
    password_placeholder: "Introduce tu contraseña",
    sign_in: "INICIAR SESIÓN →",
    admin_panel: "Panel de administración",
    admin_welcome: "Bienvenido a la administración de Family Breaking News.",
    create_post: "CREAR UNA PUBLICACIÓN",
    title_label: "TÍTULO:",
    title_placeholder: "Introduce el título...",
    category_label: "CATEGORÍA:",
    category_announcement: "ANUNCIO",
    category_family: "FAMILIA",
    category_network: "RED",
    category_breaking: "ÚLTIMA HORA",
    post_language: "IDIOMA DE LA PUBLICACIÓN:",
    post_label: "PUBLICACIÓN:",
    post_placeholder: "Escribe tu noticia aquí...",
    publish: "PUBLICAR →",
    logout: "CERRAR SESIÓN",
    newsroom: "LA REDACCIÓN FAMILIAR",
    hero_line1: "Mantente informado.",
    hero_line2: "Mantente conectado.",
    hero_description: "Tu destino central para anuncios familiares, actualizaciones importantes, eventos e historias.",
    explore: "EXPLORAR NOTICIAS →",
    network_status: "ESTADO DE LA RED",
    operational: "OPERATIVA",
    network_name: "Red de Noticias Familiar",
    systems_normal: "TODOS LOS SISTEMAS FUNCIONAN",
    breaking: "ÚLTIMA HORA",
    latest_headlines: "Últimos titulares",
    recent_updates: "ACTUALIZACIONES RECIENTES",
    calendar: "EN EL CALENDARIO",
    upcoming_events: "Próximos eventos",
    about_network: "ACERCA DE LA RED",
    about_title: "Una familia. Una red.",
    about_description: "Family Breaking News es una plataforma familiar dedicada a compartir anuncios, actualizaciones y momentos memorables en un solo lugar.",
    footer_description: "Red independiente de noticias familiares.",
    coming_soon: "Próximamente",
    event_description: "Pronto se anunciarán más noticias familiares.",
    event_update: "Actualización de la redacción familiar",
    event_update_description: "Mantente atento a futuros anuncios.",
    no_posts: "Todavía no se han publicado noticias familiares.",
    load_error: "No se pudieron cargar las noticias familiares.",
    welcome: "Bienvenido a Family Breaking News.",
    signing_in: "Iniciando sesión...",
    login_failed: "Error al iniciar sesión. Comprueba tu correo y contraseña.",
    no_access: "No tienes acceso a esta red familiar.",
    publishing: "Publicando...",
    login_again: "Por favor, inicia sesión de nuevo.",
    publish_error: "No se pudo publicar. Inténtalo de nuevo.",
    published: "¡Publicación realizada correctamente!",
    logged_out: "Has cerrado sesión.",
    edit_title: "Editar el título:",
    edit_category: "Editar la categoría:",
    edit_content: "Editar el contenido:",
    empty_title: "El título no puede estar vacío.",
    empty_category: "La categoría no puede estar vacía.",
    empty_content: "El contenido no puede estar vacío.",
    update_error: "No se pudo actualizar la publicación. Comprueba los permisos.",
    updated: "¡Publicación actualizada correctamente!",
    delete_confirm: "¿Seguro que quieres eliminar esta publicación?\n\nEsta acción no se puede deshacer.",
    delete_error: "No se pudo eliminar la publicación. Comprueba los permisos.",
    deleted: "¡Publicación eliminada correctamente!",
    edit_post: "Editar publicación",
    delete_post: "Eliminar publicación",
    translation_error: "Traducción no disponible"
  }
};

function t(key) {
  return translations[currentLanguage]?.[key] ||
         translations.fr[key] ||
         key;
}

// ==========================================
// APPLY WEBSITE LANGUAGE
// ==========================================

function applyLanguage() {
  const language = translations[currentLanguage]
    ? currentLanguage
    : "fr";

  currentLanguage = language;

  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    if (t(key)) element.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });

  if (languageSelect) {
    languageSelect.value = language;
  }

  localStorage.setItem("fbn-language", language);

  renderEvents();
  loadPosts();
}

if (languageSelect) {
  languageSelect.addEventListener("change", () => {
    currentLanguage = languageSelect.value;
    applyLanguage();
  });
}

// ==========================================
// AUTOMATIC TRANSLATION
// MyMemory free translation API
// ==========================================

const translationCache = new Map();

async function translateText(text, sourceLanguage, targetLanguage) {
  if (!text) return text;

  if (sourceLanguage === targetLanguage) {
    return text;
  }

  const cacheKey = `${sourceLanguage}:${targetLanguage}:${text}`;

  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  const savedTranslation = localStorage.getItem(
    "fbn-translation-" + encodeURIComponent(cacheKey)
  );

  if (savedTranslation) {
    translationCache.set(cacheKey, savedTranslation);
    return savedTranslation;
  }

  try {
    const chunks = splitText(text, 450);
    const translatedChunks = [];

    for (const chunk of chunks) {
      const url =
        "https://api.mymemory.translated.net/get?q=" +
        encodeURIComponent(chunk) +
        "&langpair=" +
        encodeURIComponent(sourceLanguage + "|" + targetLanguage);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Translation request failed");
      }

      const result = await response.json();

      if (
        !result.responseData ||
        result.responseStatus !== 200
      ) {
        throw new Error("Translation unavailable");
      }

      translatedChunks.push(result.responseData.translatedText);
    }

    const translated = translatedChunks.join(" ");

    translationCache.set(cacheKey, translated);

    try {
      localStorage.setItem(
        "fbn-translation-" + encodeURIComponent(cacheKey),
        translated
      );
    } catch (storageError) {
      console.warn("Translation cache storage unavailable.");
    }

    return translated;

  } catch (error) {
    console.warn("Translation failed:", error);
    return text;
  }
}

function splitText(text, maxLength) {
  const chunks = [];
  let remaining = text;

  while (remaining.length > maxLength) {
    let splitAt = remaining.lastIndexOf(" ", maxLength);

    if (splitAt <= 0) {
      splitAt = maxLength;
    }

    chunks.push(remaining.slice(0, splitAt));
    remaining = remaining.slice(splitAt).trim();
  }

  if (remaining) chunks.push(remaining);

  return chunks;
}

// ==========================================
// EVENTS
// ==========================================

function renderEvents() {
  if (!eventsList) return;

  const events = [
    {
      date: "TBA",
      title: t("coming_soon"),
      description: t("event_description")
    },
    {
      date: "TBA",
      title: t("event_update"),
      description: t("event_update_description")
    }
  ];

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

    if (overlay) overlay.style.display = "flex";
    if (loginMessage) loginMessage.textContent = "";
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

  const newTitle = prompt(t("edit_title"), post.title);
  if (newTitle === null) return;

  if (!newTitle.trim()) {
    alert(t("empty_title"));
    return;
  }

  const newCategory = prompt(t("edit_category"), post.category);
  if (newCategory === null) return;

  if (!newCategory.trim()) {
    alert(t("empty_category"));
    return;
  }

  const newContent = prompt(t("edit_content"), post.content);
  if (newContent === null) return;

  if (!newContent.trim()) {
    alert(t("empty_content"));
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
    console.error(error);
    alert(t("update_error"));
    return;
  }

  alert(t("updated"));
  await loadPosts();
}

// ==========================================
// DELETE A POST
// ==========================================

async function deletePost(post) {
  if (!isAdmin) return;

  const confirmed = confirm(t("delete_confirm"));
  if (!confirmed) return;

  const { error } = await db
    .from("posts")
    .delete()
    .eq("id", post.id);

  if (error) {
    console.error(error);
    alert(t("delete_error"));
    return;
  }

  alert(t("deleted"));
  await loadPosts();
}

// ==========================================
// SEARCH & CATEGORY FILTER
// ==========================================

function applyPostFilters() {
  if (!newsGrid) return;

  const search = newsSearch?.value.trim().toLowerCase() || "";
  const selectedCategory = categoryFilter?.value || "all";

  const cards = newsGrid.querySelectorAll(".news-card");
  let visibleCount = 0;

  cards.forEach(card => {
    const matchesSearch =
      card.dataset.search?.includes(search) ?? true;

    const matchesCategory =
      selectedCategory === "all" ||
      card.dataset.category === selectedCategory;

    const visible = matchesSearch && matchesCategory;

    card.style.display = visible ? "" : "none";

    if (visible) visibleCount++;
  });

  let message = newsGrid.querySelector(".no-search-results");

  if (visibleCount === 0 && cards.length > 0) {
    if (!message) {
      message = document.createElement("p");
      message.className = "no-search-results";
      newsGrid.appendChild(message);
    }

    message.textContent = "No matching articles found.";
  } else if (message) {
    message.remove();
  }
}

newsSearch?.addEventListener("input", applyPostFilters);
categoryFilter?.addEventListener("change", applyPostFilters);

// ==========================================
// LOAD POSTS FROM SUPABASE
// ==========================================

async function loadPosts() {
  if (!newsGrid) return;

  newsGrid.replaceChildren();

  const { data, error } = await db
    .from("posts")
    .select("id, title, category, content, source_language, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Could not load posts:", error);
    newsGrid.textContent = t("load_error");
    return;
  }

  if (!data || data.length === 0) {
    newsGrid.textContent = t("no_posts");
    if (ticker) ticker.textContent = t("welcome");
    return;
  }

  const posts = await Promise.all(
    data.map(async post => {
      const source = post.source_language || "fr";

      if (source === currentLanguage) {
        return post;
      }

      const [title, category, content] = await Promise.all([
        translateText(post.title, source, currentLanguage),
        translateText(post.category, source, currentLanguage),
        translateText(post.content, source, currentLanguage)
      ]);

      return {
        ...post,
        title,
        category,
        content
      };
    })
  );

  posts.forEach(post => {
    const card = document.createElement("article");

    card.dataset.category = post.category.toUpperCase();
    card.dataset.search = [
      post.title,
      post.category,
      post.content
    ].join(" ").toLowerCase();
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
      editButton.title = t("edit_post");
      editButton.setAttribute("aria-label", t("edit_post"));

      editButton.addEventListener("click", event => {
        event.stopPropagation();
        editPost(post);
      });

      const deleteButton = document.createElement("button");
      deleteButton.className = "post-delete-button";
      deleteButton.type = "button";
      deleteButton.textContent = "🗑";
      deleteButton.title = t("delete_post");
      deleteButton.setAttribute("aria-label", t("delete_post"));

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
    date.textContent = new Date(post.created_at).toLocaleDateString(
      currentLanguage === "ar" ? "ar" :
      currentLanguage === "es" ? "es-ES" :
      currentLanguage === "en" ? "en-GB" : "fr-FR"
    );

    content.append(category, title, description, date);
    card.append(image, content);

    function openArticle() {
      const articleURL = new URL("./article.html", window.location.href);
      articleURL.searchParams.set("id", post.id);
      articleURL.searchParams.set("lang", currentLanguage);
      window.open(articleURL.href, "_blank", "noopener,noreferrer");
    }

    card.addEventListener("click", openArticle);

    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");

    card.addEventListener("keydown", event => {
      if (
        event.target === card &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();
        openArticle();
      }
    });

    newsGrid.appendChild(card);
  });

  if (ticker) {
    ticker.textContent = posts[0].title;
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
      loginMessage.textContent = t("no_access");
    }

    if (overlay) overlay.style.display = "flex";

    await loadPosts();
    return;
  }

  showFamilySite();

  isAdmin = member.role === "admin";

  if (dashboard) {
    dashboard.classList.toggle("active", isAdmin);
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

    loginMessage.textContent = t("signing_in");

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
      loginMessage.textContent = t("login_failed");
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

    postMessage.textContent = t("publishing");

    const {
      data: { user },
      error: userError
    } = await db.auth.getUser();

    if (userError || !user) {
      postMessage.textContent = t("login_again");
      return;
    }

    const { error } = await db.from("posts").insert({
      title: postTitle.value.trim(),
      category: postCategory.value,
      content: postDescription.value.trim(),
      source_language: postLanguage ? postLanguage.value : "fr",
      author_id: user.id
    });

    if (error) {
      console.error(error);
      postMessage.textContent = t("publish_error");
      return;
    }

    postForm.reset();

    if (postLanguage) {
      postLanguage.value = "fr";
    }

    postMessage.textContent = t("published");

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

    if (overlay) overlay.style.display = "flex";
    if (loginMessage) loginMessage.textContent = t("logged_out");
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

// ==========================================
// START WEBSITE
// ==========================================

applyLanguage();
restoreSession();

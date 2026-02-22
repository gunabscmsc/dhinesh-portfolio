// ===== Theme toggle (dark/light) =====
const themeBtn = document.getElementById("themeBtn");
const root = document.documentElement;

function setTheme(mode) {
  if (mode === "light") {
    root.setAttribute("data-theme", "light");
    themeBtn.textContent = "☀️";
  } else {
    root.removeAttribute("data-theme");
    themeBtn.textContent = "🌙";
  }
  localStorage.setItem("theme", mode);
}

const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme || "dark");

themeBtn.addEventListener("click", () => {
  const isLight = root.getAttribute("data-theme") === "light";
  setTheme(isLight ? "dark" : "light");
});

// ===== Mobile nav =====
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");

navToggle?.addEventListener("click", () => {
  const open = navList.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

// close menu on link click (mobile)
navList?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    navList.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ===== Update year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Add your links here =====
const LINKEDIN_URL = ""; // e.g. "https://www.linkedin.com/in/your-handle"
const GITHUB_URL = "";   // e.g. "https://github.com/your-username"
const REPO_URL = "";     // e.g. "https://github.com/APT-Tool"

const linkedinLink = document.getElementById("linkedinLink");
const githubLink = document.getElementById("githubLink");
const repoLink = document.getElementById("repoLink");

function setLink(el, url, fallbackText) {
  if (!el) return;
  if (url && url.trim().length > 0) {
    el.href = url;
    el.textContent = fallbackText;
  } else {
    el.href = "#";
    el.textContent = `${fallbackText} (add link)`;
  }
}

setLink(linkedinLink, LINKEDIN_URL, "LinkedIn");
setLink(githubLink, GITHUB_URL, "GitHub");
setLink(repoLink, REPO_URL, "GitHub Repo");

// ===== Copy project summary =====
const copyBtn = document.getElementById("copyProjectBtn");
const copyHint = document.getElementById("copyHint");

const projectSummary = `Automated Penetration Testing Tool Framework:
CLI-based automation framework that unifies ethical hacking tools across reconnaissance/exploitation into a portable, multi-threaded pipeline. Supports batch-mode scanning and menu-driven interface without GUI/external APIs.`;

copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(projectSummary);
    copyHint.textContent = "Copied ✓";
    setTimeout(() => (copyHint.textContent = ""), 1200);
  } catch {
    copyHint.textContent = "Copy failed (browser permission).";
  }
});

// ===== Contact form (local only) =====
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const payload = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim(),
    savedAt: new Date().toISOString()
  };

  const items = JSON.parse(localStorage.getItem("contact_messages") || "[]");
  items.unshift(payload);
  localStorage.setItem("contact_messages", JSON.stringify(items));

  statusEl.textContent = "Saved in browser ✓ (no backend)";
  form.reset();
  setTimeout(() => (statusEl.textContent = ""), 2000);
});
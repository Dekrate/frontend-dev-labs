const menu = document.getElementById("mobileMenu");
const menuButton = document.getElementById("menuButton");
const themeButton = document.getElementById("themeButton");

if (!menu || !menuButton) {
  throw new Error("Navbar elements not found.");
}

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

let lastFocused = null;

function setMenuOpen(open) {
  if (open) {
    lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    menu.hidden = false;
    requestAnimationFrame(() => {
      menu.dataset.state = "open";
    });
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close menu");
    document.documentElement.classList.add("scroll-lock");
    const first = menu.querySelector(focusableSelector);
    if (first instanceof HTMLElement) first.focus();
  } else {
    menu.dataset.state = "closing";
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    document.documentElement.classList.remove("scroll-lock");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finalize = () => {
      menu.hidden = true;
      delete menu.dataset.state;
    };
    if (prefersReducedMotion) {
      finalize();
    } else {
      window.setTimeout(finalize, 280);
    }
    if (lastFocused) lastFocused.focus();
  }
}

function isOpen() {
  return menu.hidden === false && menu.dataset.state === "open";
}

menuButton.addEventListener("click", () => setMenuOpen(!isOpen()));

menu.addEventListener("click", (e) => {
  const target = e.target;
  if (!(target instanceof HTMLElement)) return;
  if (target.closest("[data-close]")) setMenuOpen(false);
  if (target.closest(".menu__link")) setMenuOpen(false);
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isOpen()) setMenuOpen(false);
});

if (themeButton) {
  const storageKey = "lab02-theme";
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const stored = window.localStorage.getItem(storageKey);
  const initial = stored === "light" || stored === "dark" ? stored : prefersDark ? "dark" : "light";

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeButton.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
    );
  }

  applyTheme(initial);

  themeButton.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    window.localStorage.setItem(storageKey, next);
    applyTheme(next);
  });
}

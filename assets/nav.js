// === Dontraval Navbar + Theme Toggle ===
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const navList = nav.querySelector("ul");

  // Menu toggle for mobile
  const menuIcon = document.createElement("div");
  menuIcon.classList.add("menu-toggle");
  menuIcon.innerHTML = "☰";
  nav.prepend(menuIcon);

  menuIcon.addEventListener("click", () => {
    navList.classList.toggle("active");
  });

  // === Dark/Light mode toggle ===
  const themeBtn = document.createElement("button");
  themeBtn.classList.add("theme-toggle");
  themeBtn.innerHTML = "🌙";
  nav.appendChild(themeBtn);

  // Apply saved theme
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  themeBtn.innerHTML = currentTheme === "dark" ? "☀️" : "🌙";

  // Toggle theme
  themeBtn.addEventListener("click", () => {
    const theme = document.documentElement.getAttribute("data-theme");
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeBtn.innerHTML = newTheme === "dark" ? "☀️" : "🌙";
  });
});

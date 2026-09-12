(() => {
  let storedTheme;
  try { storedTheme = localStorage.getItem("theme"); } catch { /* Use system preference. */ }
  const theme = storedTheme === "light" || storedTheme === "dark"
    ? storedTheme
    : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  document.documentElement.dataset.theme = theme;
})();

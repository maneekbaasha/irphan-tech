import { useEffect, useState } from "react";

type Lang = "fr" | "en";

function readLang(): Lang {
  return (typeof document === "undefined" ? "fr" : document.documentElement.lang).toLowerCase().startsWith("fr") ? "fr" : "en";
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    () => typeof document === "undefined" || document.documentElement.dataset.theme !== "light",
  );
  const [lang, setLang] = useState<Lang>(readLang);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const followSystem = (event: MediaQueryListEvent) => {
      try { if (localStorage.getItem("theme")) return; } catch { /* System preference remains available. */ }
      setDark(event.matches);
      document.documentElement.dataset.theme = event.matches ? "dark" : "light";
    };
    media.addEventListener("change", followSystem);
    return () => media.removeEventListener("change", followSystem);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => setLang(readLang()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch { /* Theme still works without persistence. */ }
  }

  const label = lang === "fr"
    ? (dark ? "Activer le thème clair" : "Activer le thème sombre")
    : (dark ? "Switch to light theme" : "Switch to dark theme");
  const title = lang === "fr"
    ? (dark ? "Mode clair" : "Mode sombre")
    : (dark ? "Light mode" : "Dark mode");

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={dark}
      title={title}
    >
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{dark ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></> : <path d="M20 15.4A8.5 8.5 0 0 1 8.6 4a8.5 8.5 0 1 0 11.4 11.4Z" />}</svg>
    </button>
  );
}

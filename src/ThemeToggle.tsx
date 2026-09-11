import { useEffect, useState } from "react";

type Lang = "fr" | "en";

function readLang(): Lang {
  return document.documentElement.lang.toLowerCase().startsWith("fr") ? "fr" : "en";
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    () => document.documentElement.dataset.theme !== "light",
  );
  const [lang, setLang] = useState<Lang>(readLang);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const followSystem = (event: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return;
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
    localStorage.setItem("theme", next ? "dark" : "light");
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
      <span aria-hidden="true">{dark ? "☼" : "☾"}</span>
    </button>
  );
}

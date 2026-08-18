import { useState } from "react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);
  function toggle() {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
  }
  return <button className="theme-toggle" type="button" onClick={toggle} aria-label={light ? "Activer le thème sombre" : "Activer le thème clair"} aria-pressed={light}>{light ? "☾" : "☼"}</button>;
}

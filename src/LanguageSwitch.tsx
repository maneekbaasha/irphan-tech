type Language = "fr" | "en";

function alternatePath(pathname: string, target: Language) {
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  if (target === "en") {
    return normalized === "/" ? "/en/" : `/en${normalized}/`;
  }

  const frenchPath = normalized.replace(/^\/en(?=\/|$)/, "") || "/";
  return frenchPath === "/" ? "/" : `${frenchPath}/`;
}

export default function LanguageSwitch({ language }: { language: Language }) {
  const target: Language = language === "fr" ? "en" : "fr";
  const href = typeof window === "undefined"
    ? target === "en" ? "/en/" : "/"
    : alternatePath(window.location.pathname, target);

  return (
    <a
      className="language-switch"
      href={href}
      lang={target}
      hrefLang={target}
      aria-label={language === "fr" ? "Afficher le site en anglais" : "View the site in French"}
    >
      {target.toUpperCase()}
    </a>
  );
}

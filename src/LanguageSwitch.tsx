type Language = "fr" | "en";

export default function LanguageSwitch({
  language,
  href,
}: {
  language: Language;
  href: string;
}) {
  const target: Language = language === "fr" ? "en" : "fr";

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

import { useEffect } from "react";
import LanguageSwitch from "./LanguageSwitch";

export default function NotFound({ language = "fr" }: { language?: "fr" | "en" }) {
  const english = language === "en";

  useEffect(() => {
    const previousTitle = document.title;
    document.title = english
      ? "404 — Page not found | Irphanoullah"
      : "404 — Page introuvable | Irphanoullah";
    return () => {
      document.title = previousTitle;
    };
  }, [english]);

  return (
    <main className="not-found-page" aria-labelledby="not-found-title">
      <div className="not-found-grid" aria-hidden="true" />

      <a className="not-found-brand" href={english ? "/en/" : "/"} aria-label={english ? "Back to home" : "Retour à l’accueil"}>
        IRPHAN<span>.</span>
      </a>
      <div className="not-found-language">
        <LanguageSwitch language={language} href={english ? "/" : "/en/"} />
      </div>

      <section className="not-found-content">
        <p className="not-found-kicker">ERROR / 404</p>
        <p className="not-found-code" aria-hidden="true">404</p>

        <div className="not-found-copy">
          <h1 id="not-found-title">{english ? "This page has left the system." : "Cette page a quitté le système."}</h1>
          <p>{english
            ? "The address may still exist somewhere in the web’s history, but not here. The portfolio is very much alive."
            : "L’adresse existe peut-être encore quelque part dans l’historique du web, mais plus ici. Le portfolio, lui, est bien vivant."}</p>
        </div>

        <nav className="not-found-actions" aria-label={english ? "Fallback navigation" : "Navigation de secours"}>
          <a className="not-found-primary" href={english ? "/en/" : "/"}>
            {english ? "Back to home" : "Retour à l’accueil"} <span aria-hidden="true">↗</span>
          </a>
          <a href={english ? "/en/portfolio/" : "/portfolio/"}>{english ? "View projects" : "Voir les projets"}</a>
        </nav>
      </section>

      <footer className="not-found-footer">
        <span>IRPHAN / EU</span>
        <span>Technology · Support · Security · AI</span>
      </footer>
    </main>
  );
}

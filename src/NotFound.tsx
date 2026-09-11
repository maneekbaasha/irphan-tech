import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "404 — Page introuvable | Irphanoullah";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main className="not-found-page" aria-labelledby="not-found-title">
      <div className="not-found-grid" aria-hidden="true" />

      <a className="not-found-brand" href="/" aria-label="Retour à l’accueil">
        IRPHAN<span>.</span>
      </a>

      <section className="not-found-content">
        <p className="not-found-kicker">ERROR / 404</p>
        <p className="not-found-code" aria-hidden="true">404</p>

        <div className="not-found-copy">
          <h1 id="not-found-title">Cette page a quitté le système.</h1>
          <p>
            L’adresse existe peut-être encore quelque part dans l’historique du web,
            mais plus ici. Le portfolio, lui, est bien vivant.
          </p>
        </div>

        <nav className="not-found-actions" aria-label="Navigation de secours">
          <a className="not-found-primary" href="/">
            Retour à l’accueil <span aria-hidden="true">↗</span>
          </a>
          <a href="/#projects">Voir les projets</a>
        </nav>
      </section>

      <footer className="not-found-footer">
        <span>IRPHAN / EU</span>
        <span>Technology · Support · Security · AI</span>
      </footer>
    </main>
  );
}

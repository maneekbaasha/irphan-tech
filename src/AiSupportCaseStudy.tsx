import { useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const tests = [
  ["01", "Documentation d’abord", "Le modèle local ne peut pas remplacer une première étape déjà documentée par une réponse improvisée."],
  ["02", "Incident sécurité", "Un terminal professionnel perdu est classé comme incident de sécurité et non comme simple demande utilisateur."],
  ["03", "Réponse alignée", "Le scénario Outlook doit rester cohérent avec la procédure de résolution documentée."],
  ["04", "Décision humaine", "Le rapport final doit explicitement conserver une décision ou validation humaine."],
  ["05", "Fallback sûr", "Une demande inconnue déclenche une réponse prudente plutôt qu’une procédure inventée."],
];

export default function AiSupportCaseStudy() {
  useEffect(() => {
    const previous = document.title;
    document.title = "AI IT Support Lab — Étude de cas | Irphanoullah";
    return () => { document.title = previous; };
  }, []);

  return (
    <main className="case-page">
      <a className="skip-link" href="#case-content">Aller au contenu</a>
      <header className="case-topbar">
        <a href="/#projects" className="case-back">← Portfolio</a>
        <span>Étude de cas · IA & Support IT</span>
        <ThemeToggle />
      </header>

      <section className="case-hero" id="case-content">
        <div className="case-hero-grid" aria-hidden="true" />
        <div className="case-kicker">AI IT Support Lab · 2026</div>
        <h1>Assister le technicien.<br /><em>Pas décider à sa place.</em></h1>
        <p className="case-lead">Un prototype local d’assistant support qui qualifie une demande, s’appuie sur une base documentaire et prépare une réponse tout en conservant des garde-fous explicites et une validation humaine.</p>
        <div className="case-actions"><a href="#tests" className="pill-button light">Voir les garde-fous ↓</a></div>
        <div className="case-facts">
          <div><span>Format</span><strong>Prototype local</strong></div>
          <div><span>Stack</span><strong>Python · LLM · RAG</strong></div>
          <div><span>Validation</span><strong>5 tests automatisés</strong></div>
          <div><span>Principe</span><strong>Human in the loop</strong></div>
        </div>
      </section>

      <section className="case-section case-overview">
        <div className="case-number">01 · Problème</div>
        <div className="case-two-columns">
          <h2>Utiliser l’IA<br /><em>sans sacrifier la méthode.</em></h2>
          <div className="case-copy">
            <p className="case-copy-lead">L’objectif n’est pas de construire un chatbot qui “répond à tout”, mais un copilote qui reste subordonné à la documentation et aux règles du support.</p>
            <p>Quand la base documentaire contient une procédure connue, elle reste prioritaire. Quand la situation est incertaine ou sensible, l’assistant doit signaler la limite, escalader ou demander une validation humaine plutôt que fabriquer une solution.</p>
          </div>
        </div>
        <div className="case-architecture" aria-label="Flux de l’assistant">
          <div><span>01</span><strong>Ticket</strong><small>Demande utilisateur</small></div><i>→</i>
          <div><span>02</span><strong>Qualification</strong><small>Contexte & risque</small></div><i>→</i>
          <div><span>03</span><strong>Documentation</strong><small>Recherche & contraintes</small></div><i>→</i>
          <div><span>04</span><strong>Technicien</strong><small>Validation & décision</small></div>
        </div>
      </section>

      <section className="case-section case-incidents" id="tests">
        <div className="case-number">02 · Garde-fous testés</div>
        <div className="case-heading-row">
          <h2>Cinq tests.<br /><em>Cinq limites utiles.</em></h2>
          <p>La première version du moteur est validée par une suite de tests unitaires qui vérifie surtout ce que l’assistant ne doit pas faire.</p>
        </div>
        <div className="incident-list">
          {tests.map(([id,title,description]) => (
            <article className="incident-card" key={id}>
              <header><span>TEST {id}</span><h3>{title}</h3></header>
              <div className="incident-grid"><div><small>Comportement attendu</small><p>{description}</p></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="case-section case-lessons">
        <div className="case-number">03 · Ce que le projet démontre</div>
        <div className="lesson-grid">
          <div>
            <h2>IA appliquée.<br /><em>Responsabilité conservée.</em></h2>
            <div className="case-chips">{["Python", "LLM local", "RAG", "Support IT", "Tests unitaires", "Fallback", "Documentation", "Human validation"].map((skill)=><span key={skill}>{skill}</span>)}</div>
          </div>
          <div className="case-limit">
            <span>État du projet</span>
            <h3>Un MVP, pas un produit fini.</h3>
            <p>Le prototype fonctionne localement et les cinq tests de comportement passent. Il ne prétend pas remplacer un outil ITSM, un moteur de décision sécurité ou un technicien expérimenté.</p>
            <p>La suite logique consiste à enrichir la base documentaire, tracer les sources utilisées et mesurer la qualité des réponses sur davantage de scénarios.</p>
          </div>
        </div>
      </section>

      <section className="case-cta">
        <span>Approche</span>
        <h2>L’intérêt du projet n’est pas “l’IA”.<br />C’est la manière de la garder sous contrôle.</h2>
        <div className="case-actions"><a href="/#projects" className="pill-button light">Retour aux projets</a></div>
        <footer><span>© 2026 Irphanoullah Mohamed Mustapha</span><a href="#case-content">Retour en haut ↑</a></footer>
      </section>
    </main>
  );
}

import { useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const repo = "https://github.com/maneekbaasha/nginx-soc-detection-lab";

const detections = [
  ["100100", "Tentative d’accès sensible", "Détecte une requête vers /.htpasswd ou /.env, même lorsque la ressource n’est pas servie."],
  ["100101", "Exposition réussie", "Monte la sévérité lorsqu’un fichier sensible est réellement renvoyé avec un statut HTTP 200."],
  ["100102", "Reconnaissance corrélée", "Corrèle quatre recherches de fichiers sensibles en 60 secondes depuis la même adresse IP."],
];

export default function NginxCaseStudy() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Nginx SOC Detection Lab — Étude de cas | Irphanoullah";
    return () => { document.title = previous; };
  }, []);

  return (
    <main className="case-page">
      <a className="skip-link" href="#case-content">Aller au contenu</a>
      <header className="case-topbar">
        <a href="/#projects" className="case-back">← Portfolio</a>
        <span>Étude de cas · Blue Team</span>
        <ThemeToggle />
      </header>

      <section className="case-hero" id="case-content">
        <div className="case-hero-grid" aria-hidden="true" />
        <div className="case-kicker">Nginx SOC Detection Lab · 2026</div>
        <h1>Observer l’attaque.<br /><em>Prouver la remédiation.</em></h1>
        <p className="case-lead">Un laboratoire Blue Team local qui met côte à côte un serveur Nginx volontairement vulnérable et sa version durcie, puis transforme leur télémétrie JSON en détections Wazuh testables.</p>
        <div className="case-actions">
          <a className="pill-button light" href={repo} target="_blank" rel="noreferrer">Explorer le dépôt <span>↗</span></a>
          <a href="#detections">Voir les détections ↓</a>
        </div>
        <div className="case-facts">
          <div><span>Type</span><strong>Blue Team lab</strong></div>
          <div><span>Stack</span><strong>Nginx · Docker · Wazuh</strong></div>
          <div><span>Détection</span><strong>3 règles corrélées</strong></div>
          <div><span>Validation</span><strong>Tests Bash de non-régression</strong></div>
        </div>
      </section>

      <section className="case-section case-overview">
        <div className="case-number">01 · Contexte</div>
        <div className="case-two-columns">
          <h2>Créer une faille<br /><em>pour apprendre à la détecter.</em></h2>
          <div className="case-copy">
            <p className="case-copy-lead">Le serveur vulnérable utilise volontairement /etc/nginx comme racine web, ce qui permet d’exposer un fichier .htpasswd fictif sur le port 8080.</p>
            <p>Le serveur durci, disponible en parallèle sur le port 8081, replace la racine web dans /usr/share/nginx/html et bloque explicitement les dotfiles. Cette coexistence permet de comparer avant/après sans ambiguïté.</p>
          </div>
        </div>
        <div className="case-architecture" aria-label="Architecture du laboratoire">
          <div><span>01</span><strong>Nginx vulnérable</strong><small>Port 8080 · exposition contrôlée</small></div><i>→</i>
          <div><span>02</span><strong>Logs JSON</strong><small>IP · méthode · chemin · statut</small></div><i>→</i>
          <div><span>03</span><strong>Wazuh</strong><small>Détection & corrélation</small></div><i>→</i>
          <div><span>04</span><strong>Nginx durci</strong><small>Port 8081 · validation</small></div>
        </div>
      </section>

      <section className="case-section case-incidents" id="detections">
        <div className="case-number">02 · Détection</div>
        <div className="case-heading-row">
          <h2>De l’intention<br /><em>à l’incident.</em></h2>
          <p>Les règles distinguent une simple recherche de fichier sensible, une exposition réellement réussie et une reconnaissance répétée.</p>
        </div>
        <div className="incident-list">
          {detections.map(([id,title,description]) => (
            <article className="incident-card" key={id}>
              <header><span>Règle {id}</span><h3>{title}</h3></header>
              <div className="incident-grid"><div><small>Logique</small><p>{description}</p></div></div>
              <a href={`${repo}/blob/main/rules/wazuh/local_rules.xml`} target="_blank" rel="noreferrer">Voir les règles sur GitHub ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="case-section case-lessons">
        <div className="case-number">03 · Remédiation & validation</div>
        <div className="lesson-grid">
          <div>
            <h2>Corriger.<br /><em>Puis tester que ça tient.</em></h2>
            <div className="case-chips">{["Docker", "Nginx", "JSON logs", "Wazuh", "Corrélation", "Bash", "Hardening", "Non-régression"].map((skill)=><span key={skill}>{skill}</span>)}</div>
          </div>
          <div className="case-limit">
            <span>Validation</span>
            <h3>Le script doit casser si la faille revient.</h3>
            <p>Le script de remédiation vérifie que la vulnérabilité reste reproductible sur le serveur témoin, que .htpasswd et .env sont bloqués sur la version durcie, et que l’authentification légitime fonctionne toujours.</p>
            <p>Le projet est volontairement local et pédagogique : Wazuh y sert de moteur de règles, sans indexeur ni dashboard de production.</p>
          </div>
        </div>
      </section>

      <section className="case-cta">
        <span>Preuve technique</span>
        <h2>Configuration, règles Wazuh, captures et tests<br />sont documentés dans le dépôt.</h2>
        <div className="case-actions"><a className="pill-button light" href={repo} target="_blank" rel="noreferrer">Ouvrir GitHub <span>↗</span></a><a href="/#projects">Retour aux projets</a></div>
        <footer><span>© 2026 Irphanoullah Mohamed Mustapha</span><a href="#case-content">Retour en haut ↑</a></footer>
      </section>
    </main>
  );
}

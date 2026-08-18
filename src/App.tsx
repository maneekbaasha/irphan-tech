import ThemeToggle from "./ThemeToggle";

const Arrow = () => <span aria-hidden="true">↗</span>;

const skills = ["Audit de sécurité", "OSINT", "Cartographie réseau", "Analyse de surface d’attaque", "Linux & Windows", "Wazuh", "Nmap", "Wireshark", "ISO 27001 / NIST", "OWASP Top 10", "MITRE ATT&CK", "Pentest exploratoire"];

const projects = [
  { number: "01", eyebrow: "Audit & exposition", title: "Comprendre avant de protéger", text: "Étude de l’exposition publique d’une PME, analyse OSINT et identification des risques humains, techniques et organisationnels.", tags: ["OSINT", "Surface d’attaque", "Risques"] },
  { number: "02", eyebrow: "Architecture", title: "Rendre le système lisible", text: "Construction d’une cartographie réseau et applicative pour relier actifs, flux, dépendances et priorités de sécurisation.", tags: ["Réseau", "Cartographie", "Analyse"] },
  { number: "03", eyebrow: "Remédiation", title: "Transformer les constats en décisions", text: "Tests de sécurité exploratoires, restitution des vulnérabilités et plan d’actions priorisé à court, moyen et long terme.", tags: ["Pentest", "ISO 27001", "Recommandations"] },
  { number: "04", eyebrow: "Web & sécurité", title: "Construire un portfolio souverain", text: "Développement et déploiement continu d’un portfolio React avec Cloudflare Workers, en-têtes de sécurité, suivi Git et audit des dépendances.", tags: ["React", "Cloudflare", "CI/CD", "Sécurité web"], url: "https://github.com/maneekbaasha/irphan-tech" },
];

export default function App() {
  return <main>
    <nav className="nav" aria-label="Navigation principale">
      <a className="monogram" href="#accueil" aria-label="Retour à l’accueil">IRPHAN<span>.TECH</span></a>
      <div className="nav-links"><a href="#formation">Formation</a><a href="#projets">Projets</a><a href="#experience">Expérience</a><a href="#expertise">Compétences</a><a className="nav-contact" href="mailto:mohamed.irphan09@gmail.com">Contact <Arrow /></a><ThemeToggle /></div>
    </nav>

    <section className="hero" id="accueil">
      <div className="hero-copy">
        <p className="kicker enter delay-1"><span className="status-dot" /> Cybersécurité · Audit · Défense</p>
        <h1 className="enter delay-2"><small>Bonjour, je suis</small>Irphan<br /><em>Mohamed</em></h1>
        <p className="hero-lead enter delay-3">J’analyse les systèmes, leurs usages et leurs angles morts pour transformer la complexité en décisions de sécurité claires.</p>
        <div className="hero-actions enter delay-4"><a className="button primary" href="#projets">Découvrir mes projets <span>↓</span></a><a className="text-link" href="https://www.linkedin.com/in/irphan-mohamed-mustapha/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div>
      </div>
      <div className="portrait-wrap gaming-wrap enter delay-3" aria-label="Personnage gaming inspiré d’Irphan Mohamed">
        <div className="portrait-media gaming-media"><img src="/irphan-gaming-character.webp" alt="Personnage gaming d’Irphan Mohamed avec un ordinateur" width="900" height="1350" decoding="async" fetchPriority="high" /></div>
        <div className="portrait-caption"><span>Basé en Île-de-France</span><span>Analyse · Défense · Conseil</span></div>
      </div>
    </section>

    <section className="education" id="formation">
      <div className="section-heading reveal"><p className="section-index">02 — Formation</p><h2>Apprendre.<br />Appliquer.</h2></div>
      <div className="education-grid">
        <article className="education-card reveal"><p>2026</p><h3>Administrateur d’infrastructures sécurisées</h3><span>Titre professionnel RNCP niveau 6 · en cours de validation</span></article>
        <article className="education-card reveal"><p>2024 — 2025</p><h3>Cybersécurité FullStack</h3><span>Jedha Bootcamp · Blue Team, Red Team, GRC, réseaux et systèmes</span></article>
        <article className="education-card reveal"><p>2025 — 2026</p><h3>Certifications & fondamentaux</h3><span>INFOSEC Cybersecurity Foundations · préparation CompTIA Security+</span></article>
        <article className="education-card reveal"><p>2026</p><h3>Cisco Networking Basics</h3><span>Certification Cisco Networking Academy · fondamentaux des réseaux et de la connectivité</span></article>
      </div>
    </section>

    <section className="statement reveal" aria-label="Présentation">
      <p className="section-index">01 — Profil</p>
      <div><p className="big-statement">Une approche de la sécurité à la croisée de la <strong>technique</strong>, du <strong>risque</strong> et de l’<strong>humain</strong>.</p><p className="body-copy">Après huit années dans un environnement technologique exigeant chez Apple, j’ai choisi de mettre mon expérience du diagnostic, de la pédagogie et de la résolution de problèmes au service de la cybersécurité. Aujourd’hui, je développe une pratique orientée terrain : observer, vérifier, documenter et rendre les risques compréhensibles.</p></div>
    </section>

    <section className="work-section" id="projets">
      <div className="section-heading reveal"><p className="section-index">03 — Projets</p><h2>Du terrain.<br />Des preuves.</h2></div>
      <div className="project-grid">{projects.map((project) => <article className="project-card reveal" key={project.number}><div className="card-top"><span>{project.number}</span><span>{project.eyebrow}</span></div><h3>{project.title}</h3><p>{project.text}</p><div className="project-bottom">{project.url && <a className="project-link" href={project.url} target="_blank" rel="noreferrer">Voir le code source <Arrow /></a>}<div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
      <p className="confidential-note reveal">Mission réalisée dans le respect de la confidentialité client. Les méthodes et livrables sont présentés sans données sensibles.</p>
    </section>

    <section className="journey" id="experience" aria-label="Parcours professionnel">
      <div className="section-heading reveal"><p className="section-index">04 — Expérience</p><h2>Parcours<br />professionnel</h2></div>
      <div className="timeline">
        <article className="timeline-item reveal"><p>2025 — 2026</p><div><h3>Consultant cybersécurité · Mission d’audit</h3><span>CyberLion — CECCA</span><p>Audit de maturité, OSINT, cartographie, tests de sécurité, stratégie GRC et rédaction de livrables décisionnels.</p></div></article>
        <article className="timeline-item reveal"><p>2017 — 2026</p><div><h3>Solutions Consultant</h3><span>Apple</span><p>Diagnostic, accompagnement technique, gestion d’incidents, mentorat, QA fonctionnelle et communication dans un environnement à forte exigence.</p></div></article>
        <article className="timeline-item reveal"><p>2024 — 2026</p><div><h3>Cybersécurité FullStack & infrastructures sécurisées</h3><span>Jedha Bootcamp · Parcours RNCP</span><p>Blue Team, Red Team, GRC, réseaux, systèmes et projets appliqués. Préparation CompTIA Security+.</p></div></article>
      </div>
    </section>

    <section className="expertise" id="expertise">
      <div className="section-heading reveal"><p className="section-index">05 — Boîte à outils</p><h2>Compétences<br />en mouvement</h2></div>
      <div className="skill-cloud reveal">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
      <p className="learning-note reveal">Je préfère une compétence démontrée à une longue liste de logos. Mon travail progresse par la pratique, la documentation et la confrontation aux cas réels.</p>
    </section>

    <section className="contact" id="contact">
      <p className="kicker reveal"><span className="status-dot" /> Ouvert aux échanges professionnels</p>
      <h2 className="reveal">Parlons de ce que je peux<br /><em>apporter à votre équipe.</em></h2>
      <div className="contact-actions reveal"><a className="button light" href="mailto:mohamed.irphan09@gmail.com">Écrire un e-mail <Arrow /></a><a className="text-link light-link" href="https://www.linkedin.com/in/irphan-mohamed-mustapha/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a className="text-link light-link" href="https://github.com/maneekbaasha" target="_blank" rel="noreferrer">GitHub <Arrow /></a></div>
      <footer><span>© 2026 Irphan.tech</span><a href="#accueil">Retour en haut ↑</a></footer>
    </section>
  </main>;
}

import ThemeToggle from "./ThemeToggle";

const Arrow = () => <span aria-hidden="true">↗</span>;

const skills = [
  "Support utilisateurs",
  "Diagnostic & résolution d’incidents",
  "Windows, macOS & Linux",
  "Microsoft Entra ID & Intune",
  "Jira & gestion de tickets",
  "Déploiement & conformité des postes",
  "Réseaux TCP/IP",
  "Documentation technique",
  "Accompagnement & pédagogie",
  "Audit de sécurité",
  "OSINT & surface d’attaque",
  "Nmap & Wireshark",
  "Wazuh & détection",
  "ISO 27001 / NIST / OWASP",
];

const projects = [
  {
    number: "01",
    eyebrow: "Support IT & administration",
    title: "Gérer le cycle de vie d’un poste",
    text: "Laboratoire Helpdesk reproduisant des situations réelles : gestion de tickets, intégration d’utilisateurs, Microsoft Entra ID, conformité Intune, déploiement logiciel et résolution d’incidents Windows.",
    tags: ["Intune", "Entra ID", "Jira", "Windows", "MDM"],
    url: "https://github.com/maneekbaasha/modern-it-helpdesk-lab",
  },
  {
    number: "02",
    eyebrow: "Blue Team & détection",
    title: "Détecter, corréler, remédier",
    text: "Lab SOC conteneurisé comparant un serveur Nginx vulnérable et durci, avec journaux JSON, règles Wazuh, corrélation par IP et tests automatisés de non-régression.",
    tags: ["Wazuh", "Nginx", "Docker", "Détection"],
    url: "https://github.com/maneekbaasha/nginx-soc-detection-lab",
  },
  {
    number: "03",
    eyebrow: "Audit & exposition",
    title: "Comprendre avant de protéger",
    text: "Étude de l’exposition publique d’une PME, analyse OSINT et identification des risques humains, techniques et organisationnels.",
    tags: ["OSINT", "Surface d’attaque", "Risques"],
  },
  {
    number: "04",
    eyebrow: "Architecture",
    title: "Rendre le système lisible",
    text: "Construction d’une cartographie réseau et applicative pour relier actifs, flux, dépendances et priorités de sécurisation.",
    tags: ["Réseau", "Cartographie", "Analyse"],
  },
  {
    number: "05",
    eyebrow: "Remédiation",
    title: "Transformer les constats en décisions",
    text: "Tests de sécurité exploratoires, restitution des vulnérabilités et plan d’actions priorisé à court, moyen et long terme.",
    tags: ["Pentest", "ISO 27001", "Recommandations"],
  },
  {
    number: "06",
    eyebrow: "Web & infrastructure",
    title: "Construire et exploiter ce portfolio",
    text: "Conception d’un portfolio React, gestion du code avec GitHub, déploiement continu sur Cloudflare et mise en place des fondamentaux de sécurité et de référencement.",
    tags: ["React", "GitHub", "Cloudflare", "CI/CD"],
    url: "https://github.com/maneekbaasha/irphan-tech",
  },
];

const labProfiles = [
  {
    initials: "THM",
    platform: "TryHackMe",
    title: "Apprendre par la pratique",
    text: "Parcours guidés et laboratoires consacrés aux fondamentaux de la cybersécurité, au réseau et au pentest junior.",
    stats: ["Niveau 8", "5 522 points", "53 rooms", "9 badges", "Top 9 %"],
    url: "https://tryhackme.com/p/maneekbaasha",
  },
  {
    initials: "RM",
    platform: "Root-Me",
    title: "Résoudre et compromettre",
    text: "Challenges techniques et environnements réalistes pour développer une démarche structurée d’énumération et d’exploitation.",
    stats: ["36 challenges", "2 compromissions", "490 points"],
    url: "https://www.root-me.org/maneekbaasha?lang=fr",
  },
  {
    initials: "HTB",
    platform: "Hack The Box",
    title: "Approfondir les méthodes",
    text: "Modules Academy et exercices pratiques pour consolider les compétences offensives, Linux et sécurité des systèmes.",
    stats: ["HTB Academy", "Badges publics"],
    url: "https://profile.hackthebox.com/profile/019fa470-4b52-70d3-ad9d-ca778a6b0d6a",
  },
];

export default function App() {
  return <main>
    <nav className="nav" aria-label="Navigation principale">
      <a className="monogram" href="#accueil" aria-label="Retour à l’accueil">IRPHAN<span>IT · SUPPORT · SECURITY</span></a>
      <div className="nav-links"><a href="#formation">Formation</a><a href="#projets">Projets</a><a href="#plateformes">Plateformes</a><a href="#experience">Expérience</a><a href="#expertise">Compétences</a><a className="nav-contact" href="mailto:info@irphan.eu">Contact <Arrow /></a><ThemeToggle /></div>
    </nav>

    <section className="hero" id="accueil">
      <div className="hero-copy">
        <p className="kicker enter delay-1"><span className="status-dot" /> Support IT · Systèmes & réseaux · Cybersécurité</p>
        <h1 className="enter delay-2"><small>Bonjour, je suis</small>Irphan<br /><em>Mohamed</em></h1>
        <p className="hero-lead enter delay-3">J’accompagne les utilisateurs, résous les incidents et contribue à des environnements informatiques fiables, documentés et sécurisés.</p>
        <div className="hero-actions enter delay-4"><a className="button primary" href="#projets">Découvrir mes projets <span>↓</span></a><a className="text-link" href="https://www.linkedin.com/in/irphan-mohamed-mustapha/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div>
      </div>
      <div className="portrait-wrap gaming-wrap enter delay-3" aria-label="Personnage gaming inspiré d’Irphan Mohamed">
        <div className="portrait-media gaming-media"><img src="/irphan-gaming-character.webp" alt="Personnage gaming d’Irphan Mohamed avec un ordinateur" width="900" height="1350" decoding="async" fetchPriority="high" /></div>
        <div className="portrait-caption"><span>Basé en Île-de-France</span><span>Support · Systèmes · Sécurité</span></div>
      </div>
    </section>

    <section className="education" id="formation">
      <div className="section-heading reveal"><p className="section-index">02 — Formation</p><h2>Comprendre.<br />Résoudre. Sécuriser.</h2></div>
      <div className="education-grid">
        <article className="education-card reveal"><p>2026</p><h3>Administrateur d’infrastructures sécurisées</h3><span>Titre professionnel RNCP niveau 6 · en cours de validation</span></article>
        <article className="education-card reveal"><p>2024 — 2025</p><h3>Cybersécurité FullStack</h3><span>Jedha Bootcamp · Blue Team, Red Team, GRC, réseaux et systèmes</span></article>
        <article className="education-card reveal"><p>2025 — 2026</p><h3>Certifications & fondamentaux</h3><span>INFOSEC Cybersecurity Foundations · préparation CompTIA Security+</span></article>
        <article className="education-card reveal"><p>2026</p><h3>Cisco Networking Basics</h3><span>Certification Cisco Networking Academy · fondamentaux des réseaux et de la connectivité</span></article>
      </div>
    </section>

    <section className="statement reveal" aria-label="Présentation">
      <p className="section-index">01 — Profil</p>
      <div><p className="big-statement">Un profil IT à la croisée du <strong>service</strong>, de la <strong>technique</strong> et de la <strong>sécurité</strong>.</p><p className="body-copy">Pendant huit ans chez Apple, j’ai appris à écouter un besoin, diagnostiquer un incident et rendre la technologie compréhensible dans un environnement exigeant. Ma formation en systèmes, réseaux et cybersécurité prolonge aujourd’hui cette expérience : je veux contribuer à un support IT fiable, résoudre concrètement les problèmes et renforcer progressivement la sécurité des environnements.</p></div>
    </section>

    <section className="work-section" id="projets">
      <div className="section-heading reveal"><p className="section-index">03 — Projets</p><h2>Du terrain.<br />Des preuves.</h2></div>
      <div className="project-grid">{projects.map((project) => <article className="project-card reveal" key={project.number}><div className="card-top"><span>{project.number}</span><span>{project.eyebrow}</span></div><h3>{project.title}</h3><p>{project.text}</p><div className="project-bottom">{project.url && <a className="project-link" href={project.url} target="_blank" rel="noreferrer">Voir le projet sur GitHub <Arrow /></a>}<div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
      <p className="confidential-note reveal">Mission réalisée dans le respect de la confidentialité client. Les méthodes et livrables sont présentés sans données sensibles.</p>
    </section>

    <section className="lab-profiles" id="plateformes">
      <div className="section-heading reveal"><p className="section-index">04 — Laboratoires cybersécurité</p><h2>Approfondir.<br />Le prouver.</h2></div>
      <div className="lab-profile-grid">
        {labProfiles.map((profile) => <a className="lab-profile-card reveal" href={profile.url} target="_blank" rel="noreferrer" key={profile.platform} aria-label={`Consulter mon profil ${profile.platform}`}>
          <div className="lab-profile-top"><span className="lab-monogram" aria-hidden="true">{profile.initials}</span><span>{profile.platform}</span><Arrow /></div>
          <div className="lab-profile-copy"><h3>{profile.title}</h3><p>{profile.text}</p></div>
          <div className="lab-profile-stats">{profile.stats.map((stat) => <span key={stat}>{stat}</span>)}</div>
        </a>)}
      </div>
      <p className="lab-note reveal">Des profils publics, consultables sans identifiant. Ils documentent une progression continue — les projets présentés plus haut montrent comment ces acquis sont appliqués.</p>
    </section>

    <section className="journey" id="experience" aria-label="Parcours professionnel">
      <div className="section-heading reveal"><p className="section-index">05 — Expérience</p><h2>Parcours<br />professionnel</h2></div>
      <div className="timeline">
        <article className="timeline-item reveal"><p>2017 — 2026</p><div><h3>Solutions Consultant · Support technique</h3><span>Apple</span><p>Analyse des besoins, diagnostic et résolution d’incidents, accompagnement des utilisateurs, sensibilisation à la confidentialité, mentorat et suivi qualité dans un environnement à forte exigence.</p></div></article>
        <article className="timeline-item reveal"><p>2025 — 2026</p><div><h3>Consultant cybersécurité · Mission d’audit</h3><span>CyberLion — CECCA</span><p>Audit de maturité, OSINT, cartographie réseau et applicative, analyse de vulnérabilités, priorisation des risques et rédaction de livrables décisionnels.</p></div></article>
        <article className="timeline-item reveal"><p>2024 — 2026</p><div><h3>Cybersécurité FullStack & infrastructures sécurisées</h3><span>Jedha Bootcamp · Parcours RNCP</span><p>Blue Team, Red Team, GRC, réseaux, systèmes et projets appliqués. Préparation CompTIA Security+.</p></div></article>
      </div>
    </section>

    <section className="expertise" id="expertise">
      <div className="section-heading reveal"><p className="section-index">06 — Boîte à outils</p><h2>Compétences<br />en mouvement</h2></div>
      <div className="skill-cloud reveal">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
      <p className="learning-note reveal">Je développe ces compétences par des laboratoires documentés, des cas pratiques et une méthode constante : comprendre le besoin, diagnostiquer, agir, vérifier puis transmettre.</p>
    </section>

    <section className="contact" id="contact">
      <p className="kicker reveal"><span className="status-dot" /> Ouvert aux opportunités en support IT, systèmes, réseau et cybersécurité junior</p>
      <h2 className="reveal">Parlons de ce que je peux<br /><em>apporter à votre équipe.</em></h2>
      <div className="contact-actions reveal"><a className="button light" href="mailto:info@irphan.eu">Écrire un e-mail <Arrow /></a><a className="text-link light-link" href="https://www.linkedin.com/in/irphan-mohamed-mustapha/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a className="text-link light-link" href="https://github.com/maneekbaasha" target="_blank" rel="noreferrer">GitHub <Arrow /></a></div>
      <footer><span>© 2026 Irphan</span><a href="#accueil">Retour en haut ↑</a></footer>
    </section>
  </main>;
}

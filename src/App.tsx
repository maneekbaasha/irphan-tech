const Arrow = () => <span aria-hidden="true">↗</span>;

const projects = [
  {
    index: "01",
    category: "Blue Team · Projet GitHub",
    title: "Nginx SOC Detection Lab",
    description:
      "Un laboratoire SOC conteneurisé pour observer, détecter et corréler des attaques web : journaux JSON, règles Wazuh, remédiation et tests de non-régression.",
    tags: ["Wazuh", "Nginx", "Docker", "Detection"],
    url: "https://github.com/maneekbaasha/nginx-soc-detection-lab",
  },
  {
    index: "02",
    category: "Support IT · Projet GitHub",
    title: "Modern IT Helpdesk Lab",
    description:
      "Un environnement de support moderne reproduisant le cycle de vie d’un poste : tickets, utilisateurs, Entra ID, Intune, déploiement et incidents Windows.",
    tags: ["Entra ID", "Intune", "Jira", "Microsoft 365"],
    url: "https://github.com/maneekbaasha/modern-it-helpdesk-lab",
  },
  {
    index: "03",
    category: "Conseil · Mission confidentielle",
    title: "Audit de maturité cybersécurité",
    description:
      "Analyse de l’exposition d’une PME, cartographie, identification des risques et recommandations priorisées, avec une restitution pensée pour aider à décider.",
    tags: ["OSINT", "Audit", "Risques", "Remediation"],
  },
  {
    index: "04",
    category: "Identité numérique · Projet GitHub",
    title: "irphan.eu",
    description:
      "Ce portfolio est aussi un projet : raconter un parcours au-delà du CV, documenter des réalisations et réduire la distance entre candidat et recruteur.",
    tags: ["React", "TypeScript", "GitHub", "Cloudflare"],
    url: "https://github.com/maneekbaasha/irphan-tech",
  },
];

const experience = [
  {
    date: "2017 — 2026",
    role: "Solutions Specialist",
    organisation: "Apple",
    copy: "Près de huit ans à écouter, diagnostiquer et rendre la technologie accessible. Une expérience exigeante du service, de la pédagogie, de la confidentialité et de la qualité.",
  },
  {
    date: "2025 — 2026",
    role: "Consultant cybersécurité",
    organisation: "CyberLion — CECCA",
    copy: "Une mission d’audit menée de l’exposition publique jusqu’au plan de remédiation : OSINT, cartographie, vulnérabilités, risques et livrables décisionnels.",
  },
  {
    date: "2024 — aujourd’hui",
    role: "Formation & laboratoires",
    organisation: "Infrastructures · Réseaux · Cybersécurité",
    copy: "Une pratique continue pour consolider les fondamentaux, construire des environnements réalistes et transformer les apprentissages en preuves visibles.",
  },
];

const capabilities = [
  {
    number: "01",
    title: "Support & expérience utilisateur",
    copy: "Écouter, reformuler, diagnostiquer et accompagner sans perdre de vue la personne derrière le problème.",
    skills: ["Support utilisateurs", "Incidents", "Jira", "Documentation", "Pédagogie"],
  },
  {
    number: "02",
    title: "Systèmes, identités & réseau",
    copy: "Comprendre l’environnement de travail dans son ensemble pour intervenir avec méthode et fiabilité.",
    skills: ["Windows", "macOS", "Linux", "Entra ID", "Intune", "TCP/IP"],
  },
  {
    number: "03",
    title: "Cybersécurité & audit",
    copy: "Observer l’exposition, qualifier le risque et proposer des actions compréhensibles, réalistes et vérifiables.",
    skills: ["OSINT", "Nmap", "Wireshark", "Wazuh", "ISO 27001", "OWASP"],
  },
];

const learning = [
  ["2026", "Administrateur d’infrastructures sécurisées", "Titre professionnel RNCP niveau 6 · validation en cours"],
  ["2026", "Cisco Networking Basics", "Réseaux et connectivité · Cisco Networking Academy"],
  ["2025", "Cybersecurity Foundations", "INFOSEC · fondamentaux de la cybersécurité"],
  ["2024 — 2025", "Cybersécurité FullStack", "Jedha Bootcamp · Blue Team, Red Team et GRC"],
];

const platforms = [
  ["THM", "TryHackMe", "53 rooms · 9 badges · Top 9 %", "https://tryhackme.com/p/maneekbaasha"],
  ["RM", "Root-Me", "36 challenges · 2 compromissions", "https://www.root-me.org/maneekbaasha?lang=fr"],
  ["HTB", "Hack The Box", "Academy · badges publics", "https://profile.hackthebox.com/profile/019fa470-4b52-70d3-ad9d-ca778a6b0d6a"],
];

export default function App() {
  return (
    <main>
      <a className="skip-link" href="#profil">Aller au contenu</a>

      <header className="topbar">
        <span>Évry · France</span>
        <a href="#accueil">Irphanoullah Mohamed Mustapha</a>
        <span><i />Disponible pour de nouvelles opportunités</span>
      </header>

      <section className="hero" id="accueil">
        <div className="hero-visual" aria-hidden="true">
          <img src="/irphan-hero.png" alt="" width="1672" height="941" fetchPriority="high" />
          <div className="digital-veil" />
        </div>
        <div className="hero-content">
          <p className="eyebrow enter">Support IT · Systèmes · Cybersécurité · IA</p>
          <h1 className="enter delay-1">Irphanoullah<br /><span>Mohamed Mustapha</span></h1>
          <div className="hero-bottom enter delay-2">
            <p>Comprendre les personnes.<br />Maîtriser les outils.<br />Sécuriser les usages.</p>
            <a className="pill-button" href="/CV-Irphanoullah-Mohamed-Mustapha.pdf" download>
              Télécharger mon CV <span>↓</span>
            </a>
          </div>
        </div>
        <a className="scroll-cue" href="#profil" aria-label="Découvrir mon profil">Défiler <span>↓</span></a>
      </section>

      <nav className="dock" aria-label="Navigation principale">
        <a href="#accueil" aria-label="Accueil" className="dock-mark">IM</a>
        <a href="#profil">Profil</a>
        <a href="#parcours">Parcours</a>
        <a href="#projets">Projets</a>
        <a href="#competences">Compétences</a>
        <a href="#contact">Contact</a>
      </nav>

      <section className="profile section" id="profil">
        <div className="section-label reveal"><span>01</span> Qui je suis</div>
        <div className="profile-grid">
          <h2 className="display-title reveal">Au-delà<br />du <em>CV.</em></h2>
          <div className="story reveal">
            <p className="story-lead">Je m’appelle Irphanoullah Mohamed Mustapha. Pendant près de huit ans chez Apple, j’ai appris que la technologie ne se résume jamais aux machines : elle commence par l’écoute.</p>
            <p>Un incident, une inquiétude ou un besoin cache toujours une personne qui cherche à avancer. Mon rôle a longtemps été de comprendre, d’expliquer et de résoudre. Puis j’ai voulu aller plus loin : comprendre ce qui relie les systèmes, les réseaux et la sécurité.</p>
            <p>J’ai créé ce site parce qu’un CV dit où l’on est passé, mais rarement comment on réfléchit. Les employeurs disposent de peu de temps pour découvrir leurs candidats ; les candidats, eux, manquent souvent d’espace pour montrer ce qu’ils savent réellement faire.</p>
            <p className="accent-copy">Ce portfolio est ce point de rencontre : une manière plus humaine de me connaître, des réalisations vérifiables et le début d’une conversation.</p>
          </div>
        </div>
        <div className="profile-metrics reveal">
          <div><strong>8</strong><span>années chez Apple</span></div>
          <div><strong>350 h</strong><span>de mission d’audit</span></div>
          <div><strong>3</strong><span>axes : service, systèmes, sécurité</span></div>
        </div>
      </section>

      <section className="journey section" id="parcours">
        <div className="section-label reveal"><span>02</span> Mon parcours</div>
        <div className="section-intro reveal">
          <h2>Une trajectoire construite<br /><em>par la curiosité.</em></h2>
          <p>Chaque étape complète la précédente : l’expérience humaine du terrain, la rigueur technique et une attention croissante portée à la sécurité.</p>
        </div>
        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline-row reveal" key={item.date}>
              <time>{item.date}</time>
              <div><h3>{item.role}</h3><p className="organisation">{item.organisation}</p></div>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="projects section" id="projets">
        <div className="section-label reveal"><span>03</span> Réalisations</div>
        <div className="section-intro reveal">
          <h2>Des projets qui montrent<br /><em>comment je travaille.</em></h2>
          <p>Des laboratoires documentés, du code accessible et une mission menée dans le respect de la confidentialité.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-row reveal" key={project.index}>
              <div className="project-index">{project.index}</div>
              <div className="project-copy"><p>{project.category}</p><h3>{project.title}</h3><span>{project.description}</span></div>
              <div className="project-meta">
                <div>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                {project.url ? <a href={project.url} target="_blank" rel="noreferrer" aria-label={`Voir ${project.title}`}>Voir le projet <Arrow /></a> : <span className="private-label">Données confidentielles</span>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ai-section section" id="ia">
        <div className="ai-orbit" aria-hidden="true"><span>IA</span></div>
        <div className="section-label reveal"><span>04</span> Intelligence artificielle</div>
        <div className="ai-grid">
          <h2 className="reveal">Explorer l’IA.<br /><em>Garder l’humain.</em></h2>
          <div className="ai-copy reveal">
            <p>Je m’intéresse particulièrement aux outils d’IA générative, aux agents et à l’automatisation appliqués au support IT et à la cybersécurité.</p>
            <p>Mon approche reste pragmatique : utiliser l’IA pour mieux rechercher, documenter et accélérer — avec validation humaine, protection des données et esprit critique.</p>
            <div className="next-project"><span>Prochaine réalisation</span><strong>Assistant IA pour le support IT</strong><p>Qualifier une demande, suggérer une procédure et préparer une réponse, sans retirer la décision au technicien.</p></div>
          </div>
        </div>
      </section>

      <section className="capabilities section" id="competences">
        <div className="section-label reveal"><span>05</span> Ce que j’apporte</div>
        <div className="capability-list">
          {capabilities.map((capability) => (
            <article className="capability reveal" key={capability.number}>
              <span>{capability.number}</span>
              <div><h3>{capability.title}</h3><p>{capability.copy}</p><div className="chips">{capability.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="learning section" id="formation">
        <div className="section-label reveal"><span>06</span> Apprentissage continu</div>
        <div className="learning-grid">
          <div>
            <h2 className="reveal">Apprendre.<br />Pratiquer.<br /><em>Partager.</em></h2>
            <p className="learning-note reveal">La progression ne se revendique pas : elle se documente.</p>
          </div>
          <div className="education-list">
            {learning.map(([year, title, copy]) => <article className="education-row reveal" key={title}><time>{year}</time><div><h3>{title}</h3><p>{copy}</p></div></article>)}
          </div>
        </div>
        <div className="platforms reveal">
          {platforms.map(([initials, name, stats, url]) => <a href={url} target="_blank" rel="noreferrer" key={name}><span>{initials}</span><div><strong>{name}</strong><small>{stats}</small></div><Arrow /></a>)}
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-glow" aria-hidden="true" />
        <p className="availability reveal"><i /> Disponible pour une nouvelle opportunité</p>
        <h2 className="reveal">Et si nous faisions<br />connaissance <em>autrement&nbsp;?</em></h2>
        <p className="contact-copy reveal">Support IT, systèmes, réseau ou cybersécurité junior : parlons de vos besoins et de ce que je peux apporter à votre équipe.</p>
        <div className="contact-links reveal">
          <a className="pill-button light" href="mailto:info@irphan.eu">Écrivez-moi <Arrow /></a>
          <a href="https://www.linkedin.com/in/irphan-mohamed-mustapha/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
          <a href="https://github.com/maneekbaasha" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
        </div>
        <footer><span>© 2026 Irphanoullah Mohamed Mustapha</span><span>Conçu avec curiosité · Évry, France</span><a href="#accueil">Retour en haut ↑</a></footer>
      </section>
    </main>
  );
}

import { useEffect, useMemo, useState } from "react";
import ThemeToggle from "./ThemeToggle";

type View = "home" | "about" | "experience" | "projects" | "skills" | "contact";
type Lang = "fr" | "en";

const views: View[] = ["home", "about", "experience", "projects", "skills", "contact"];

const copy = {
  fr: {
    nav: { home: "Accueil", about: "À propos", experience: "Expérience", projects: "Projets", skills: "Compétences", contact: "Contact" },
    availability: "Ouvert aux opportunités",
    home: {
      kicker: "TECHNOLOGIE · SUPPORT · SÉCURITÉ · IA",
      titleA: "La technologie",
      titleB: "devrait sembler simple.",
      intro: "Je travaille à l’endroit où les personnes, les systèmes, la sécurité et l’IA se rencontrent.",
      projects: "Voir mes projets",
      story: "Découvrir mon parcours",
      metrics: [
        ["01", "8 ans", "Expérience Apple"],
        ["02", "350 h", "Audit cybersécurité"],
        ["03", "Concret", "Labs & projets"],
        ["04", "Île-de-France", "Disponible"],
      ],
      visualTop: "HUMAIN",
      visualLeft: "SUPPORT",
      visualRight: "SÉCURITÉ",
      visualBottom: "IA",
      visualCore: "SYSTEMS",
    },
    about: {
      tag: "01 / À PROPOS",
      titleA: "Au-delà",
      titleB: "du CV.",
      lead: "Pendant près de huit ans chez Apple, j’ai appris que la technologie commence rarement par une machine. Elle commence par une personne qui essaie d’avancer.",
      p1: "Écouter, reformuler, diagnostiquer, expliquer. Ce socle m’a naturellement conduit vers le support IT, puis vers les systèmes, les réseaux et la cybersécurité.",
      p2: "Je construis aujourd’hui un profil volontairement transversal. Pas pour collectionner les buzzwords, mais parce que dans la vraie vie, un incident utilisateur peut être un problème de poste, d’identité, de réseau, de sécurité… parfois les quatre.",
      quote: "Ce site existe pour montrer ma façon de réfléchir, mes réalisations et la progression derrière les intitulés.",
      now: "EN CE MOMENT",
      nowStrong: "Support IT · Cybersécurité · IA",
      nowSmall: "Construire des choses utiles, apprendre en public.",
      location: "LOCALISATION",
      locationStrong: "Île-de-France",
      locationSmall: "Paris · 91 · 92 · 77",
    },
    experience: {
      tag: "02 / EXPÉRIENCE",
      titleA: "Humain d’abord.",
      titleB: "Technique ensuite.",
      items: [
        ["2017 — 2026", "Solutions Specialist", "Apple", "Près de huit ans au contact des utilisateurs, à écouter, diagnostiquer, expliquer et résoudre. Une école exigeante du service, du feedback, de la pédagogie et de la qualité d’expérience."],
        ["2025 — 2026", "Consultant cybersécurité", "CyberLion · CECCA", "Audit de maturité et analyse d’exposition : OSINT, cartographie, vulnérabilités, risques, remédiation et restitution exploitable par les décideurs."],
        ["2024 — aujourd’hui", "Labs & apprentissage continu", "IT · Réseau · Cyber · IA", "Je transforme mes apprentissages en environnements testables, documentés et publics. L’objectif : montrer ce que je sais faire au lieu de simplement l’énumérer."],
      ],
    },
    projects: {
      tag: "03 / PROJETS",
      titleA: "Travaux",
      titleB: "sélectionnés.",
      intro: "Des projets conçus comme des preuves : contexte, environnement, décisions, résultat.",
      items: [
        ["Support IT · Microsoft Cloud", "Modern IT Helpdesk Lab", "Un environnement de support moderne qui reproduit le cycle de vie réel d’un poste : onboarding, Entra ID, Intune, conformité, déploiement et incidents Windows."],
        ["Blue Team · Detection Engineering", "Nginx SOC Detection Lab", "Un laboratoire conteneurisé pour observer, détecter et corréler des attaques web, avec journaux, règles Wazuh, remédiation et tests de non-régression."],
        ["IA · Support IT", "AI IT Support Lab", "Un assistant local qui qualifie une demande, s’appuie sur une base documentaire et prépare une réponse sans retirer la décision au technicien."],
        ["Portfolio · Product thinking", "irphan.eu", "Un portfolio pensé comme un produit : raconter un parcours au-delà du CV, rendre les réalisations vérifiables et réduire la distance entre candidat et recruteur."],
      ],
    },
    skills: {
      tag: "04 / COMPÉTENCES",
      titleA: "Utile plutôt que",
      titleB: "décoratif.",
      rows: [
        ["Support & workplace", "Windows · macOS · Microsoft 365 · Jira · Troubleshooting · Documentation"],
        ["Cloud & identité", "Microsoft Entra ID · Intune · IAM · RBAC · Device management"],
        ["Réseau", "TCP/IP · DNS · DHCP · Wireshark · Nmap · Cartographie"],
        ["Cybersécurité", "OSINT · Wazuh · Sigma · OWASP · ISO 27001 · NIST"],
        ["IA & automatisation", "LLM · agents · RAG · Python · workflows · validation humaine"],
      ],
    },
    contact: {
      tag: "05 / CONTACT",
      titleA: "Construisons",
      titleB: "quelque chose d’utile.",
      intro: "Support IT, environnement Microsoft, cybersécurité ou projet mêlant technologie et IA : je suis ouvert aux conversations qui débouchent sur du concret.",
    },
    footer: "Pensé pour être exploré, pas scrollé.",
    prev: "Section précédente",
    next: "Section suivante",
  },
  en: {
    nav: { home: "Home", about: "About", experience: "Experience", projects: "Projects", skills: "Skills", contact: "Contact" },
    availability: "Open to work",
    home: {
      kicker: "TECHNOLOGY · SUPPORT · SECURITY · AI",
      titleA: "Technology",
      titleB: "should feel simple.",
      intro: "I work where people, systems, security and AI meet.",
      projects: "Explore projects",
      story: "Discover my story",
      metrics: [
        ["01", "8 years", "Apple experience"],
        ["02", "350 h", "Cybersecurity audit"],
        ["03", "Hands-on", "Labs & projects"],
        ["04", "Paris area", "Open to opportunities"],
      ],
      visualTop: "PEOPLE",
      visualLeft: "SUPPORT",
      visualRight: "SECURITY",
      visualBottom: "AI",
      visualCore: "SYSTEMS",
    },
    about: {
      tag: "01 / ABOUT",
      titleA: "Beyond",
      titleB: "the CV.",
      lead: "For nearly eight years at Apple, I learned that technology rarely starts with a machine. It starts with a person trying to move forward.",
      p1: "Listening, reframing, diagnosing, explaining. That foundation naturally led me to IT support, then systems, networks and cybersecurity.",
      p2: "I am deliberately building a cross-functional profile. Not to collect buzzwords, but because in real life a user incident can involve a device, identity, network and security issue — sometimes all four.",
      quote: "This website exists to show how I think, what I build and the progress behind the job titles.",
      now: "NOW",
      nowStrong: "IT Support · Cybersecurity · AI",
      nowSmall: "Building useful things, learning in public.",
      location: "LOCATION",
      locationStrong: "Île-de-France",
      locationSmall: "Paris · 91 · 92 · 77",
    },
    experience: {
      tag: "02 / EXPERIENCE",
      titleA: "Human first.",
      titleB: "Technical next.",
      items: [
        ["2017 — 2026", "Solutions Specialist", "Apple", "Nearly eight years working directly with users: listening, diagnosing, explaining and solving. A demanding school of service, feedback, pedagogy and customer experience."],
        ["2025 — 2026", "Cybersecurity Consultant", "CyberLion · CECCA", "Maturity assessment and exposure analysis: OSINT, mapping, vulnerabilities, risks, remediation and reporting designed to be useful to decision-makers."],
        ["2024 — today", "Labs & continuous learning", "IT · Network · Cyber · AI", "I turn learning into testable, documented and public environments. The goal is simple: show what I can do instead of merely listing it."],
      ],
    },
    projects: {
      tag: "03 / PROJECTS",
      titleA: "Selected",
      titleB: "work.",
      intro: "Projects built as evidence: context, environment, decisions and outcomes.",
      items: [
        ["IT Support · Microsoft Cloud", "Modern IT Helpdesk Lab", "A modern support environment reproducing the real lifecycle of a workstation: onboarding, Entra ID, Intune, compliance, deployment and Windows incidents."],
        ["Blue Team · Detection Engineering", "Nginx SOC Detection Lab", "A containerised lab to observe, detect and correlate web attacks using logs, Wazuh rules, remediation and regression testing."],
        ["AI · IT Support", "AI IT Support Lab", "A local assistant that qualifies requests, uses internal documentation and prepares responses while keeping the technician in control."],
        ["Portfolio · Product thinking", "irphan.eu", "A portfolio treated as a product: tell a story beyond the CV, make achievements verifiable and reduce the distance between candidate and recruiter."],
      ],
    },
    skills: {
      tag: "04 / SKILLS",
      titleA: "Useful over",
      titleB: "decorative.",
      rows: [
        ["Support & workplace", "Windows · macOS · Microsoft 365 · Jira · Troubleshooting · Documentation"],
        ["Cloud & identity", "Microsoft Entra ID · Intune · IAM · RBAC · Device management"],
        ["Network", "TCP/IP · DNS · DHCP · Wireshark · Nmap · Mapping"],
        ["Cybersecurity", "OSINT · Wazuh · Sigma · OWASP · ISO 27001 · NIST"],
        ["AI & automation", "LLM · agents · RAG · Python · workflows · human validation"],
      ],
    },
    contact: {
      tag: "05 / CONTACT",
      titleA: "Let’s build",
      titleB: "something useful.",
      intro: "IT support, Microsoft environments, cybersecurity or projects combining technology and AI: I’m open to conversations that lead to something concrete.",
    },
    footer: "Designed to be explored, not scrolled.",
    prev: "Previous section",
    next: "Next section",
  },
} as const;

const projectMeta = [
  { index: "01", stack: ["Entra ID", "Intune", "Microsoft 365", "Jira"], link: "/projets/modern-it-helpdesk-lab/" },
  { index: "02", stack: ["Wazuh", "Nginx", "Docker", "Sigma"], link: "https://github.com/maneekbaasha/nginx-soc-detection-lab" },
  { index: "03", stack: ["Python", "LLM", "RAG", "Tests"], link: "https://github.com/maneekbaasha" },
  { index: "04", stack: ["React", "TypeScript", "Vite", "Cloudflare"], link: "https://github.com/maneekbaasha/irphan-tech" },
];

function getInitialView(): View {
  const hash = window.location.hash.replace("#", "") as View;
  return views.includes(hash) ? hash : "home";
}

function getInitialLang(): Lang {
  const saved = localStorage.getItem("irphan-lang");
  if (saved === "fr" || saved === "en") return saved;
  return navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
}

export default function App() {
  const [view, setView] = useState<View>(getInitialView);
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const t = copy[lang];
  const currentIndex = useMemo(() => views.findIndex((item) => item === view), [view]);

  useEffect(() => {
    const onHashChange = () => setView(getInitialView());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    localStorage.setItem("irphan-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  function go(next: View) {
    if (next === view) return;
    window.location.hash = next;
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function step(direction: 1 | -1) {
    const next = views[(currentIndex + direction + views.length) % views.length];
    go(next);
  }

  return (
    <main className="site-shell">
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <header className="site-header">
        <button className="brand" onClick={() => go("home")} aria-label={lang === "fr" ? "Retour à l'accueil" : "Back home"}>
          <span className="brand-dot" />
          <span>IRPHAN.</span>
        </button>

        <nav className="top-nav" aria-label={lang === "fr" ? "Navigation principale" : "Main navigation"}>
          {views.map((item) => (
            <button key={item} className={view === item ? "active" : ""} onClick={() => go(item)}>
              {t.nav[item]}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <span className="availability"><i /> {t.availability}</span>
          <div className="lang-switch" aria-label="Language selector">
            <button className={lang === "fr" ? "active" : ""} onClick={() => setLang("fr")}>FR</button>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="panel-stage" key={`${view}-${lang}`}>
        {view === "home" && (
          <section className="panel home-panel">
            <div className="home-kicker panel-enter">{t.home.kicker}</div>
            <div className="home-grid home-grid-v2">
              <div className="hero-copy panel-enter delay-1">
                <p className="micro">IRPHANOULLAH MOHAMED MUSTAPHA</p>
                <h1 className="hero-title-v2">
                  {t.home.titleA}<br />
                  <span>{t.home.titleB}</span>
                </h1>
                <p className="hero-intro hero-intro-v2">{t.home.intro}</p>
                <div className="hero-actions">
                  <button className="primary-cta" onClick={() => go("projects")}>{t.home.projects} <span>↗</span></button>
                  <button className="text-cta" onClick={() => go("about")}>{t.home.story} <span>→</span></button>
                </div>
              </div>

              <div className="system-visual panel-enter delay-2" aria-hidden="true">
                <div className="system-glow" />
                <div className="system-gridlines" />
                <div className="system-orbit orbit-outer" />
                <div className="system-orbit orbit-inner" />
                <div className="system-axis axis-a" />
                <div className="system-axis axis-b" />
                <div className="system-core"><span>{t.home.visualCore}</span><small>human × technology</small></div>
                <span className="system-node node-top">{t.home.visualTop}</span>
                <span className="system-node node-left">{t.home.visualLeft}</span>
                <span className="system-node node-right">{t.home.visualRight}</span>
                <span className="system-node node-bottom">{t.home.visualBottom}</span>
                <span className="system-dot dot-a" /><span className="system-dot dot-b" /><span className="system-dot dot-c" />
              </div>
            </div>

            <div className="home-footer home-footer-v2 panel-enter delay-3">
              {t.home.metrics.map(([index, strong, small]) => <div key={index}><span>{index}</span><strong>{strong}</strong><small>{small}</small></div>)}
            </div>
          </section>
        )}

        {view === "about" && (
          <section className="panel content-panel about-panel">
            <div className="section-heading panel-enter"><span>{t.about.tag}</span><h2>{t.about.titleA}<br /><em>{t.about.titleB}</em></h2></div>
            <div className="about-copy panel-enter delay-1">
              <p className="lead">{t.about.lead}</p><p>{t.about.p1}</p><p>{t.about.p2}</p><blockquote>{t.about.quote}</blockquote>
            </div>
            <div className="about-side panel-enter delay-2">
              <div className="signal-card"><span>{t.about.now}</span><strong>{t.about.nowStrong}</strong><small>{t.about.nowSmall}</small></div>
              <div className="signal-card"><span>{t.about.location}</span><strong>{t.about.locationStrong}</strong><small>{t.about.locationSmall}</small></div>
            </div>
          </section>
        )}

        {view === "experience" && (
          <section className="panel content-panel experience-panel">
            <div className="section-heading panel-enter"><span>{t.experience.tag}</span><h2>{t.experience.titleA}<br /><em>{t.experience.titleB}</em></h2></div>
            <div className="experience-list panel-enter delay-1">
              {t.experience.items.map((item, index) => (
                <article className="experience-row" key={item[0]}><span className="row-index">0{index + 1}</span><time>{item[0]}</time><div><h3>{item[1]}</h3><p>{item[2]}</p></div><p className="row-copy">{item[3]}</p></article>
              ))}
            </div>
          </section>
        )}

        {view === "projects" && (
          <section className="panel projects-panel">
            <div className="projects-head panel-enter"><div className="section-heading compact"><span>{t.projects.tag}</span><h2>{t.projects.titleA}<br /><em>{t.projects.titleB}</em></h2></div><p>{t.projects.intro}</p></div>
            <div className="project-grid panel-enter delay-1">
              {projectMeta.map((project, i) => (
                <a className="project-card" key={project.index} href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  <div className="project-top"><span>{project.index}</span><span>↗</span></div>
                  <div><p className="project-eyebrow">{t.projects.items[i][0]}</p><h3>{t.projects.items[i][1]}</h3><p>{t.projects.items[i][2]}</p></div>
                  <div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                </a>
              ))}
            </div>
          </section>
        )}

        {view === "skills" && (
          <section className="panel content-panel skills-panel">
            <div className="section-heading panel-enter"><span>{t.skills.tag}</span><h2>{t.skills.titleA}<br /><em>{t.skills.titleB}</em></h2></div>
            <div className="skill-list panel-enter delay-1">
              {t.skills.rows.map(([title, detail], index) => <article className="skill-row" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{detail}</p></article>)}
            </div>
            <div className="profiles-strip panel-enter delay-2">
              <a href="https://tryhackme.com/p/maneekbaasha" target="_blank" rel="noreferrer">TryHackMe <span>↗</span></a>
              <a href="https://www.root-me.org/maneekbaasha?lang=fr" target="_blank" rel="noreferrer">Root-Me <span>↗</span></a>
              <a href="https://profile.hackthebox.com/profile/019fa470-4b52-70d3-ad9d-ca778a6b0d6a" target="_blank" rel="noreferrer">Hack The Box <span>↗</span></a>
            </div>
          </section>
        )}

        {view === "contact" && (
          <section className="panel contact-panel">
            <div className="contact-copy panel-enter"><span>{t.contact.tag}</span><h2>{t.contact.titleA}<br /><em>{t.contact.titleB}</em></h2><p>{t.contact.intro}</p></div>
            <div className="contact-links panel-enter delay-1">
              <a href="mailto:mohamed.irphan09@gmail.com"><span>Email</span><strong>mohamed.irphan09@gmail.com</strong><b>↗</b></a>
              <a href="https://www.linkedin.com/in/irphan-mohamed-mustapha/" target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>Irphan Mohamed Mustapha</strong><b>↗</b></a>
              <a href="https://github.com/maneekbaasha" target="_blank" rel="noreferrer"><span>GitHub</span><strong>@maneekbaasha</strong><b>↗</b></a>
            </div>
          </section>
        )}
      </div>

      <footer className="site-footer">
        <span>© 2026 Irphanoullah Mohamed Mustapha</span>
        <div className="footer-pager"><button onClick={() => step(-1)} aria-label={t.prev}>←</button><span>{String(currentIndex + 1).padStart(2, "0")} / {String(views.length).padStart(2, "0")}</span><button onClick={() => step(1)} aria-label={t.next}>→</button></div>
        <span>{t.footer}</span>
      </footer>
    </main>
  );
}

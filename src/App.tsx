import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import ThemeToggle from "./ThemeToggle";

type View = "home" | "about" | "experience" | "projects" | "skills" | "contact";
type Lang = "fr" | "en";

const views: View[] = ["home", "projects", "about", "experience", "skills", "contact"];

const copy = {
  fr: {
    nav: { home: "Accueil", about: "À propos", experience: "Expérience", projects: "Projets", skills: "Compétences", contact: "Contact" },
    availability: "Ouvert aux opportunités",
    home: {
      title: "IRPHANOULLAH\nMOHAMED MUSTAPHA",
      line: "Technologie. Support. Sécurité. IA.",
      intro: "Je construis, dépanne et explore des systèmes sur lesquels les gens comptent — du support IT à la cybersécurité et à l’IA.",
      projects: "Voir les projets",
      about: "À propos de moi",
      focus: "EN CE MOMENT",
      focusItems: ["IT SUPPORT", "CLOUD", "CYBERSÉCURITÉ", "IA"],
      portraitTop: "PROFILE / 2026",
      portraitBottom: "TECHNOLOGY × PEOPLE",
    },
    about: {
      title: "Au-delà\ndu CV.",
      lead: "Pendant près de huit ans chez Apple, j’ai appris que la technologie commence rarement par une machine. Elle commence par une personne qui essaie d’avancer.",
      p1: "Écouter, reformuler, diagnostiquer, expliquer : ce socle m’a conduit vers le support IT, puis vers les systèmes, les réseaux et la cybersécurité.",
      p2: "Je construis aujourd’hui un profil transversal parce qu’un incident réel n’entre pas toujours dans une seule case : poste, identité, réseau, sécurité et expérience utilisateur se croisent souvent.",
      statement: "Ce site montre ma façon de réfléchir, mes réalisations et la progression derrière les intitulés.",
      pillars: [["Support", "Comprendre vite, expliquer clairement et remettre l’utilisateur en mouvement."], ["Security", "Observer, réduire l’exposition et transformer le risque en actions compréhensibles."], ["Builder", "Apprendre en construisant des environnements testables, documentés et reproductibles."]],
    },
    experience: {
      title: "L’humain d’abord.\nLa technique ensuite.",
      items: [
        ["2017 — 2026", "Apple", "Solutions Specialist", "Près de huit ans au contact des utilisateurs : écoute, diagnostic, pédagogie, résolution, feedback produit et exigence de qualité d’expérience."],
        ["2025 — 2026", "CECCA", "Mission cybersécurité", "Audit de maturité et d’exposition : OSINT, cartographie, vulnérabilités, risques, remédiation et restitution exploitable par les décideurs."],
        ["2024 — aujourd’hui", "Independent Labs", "IT · Cloud · Cyber · AI", "Je transforme l’apprentissage en preuves : environnements testables, incidents documentés, automatisation et projets publics."],
      ],
    },
    projects: {
      title: "Travaux\nsélectionnés.",
      intro: "Des projets conçus comme des preuves : contexte, environnement, décisions, résultat.",
      open: "Explorer le projet",
      items: [
        ["Modern IT Helpdesk Lab", "Support IT · Microsoft Cloud", "Un environnement de support moderne reproduisant le cycle de vie réel d’un poste : onboarding, Entra ID, Intune, conformité, déploiement et incidents Windows."],
        ["Nginx SOC Detection Lab", "Blue Team · Detection", "Un laboratoire conteneurisé pour observer et détecter des attaques web, avec logs, Wazuh, Sigma, remédiation et tests de non-régression."],
        ["AI IT Support Lab", "IA · Support IT", "Un assistant local qui qualifie une demande, s’appuie sur une base documentaire et prépare une réponse tout en gardant le technicien dans la boucle."],
        ["irphan.eu", "Portfolio · Product thinking", "Un portfolio traité comme un produit : raconter un parcours au-delà du CV, rendre les réalisations vérifiables et réduire la distance entre candidat et recruteur."],
      ],
    },
    skills: {
      title: "Des compétences\nqui servent vraiment.",
      rows: [["Support & workplace", "Windows · macOS · Microsoft 365 · Jira · Troubleshooting · Documentation"], ["Cloud & identité", "Microsoft Entra ID · Intune · IAM · RBAC · Device management"], ["Réseau", "TCP/IP · DNS · DHCP · Wireshark · Nmap · Cartographie"], ["Cybersécurité", "OSINT · Wazuh · Sigma · OWASP · ISO 27001 · NIST"], ["IA & automatisation", "LLM · agents · RAG · Python · workflows · validation humaine"]],
    },
    contact: {
      title: "Construisons\nquelque chose d’utile.",
      intro: "Support IT, environnement Microsoft, cybersécurité ou projet mêlant technologie et IA : je suis ouvert aux conversations qui débouchent sur du concret.",
    },
    prev: "Section précédente", next: "Section suivante",
  },
  en: {
    nav: { home: "Home", about: "About", experience: "Experience", projects: "Projects", skills: "Skills", contact: "Contact" },
    availability: "Open to opportunities",
    home: {
      title: "IRPHANOULLAH\nMOHAMED MUSTAPHA",
      line: "Technology. Support. Security. AI.",
      intro: "I build, troubleshoot and explore systems people rely on — from IT support to cybersecurity and AI.",
      projects: "View projects",
      about: "About me",
      focus: "CURRENT FOCUS",
      focusItems: ["IT SUPPORT", "CLOUD", "CYBERSECURITY", "AI"],
      portraitTop: "PROFILE / 2026",
      portraitBottom: "TECHNOLOGY × PEOPLE",
    },
    about: {
      title: "Beyond\nthe CV.",
      lead: "For nearly eight years at Apple, I learned that technology rarely starts with a machine. It starts with a person trying to move forward.",
      p1: "Listening, reframing, diagnosing and explaining became the foundation that led me into IT support, systems, networks and cybersecurity.",
      p2: "I deliberately build across disciplines because real incidents rarely fit one box: device, identity, network, security and user experience often overlap.",
      statement: "This website shows how I think, what I build and the progression behind the job titles.",
      pillars: [["Support", "Understand quickly, explain clearly and get people moving again."], ["Security", "Observe exposure, reduce risk and turn findings into understandable action."], ["Builder", "Learn by creating testable, documented and reproducible environments."]],
    },
    experience: {
      title: "Human first.\nTechnical next.",
      items: [["2017 — 2026", "Apple", "Solutions Specialist", "Nearly eight years working directly with users: listening, diagnosis, education, resolution, product feedback and a high bar for customer experience."], ["2025 — 2026", "CECCA", "Cybersecurity mission", "Maturity and exposure assessment: OSINT, mapping, vulnerabilities, risk, remediation and decision-ready reporting."], ["2024 — today", "Independent Labs", "IT · Cloud · Cyber · AI", "I turn learning into evidence: testable environments, documented incidents, automation and public projects."]],
    },
    projects: {
      title: "Selected\nwork.",
      intro: "Projects built as evidence: context, environment, decisions and outcomes.",
      open: "View case study",
      items: [["Modern IT Helpdesk Lab", "IT Support · Microsoft Cloud", "A modern support environment reproducing the real workstation lifecycle: onboarding, Entra ID, Intune, compliance, deployment and Windows incidents."], ["Nginx SOC Detection Lab", "Blue Team · Detection", "A containerised lab for observing and detecting web attacks using logs, Wazuh, Sigma, remediation and regression testing."], ["AI IT Support Lab", "AI · IT Support", "A local assistant that qualifies requests, uses internal documentation and prepares responses while keeping the technician in control."], ["irphan.eu", "Portfolio · Product thinking", "A portfolio treated as a product: tell a story beyond the CV, make achievements verifiable and reduce the distance between candidate and recruiter."]],
    },
    skills: {
      title: "Skills that\nearn their place.",
      rows: [["Support & workplace", "Windows · macOS · Microsoft 365 · Jira · Troubleshooting · Documentation"], ["Cloud & identity", "Microsoft Entra ID · Intune · IAM · RBAC · Device management"], ["Network", "TCP/IP · DNS · DHCP · Wireshark · Nmap · Mapping"], ["Cybersecurity", "OSINT · Wazuh · Sigma · OWASP · ISO 27001 · NIST"], ["AI & automation", "LLM · agents · RAG · Python · workflows · human validation"]],
    },
    contact: {
      title: "Let’s build\nsomething useful.",
      intro: "IT support, Microsoft environments, cybersecurity or projects combining technology and AI: I’m open to conversations that lead to something concrete.",
    },
    prev: "Previous section", next: "Next section",
  },
} as const;

const projectMeta = [
  { stack: ["Entra ID", "Intune", "Microsoft 365", "Jira"], link: "/projets/modern-it-helpdesk-lab/" },
  { stack: ["Wazuh", "Nginx", "Docker", "Sigma"], link: "/projets/nginx-soc-detection-lab/" },
  { stack: ["Python", "LLM", "RAG", "Tests"], link: "/projets/ai-it-support-lab/" },
  { stack: ["React", "TypeScript", "Vite", "Cloudflare"], link: "https://github.com/maneekbaasha/irphan-tech" },
];

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "fr";
  try {
    const saved = localStorage.getItem("irphan-lang");
    if (saved === "fr" || saved === "en") return saved;
  } catch { /* Storage can be unavailable in private browsing. */ }
  return navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
}

function Arrow({ external = false }: { external?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={external ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"} /></svg>;
}

const lines = (value: string) => value.split("\n").map((line, index) => <span key={`${line}-${index}`}>{line}{index === 0 && <br />}</span>);

export default function App() {
  const [view, setView] = useState<View>("home");
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const [menuOpen, setMenuOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const t = copy[lang];

  useEffect(() => {
    try { localStorage.setItem("irphan-lang", lang); } catch { /* Optional preference. */ }
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const sections = Array.from(stageRef.current?.querySelectorAll<HTMLElement>("section[id]") ?? []);
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setView(entry.target.id as View);
    }, { rootMargin: "-18% 0px -65% 0px" });
    sections.forEach(section => observer.observe(section));
    const hash = window.location.hash.slice(1);
    if (views.includes(hash as View)) document.getElementById(hash)?.scrollIntoView({ behavior: "instant" });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButtonRef.current?.focus(); }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [menuOpen]);

  useEffect(() => {
    if (window.location.hash && window.location.hash !== "#home") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !stageRef.current) return;
    const animations = [
      animate(stageRef.current.querySelectorAll(".studio-home-copy > *"), {
        opacity: { from: 0 }, y: { from: 16 }, duration: 700,
        delay: stagger(65), ease: "outExpo",
      }),
      animate(stageRef.current.querySelectorAll(".studio-portrait-wrap"), {
        clipPath: { from: "inset(5% 5% 5% 5%)", to: "inset(0% 0% 0% 0%)" },
        duration: 950, ease: "outExpo",
      }),
    ];
    const finish = () => { if (media.matches) animations.forEach(animation => animation.revert()); };
    media.addEventListener("change", finish);
    return () => { animations.forEach(animation => animation.revert()); media.removeEventListener("change", finish); };
  }, []);

  function navigate() { setMenuOpen(false); }

  return (
    <div className="studio-site">
      <a className="skip-link" href="#home">{lang === "fr" ? "Aller au contenu" : "Skip to content"}</a>
      <header className="studio-header">
        <a className="studio-brand" href="#home" onClick={navigate} aria-label={lang === "fr" ? "Irphan — accueil" : "Irphan — home"}>irphan<span>.</span></a>
        <nav id="main-navigation" className={`studio-nav${menuOpen ? " is-open" : ""}`} aria-label={lang === "fr" ? "Navigation principale" : "Main navigation"}>
          {views.slice(1).map(item => <a key={item} href={`#${item}`} aria-current={view === item ? "location" : undefined} onClick={navigate}>{t.nav[item]}</a>)}
        </nav>
        <div className="studio-tools">
          <div className="studio-lang" role="group" aria-label={lang === "fr" ? "Langue" : "Language"}>
            <button aria-label="Français" aria-pressed={lang === "fr"} onClick={() => setLang("fr")}>FR</button>
            <button aria-label="English" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
          </div>
          <ThemeToggle />
          <button className="studio-menu" ref={menuButtonRef} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? (lang === "fr" ? "Fermer" : "Close") : "Menu"}<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={menuOpen ? "m6 6 12 12M6 18 18 6" : "M4 8h16M4 16h16"} /></svg></button>
        </div>
      </header>

      <main className="studio-stage" ref={stageRef}>

          <section className="studio-home" id="home" tabIndex={-1}>
            <div className="studio-home-copy">
              <h1><span>IRPHANOULLAH</span><span>MOHAMED MUSTAPHA</span></h1>
              <p className="studio-positioning">{t.home.line}</p>
              <p className="studio-intro">{t.home.intro}</p>
              <div className="studio-actions">
                <a className="studio-primary" href="#projects">{t.home.projects}<Arrow /></a>
                <a className="studio-secondary" href="mailto:mohamed.irphan09@gmail.com">{lang === "fr" ? "Échangeons" : "Let’s talk"}<Arrow external /></a>
              </div>
              <p className="studio-availability"><i aria-hidden="true" />{t.availability}<span> · Île-de-France</span></p>

            </div>
            <figure className="studio-portrait-card">

              <div className="studio-portrait-wrap">
                <img
                  src="/irphan-hero-cool.webp"
                  alt="Irphanoullah Mohamed Mustapha"
                  width="1672"
                  height="941"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <figcaption><span>{t.home.portraitBottom}</span><a href="#about">{t.home.about}<Arrow /></a></figcaption>
            </figure>
          </section>

          <section className="studio-page studio-projects" id="projects" aria-labelledby="projects-title">
            <div className="studio-page-title studio-project-title"><h2 id="projects-title">{lines(t.projects.title)}</h2><p>{t.projects.intro}</p></div>
            <div className="studio-project-list">{projectMeta.map((meta, index) => {
              const [title, category, description] = t.projects.items[index];
              return <a className="studio-project" href={meta.link} key={title} target={meta.link.startsWith("http") ? "_blank" : undefined} rel={meta.link.startsWith("http") ? "noreferrer" : undefined}><div className="studio-project-main"><span>{category}</span><h3>{title}</h3><p>{description}</p><div>{meta.stack.map((item) => <small key={item}>{item}</small>)}</div></div>{index === 0 && <div className="project-evidence">{(lang === "fr" ? [["IT-1", "Authentification Outlook"], ["IT-2", "Onboarding Entra ID & Intune"], ["IT-3", "Conformité du pare-feu"], ["IT-6", "Terminal professionnel perdu"]] : [["IT-1", "Outlook authentication"], ["IT-2", "Entra ID & Intune onboarding"], ["IT-3", "Firewall compliance"], ["IT-6", "Lost corporate device"]]).map(([id, label]) => <div key={id}><span>{id}</span><strong>{label}</strong></div>)}</div>}<div className="studio-project-arrow"><span>{index === 3 ? (lang === "fr" ? "Voir le code source" : "View source code") : t.projects.open}</span><Arrow external={index === 3} /></div></a>;
            })}</div>
          </section>

          <section className="studio-page studio-about" id="about" aria-labelledby="about-title">
            <div className="studio-page-title"><h2 id="about-title">{lines(t.about.title)}</h2></div>
            <div className="studio-about-story"><p className="studio-lead">{t.about.lead}</p><p>{t.about.p1}</p><p>{t.about.p2}</p><blockquote>{t.about.statement}</blockquote></div>
            <div className="studio-pillars">{t.about.pillars.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
          </section>

          <section className="studio-page studio-experience" id="experience" aria-labelledby="experience-title">
            <div className="studio-page-title"><h2 id="experience-title">{lines(t.experience.title)}</h2></div>
            <div className="studio-timeline">{t.experience.items.map(([date, company, role, text]) => <article key={`${date}-${company}`}><time>{date}</time><div className="studio-role"><h3>{company}</h3><span>{role}</span></div><p>{text}</p></article>)}</div>
          </section>


          <section className="studio-page studio-skills" id="skills" aria-labelledby="skills-title">
            <div className="studio-page-title"><h2 id="skills-title">{lines(t.skills.title)}</h2></div>
            <div className="studio-skill-list">{t.skills.rows.map(([title, detail]) => <article key={title}><h3>{title}</h3><p>{detail}</p></article>)}</div>
            <div className="studio-profiles"><a href="https://tryhackme.com/p/maneekbaasha" target="_blank" rel="noreferrer">TryHackMe <Arrow external /></a><a href="https://www.root-me.org/maneekbaasha?lang=fr" target="_blank" rel="noreferrer">Root-Me <Arrow external /></a><a href="https://profile.hackthebox.com/profile/019fa470-4b52-70d3-ad9d-ca778a6b0d6a" target="_blank" rel="noreferrer">Hack The Box <Arrow external /></a></div>
          </section>

          <section className="studio-page studio-contact" id="contact" aria-labelledby="contact-title">
            <div className="studio-page-title"><h2 id="contact-title">{lines(t.contact.title)}</h2><p>{t.contact.intro}</p></div>
            <div className="studio-contact-links"><a href="mailto:mohamed.irphan09@gmail.com"><span>Email</span><strong>mohamed.irphan09@gmail.com</strong><Arrow external /></a><a href="https://www.linkedin.com/in/irphan-mohamed-mustapha/" target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>Irphan Mohamed Mustapha</strong><Arrow external /></a><a href="https://github.com/maneekbaasha" target="_blank" rel="noreferrer"><span>GitHub</span><strong>@maneekbaasha</strong><Arrow external /></a></div>
          </section>

      </main>
      <footer className="studio-footer"><span>© {new Date().getFullYear()} Irphanoullah Mohamed Mustapha</span><a href="#home">{lang === "fr" ? "Retour en haut" : "Back to top"}<Arrow /></a></footer>
    </div>
  );
}

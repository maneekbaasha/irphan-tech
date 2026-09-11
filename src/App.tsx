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
      title: "IRPHANOULLAH\nMOHAMED MUSTAPHA",
      line: "Technology. Support. Security. AI.",
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
      open: "Voir le case study",
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

function getInitialView(): View {
  const hash = window.location.hash.replace("#", "") as View;
  return views.includes(hash) ? hash : "home";
}

function getInitialLang(): Lang {
  const saved = localStorage.getItem("irphan-lang");
  if (saved === "fr" || saved === "en") return saved;
  return navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
}

const lines = (value: string) => value.split("\n").map((line, index) => <span key={`${line}-${index}`}>{line}{index === 0 && <br />}</span>);

export default function App() {
  const [view, setView] = useState<View>(getInitialView);
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const t = copy[lang];
  const currentIndex = useMemo(() => views.indexOf(view), [view]);

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
    go(views[(currentIndex + direction + views.length) % views.length]);
  }

  return (
    <main className="studio-site">
      <header className="studio-header">
        <button className="studio-brand" onClick={() => go("home")}>IRPHAN.</button>
        <nav className="studio-nav" aria-label={lang === "fr" ? "Navigation principale" : "Main navigation"}>
          {views.slice(1).map((item) => <button key={item} className={view === item ? "active" : ""} onClick={() => go(item)}>{t.nav[item]}</button>)}
        </nav>
        <div className="studio-tools">
          <span className="studio-availability"><i />{t.availability}</span>
          <div className="studio-lang"><button className={lang === "fr" ? "active" : ""} onClick={() => setLang("fr")}>FR</button><button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button></div>
          <ThemeToggle />
        </div>
      </header>

      <div className="studio-stage" key={`${view}-${lang}`}>
        {view === "home" && (
          <section className="studio-home studio-enter">
            <div className="studio-home-copy">
              <h1>{lines(t.home.title)}</h1>
              <p className="studio-positioning">{t.home.line}</p>
              <p className="studio-intro">{t.home.intro}</p>
              <div className="studio-actions">
                <button className="studio-primary" onClick={() => go("projects")}>{t.home.projects}</button>
                <button className="studio-secondary" onClick={() => go("about")}>{t.home.about} <span>↗</span></button>
              </div>
              <div className="studio-focus">
                <span>{t.home.focus}</span>
                <p>{t.home.focusItems.map((item, i) => <span key={item}>{item}{i < t.home.focusItems.length - 1 && <b>·</b>}</span>)}</p>
              </div>
            </div>
            <figure className="studio-portrait-card">
              <div className="studio-portrait-meta"><span>{t.home.portraitTop}</span><span>IRPHAN / EU</span></div>
              <div className="studio-portrait-wrap"><img src="/irphan-hero.webp" alt="Irphanoullah Mohamed Mustapha" /></div>
              <figcaption><span>{t.home.portraitBottom}</span><small>Support · Systems · Security · AI</small></figcaption>
            </figure>
          </section>
        )}

        {view === "about" && (
          <section className="studio-page studio-about studio-enter">
            <div className="studio-page-title"><span>ABOUT</span><h2>{lines(t.about.title)}</h2></div>
            <div className="studio-about-story"><p className="studio-lead">{t.about.lead}</p><p>{t.about.p1}</p><p>{t.about.p2}</p><blockquote>{t.about.statement}</blockquote></div>
            <div className="studio-pillars">{t.about.pillars.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
          </section>
        )}

        {view === "experience" && (
          <section className="studio-page studio-experience studio-enter">
            <div className="studio-page-title"><span>EXPERIENCE</span><h2>{lines(t.experience.title)}</h2></div>
            <div className="studio-timeline">{t.experience.items.map(([date, company, role, text]) => <article key={`${date}-${company}`}><time>{date}</time><div className="studio-role"><h3>{company}</h3><span>{role}</span></div><p>{text}</p></article>)}</div>
          </section>
        )}

        {view === "projects" && (
          <section className="studio-page studio-projects studio-enter">
            <div className="studio-page-title studio-project-title"><span>PROJECTS</span><h2>{lines(t.projects.title)}</h2><p>{t.projects.intro}</p></div>
            <div className="studio-project-list">{projectMeta.map((meta, index) => {
              const [title, category, description] = t.projects.items[index];
              return <a className="studio-project" href={meta.link} key={title} target={meta.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer"><div className="studio-project-number">{String(index + 1).padStart(2, "0")}</div><div className="studio-project-main"><span>{category}</span><h3>{title}</h3><p>{description}</p><div>{meta.stack.map((item) => <small key={item}>{item}</small>)}</div></div><div className="studio-project-arrow"><span>↗</span><small>{t.projects.open}</small></div></a>;
            })}</div>
          </section>
        )}

        {view === "skills" && (
          <section className="studio-page studio-skills studio-enter">
            <div className="studio-page-title"><span>STACK</span><h2>{lines(t.skills.title)}</h2></div>
            <div className="studio-skill-list">{t.skills.rows.map(([title, detail]) => <article key={title}><h3>{title}</h3><p>{detail}</p></article>)}</div>
            <div className="studio-profiles"><a href="https://tryhackme.com/p/maneekbaasha" target="_blank" rel="noreferrer">TryHackMe ↗</a><a href="https://www.root-me.org/maneekbaasha?lang=fr" target="_blank" rel="noreferrer">Root-Me ↗</a><a href="https://profile.hackthebox.com/profile/019fa470-4b52-70d3-ad9d-ca778a6b0d6a" target="_blank" rel="noreferrer">Hack The Box ↗</a></div>
          </section>
        )}

        {view === "contact" && (
          <section className="studio-page studio-contact studio-enter">
            <div className="studio-page-title"><span>CONTACT</span><h2>{lines(t.contact.title)}</h2><p>{t.contact.intro}</p></div>
            <div className="studio-contact-links"><a href="mailto:mohamed.irphan09@gmail.com"><span>Email</span><strong>mohamed.irphan09@gmail.com</strong><b>↗</b></a><a href="https://www.linkedin.com/in/irphan-mohamed-mustapha/" target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>Irphan Mohamed Mustapha</strong><b>↗</b></a><a href="https://github.com/maneekbaasha" target="_blank" rel="noreferrer"><span>GitHub</span><strong>@maneekbaasha</strong><b>↗</b></a></div>
          </section>
        )}
      </div>

      <footer className="studio-footer"><span>© 2026 IRPHAN.</span><div><button onClick={() => step(-1)} aria-label={t.prev}>←</button><span>{String(currentIndex + 1).padStart(2, "0")} / {String(views.length).padStart(2, "0")}</span><button onClick={() => step(1)} aria-label={t.next}>→</button></div><span>irphan.eu</span></footer>
    </main>
  );
}

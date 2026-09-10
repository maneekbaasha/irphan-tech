import { useEffect, useMemo, useState } from "react";
import ThemeToggle from "./ThemeToggle";

type View = "home" | "about" | "experience" | "projects" | "skills" | "contact";

const navItems: { id: View; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const projects = [
  {
    index: "01",
    eyebrow: "Support IT · Microsoft Cloud",
    title: "Modern IT Helpdesk Lab",
    description: "Un environnement de support moderne qui reproduit le cycle de vie réel d’un poste : onboarding, Entra ID, Intune, conformité, déploiement et incidents Windows.",
    stack: ["Entra ID", "Intune", "Microsoft 365", "Jira"],
    link: "/projets/modern-it-helpdesk-lab/",
  },
  {
    index: "02",
    eyebrow: "Blue Team · Detection Engineering",
    title: "Nginx SOC Detection Lab",
    description: "Un laboratoire conteneurisé pour observer, détecter et corréler des attaques web, avec journaux, règles Wazuh, remédiation et tests de non-régression.",
    stack: ["Wazuh", "Nginx", "Docker", "Sigma"],
    link: "https://github.com/maneekbaasha/nginx-soc-detection-lab",
  },
  {
    index: "03",
    eyebrow: "AI · Support IT",
    title: "AI IT Support Lab",
    description: "Un assistant local qui qualifie une demande, s’appuie sur une base documentaire et prépare une réponse sans retirer la décision au technicien.",
    stack: ["Python", "LLM", "RAG", "Tests"],
    link: "https://github.com/maneekbaasha",
  },
  {
    index: "04",
    eyebrow: "Portfolio · Product thinking",
    title: "irphan.eu",
    description: "Un portfolio pensé comme un produit : raconter un parcours au-delà du CV, rendre les réalisations vérifiables et réduire la distance entre candidat et recruteur.",
    stack: ["React", "TypeScript", "Vite", "Cloudflare"],
    link: "https://github.com/maneekbaasha/irphan-tech",
  },
];

const experience = [
  {
    period: "2017 — 2026",
    role: "Solutions Specialist",
    company: "Apple",
    copy: "Près de huit ans au contact des utilisateurs, à écouter, diagnostiquer, expliquer et résoudre. Une école exigeante du service, du feedback, de la pédagogie et de la qualité d’expérience.",
  },
  {
    period: "2025 — 2026",
    role: "Consultant cybersécurité",
    company: "CyberLion · CECCA",
    copy: "Audit de maturité et analyse d’exposition : OSINT, cartographie, vulnérabilités, risques, remédiation et restitution exploitable par les décideurs.",
  },
  {
    period: "2024 — aujourd’hui",
    role: "Labs & apprentissage continu",
    company: "IT · Réseau · Cyber · IA",
    copy: "Je transforme mes apprentissages en environnements testables, documentés et publics. L’objectif : montrer ce que je sais faire au lieu de simplement l’énumérer.",
  },
];

const skills = [
  ["Support & workplace", "Windows · macOS · Microsoft 365 · Jira · Troubleshooting · Documentation"],
  ["Cloud & identité", "Microsoft Entra ID · Intune · IAM · RBAC · Device management"],
  ["Réseau", "TCP/IP · DNS · DHCP · Wireshark · Nmap · Cartographie"],
  ["Cybersécurité", "OSINT · Wazuh · Sigma · OWASP · ISO 27001 · NIST"],
  ["IA & automatisation", "LLM · agents · RAG · Python · workflows · validation humaine"],
];

function getInitialView(): View {
  const hash = window.location.hash.replace("#", "") as View;
  return navItems.some((item) => item.id === hash) ? hash : "home";
}

export default function App() {
  const [view, setView] = useState<View>(getInitialView);
  const currentIndex = useMemo(() => navItems.findIndex((item) => item.id === view), [view]);

  useEffect(() => {
    const onHashChange = () => setView(getInitialView());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function go(next: View) {
    if (next === view) return;
    window.location.hash = next;
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function step(direction: 1 | -1) {
    const next = navItems[(currentIndex + direction + navItems.length) % navItems.length];
    go(next.id);
  }

  return (
    <main className="site-shell">
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <header className="site-header">
        <button className="brand" onClick={() => go("home")} aria-label="Retour à l'accueil">
          <span className="brand-dot" />
          <span>IRPHAN.</span>
        </button>

        <nav className="top-nav" aria-label="Navigation principale">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={view === item.id ? "active" : ""}
              onClick={() => go(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <span className="availability"><i /> Open to work</span>
          <ThemeToggle />
        </div>
      </header>

      <div className="panel-stage" key={view}>
        {view === "home" && (
          <section className="panel home-panel">
            <div className="home-kicker panel-enter">Technology · Support · Security · AI</div>
            <div className="home-grid">
              <div className="hero-copy panel-enter delay-1">
                <p className="micro">IRPHANOULLAH MOHAMED MUSTAPHA</p>
                <h1>
                  I make technology<br />
                  <span>clearer, safer, useful.</span>
                </h1>
                <p className="hero-intro">
                  Un profil hybride construit entre expérience utilisateur, support IT, systèmes, cybersécurité et exploration de l’IA.
                </p>
                <div className="hero-actions">
                  <button className="primary-cta" onClick={() => go("projects")}>Explore projects <span>↗</span></button>
                  <button className="text-cta" onClick={() => go("about")}>Discover my story <span>→</span></button>
                </div>
              </div>

              <div className="hero-orbital panel-enter delay-2" aria-hidden="true">
                <div className="orbital-ring ring-one" />
                <div className="orbital-ring ring-two" />
                <div className="orbital-core">
                  <span>IT</span>
                  <small>human × systems</small>
                </div>
                <div className="orbital-chip chip-a">SECURITY</div>
                <div className="orbital-chip chip-b">AI</div>
                <div className="orbital-chip chip-c">SUPPORT</div>
              </div>
            </div>

            <div className="home-footer panel-enter delay-3">
              <div><span>01</span><strong>8 years</strong><small>Apple experience</small></div>
              <div><span>02</span><strong>350 h</strong><small>Cybersecurity audit</small></div>
              <div><span>03</span><strong>Hands-on</strong><small>Labs & projects</small></div>
              <div><span>04</span><strong>Paris area</strong><small>Open to opportunities</small></div>
            </div>
          </section>
        )}

        {view === "about" && (
          <section className="panel content-panel about-panel">
            <div className="section-heading panel-enter">
              <span>01 / ABOUT</span>
              <h2>Beyond<br /><em>the CV.</em></h2>
            </div>
            <div className="about-copy panel-enter delay-1">
              <p className="lead">Pendant près de huit ans chez Apple, j’ai appris que la technologie commence rarement par une machine. Elle commence par une personne qui essaie d’avancer.</p>
              <p>Écouter, reformuler, diagnostiquer, expliquer. Ce socle m’a naturellement conduit vers le support IT, puis vers les systèmes, les réseaux et la cybersécurité.</p>
              <p>Je construis aujourd’hui un profil volontairement transversal. Pas pour collectionner les buzzwords, mais parce que dans la vraie vie, un incident utilisateur peut être un problème de poste, d’identité, de réseau, de sécurité… parfois les quatre.</p>
              <blockquote>Ce site existe pour montrer ma façon de réfléchir, mes réalisations et la progression derrière les intitulés.</blockquote>
            </div>
            <div className="about-side panel-enter delay-2">
              <div className="signal-card"><span>NOW</span><strong>Support IT · Cybersecurity · AI</strong><small>Building useful things, learning in public.</small></div>
              <div className="signal-card"><span>LOCATION</span><strong>Île-de-France</strong><small>Paris · 91 · 92 · 77</small></div>
            </div>
          </section>
        )}

        {view === "experience" && (
          <section className="panel content-panel experience-panel">
            <div className="section-heading panel-enter">
              <span>02 / EXPERIENCE</span>
              <h2>Human first.<br /><em>Technical next.</em></h2>
            </div>
            <div className="experience-list panel-enter delay-1">
              {experience.map((item, index) => (
                <article className="experience-row" key={item.period}>
                  <span className="row-index">0{index + 1}</span>
                  <time>{item.period}</time>
                  <div><h3>{item.role}</h3><p>{item.company}</p></div>
                  <p className="row-copy">{item.copy}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {view === "projects" && (
          <section className="panel projects-panel">
            <div className="projects-head panel-enter">
              <div className="section-heading compact"><span>03 / PROJECTS</span><h2>Selected<br /><em>work.</em></h2></div>
              <p>Des projets conçus comme des preuves : contexte, environnement, décisions, résultat.</p>
            </div>
            <div className="project-grid panel-enter delay-1">
              {projects.map((project) => (
                <a className="project-card" key={project.index} href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  <div className="project-top"><span>{project.index}</span><span>↗</span></div>
                  <div>
                    <p className="project-eyebrow">{project.eyebrow}</p>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                </a>
              ))}
            </div>
          </section>
        )}

        {view === "skills" && (
          <section className="panel content-panel skills-panel">
            <div className="section-heading panel-enter">
              <span>04 / SKILLS</span>
              <h2>Useful over<br /><em>decorative.</em></h2>
            </div>
            <div className="skill-list panel-enter delay-1">
              {skills.map(([title, detail], index) => (
                <article className="skill-row" key={title}>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </article>
              ))}
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
            <div className="contact-copy panel-enter">
              <span>05 / CONTACT</span>
              <h2>Let’s build<br /><em>something useful.</em></h2>
              <p>Support IT, environnement Microsoft, cybersécurité ou projet mêlant technologie et IA : je suis ouvert aux conversations qui débouchent sur du concret.</p>
            </div>
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
        <div className="footer-pager">
          <button onClick={() => step(-1)} aria-label="Section précédente">←</button>
          <span>{String(currentIndex + 1).padStart(2, "0")} / {String(navItems.length).padStart(2, "0")}</span>
          <button onClick={() => step(1)} aria-label="Section suivante">→</button>
        </div>
        <span>Designed to be explored, not scrolled.</span>
      </footer>
    </main>
  );
}

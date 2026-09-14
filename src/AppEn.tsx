import { FormEvent, ReactNode, useEffect, useState } from "react";
import { siHackthebox, siKalilinux, siTryhackme } from "simple-icons";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitch from "./LanguageSwitch";

export type SitePage = "home" | "about" | "portfolio" | "contact";

const profiles = {
  github: "https://github.com/maneekbaasha",
  linkedin: "https://www.linkedin.com/in/irphan-mohamed-mustapha/",
  tryhackme: "https://tryhackme.com/p/maneekbaasha",
  rootme: "https://www.root-me.org/maneekbaasha?lang=en",
  hackthebox: "https://profile.hackthebox.com/profile/019fa470-4b52-70d3-ad9d-ca778a6b0d6a",
};

function Arrow({ back = false }: { back?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d={back ? "M19 12H5m6-6-6 6 6 6" : "M7 17 17 7M8 7h9v9"} /></svg>;
}

function SocialMark({ type }: { type: "github" | "linkedin" | "tryhackme" | "hackthebox" }) {
  if (type === "github") return <svg className="brand-icon" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .7a11.6 11.6 0 0 0-3.67 22.6c.58.11.8-.25.8-.56v-2.25c-3.24.7-3.92-1.38-3.92-1.38-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.18.08 1.8 1.21 1.8 1.21 1.04 1.79 2.74 1.27 3.4.97.1-.76.4-1.27.74-1.56-2.59-.3-5.31-1.29-5.31-5.73 0-1.27.45-2.3 1.2-3.12-.12-.3-.52-1.48.11-3.08 0 0 .98-.31 3.19 1.19a11.1 11.1 0 0 1 5.8 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.6.23 2.78.11 3.08.75.82 1.2 1.85 1.2 3.12 0 4.45-2.73 5.43-5.32 5.72.42.36.79 1.07.79 2.16v3.2c0 .31.21.68.8.56A11.6 11.6 0 0 0 12 .7Z" /></svg>;
  if (type === "linkedin") return <svg className="brand-icon" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M5.37 3.5A2.18 2.18 0 1 1 1 3.5a2.18 2.18 0 0 1 4.37 0ZM1.4 8.1h3.94V21H1.4V8.1Zm6.43 0h3.78v1.76h.05c.53-1 1.81-2.05 3.73-2.05 3.99 0 4.73 2.63 4.73 6.05V21h-3.94v-6.33c0-1.51-.03-3.45-2.1-3.45-2.11 0-2.43 1.65-2.43 3.34V21H7.83V8.1Z" /></svg>;
  const icon = type === "tryhackme" ? siTryhackme : siHackthebox;
  return <svg className={`brand-icon brand-icon--${type}`} aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d={icon.path} /></svg>;
}

type ToolLogoName = "jira" | "entra" | "intune" | "microsoft365" | "apple" | "linux" | "kali";

const toolStack: { name: string; logo: ToolLogoName }[] = [
  { name: "Jira", logo: "jira" },
  { name: "Entra ID", logo: "entra" },
  { name: "Intune", logo: "intune" },
  { name: "Microsoft 365", logo: "microsoft365" },
  { name: "Apple", logo: "apple" },
  { name: "Linux", logo: "linux" },
  { name: "Kali Linux", logo: "kali" },
];

function ToolLogo({ type }: { type: ToolLogoName }) {
  if (type === "microsoft365") return <span className="microsoft-mark" aria-hidden="true"><i /><i /><i /><i /></span>;
  if (type === "jira") return <img src="/brands/jira-original.svg" alt="" aria-hidden="true" />;
  if (type === "entra") return <img src="/brands/entra-id-original.svg" alt="" aria-hidden="true" />;
  if (type === "intune") return <img src="/brands/intune-original.webp" alt="" aria-hidden="true" />;
  if (type === "apple") return <img src="/brands/apple-original.svg" alt="" aria-hidden="true" />;
  if (type === "linux") return <img src="/brands/linux-original.svg" alt="" aria-hidden="true" />;
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d={siKalilinux.path} /></svg>;
}

function ToolMarquee() {
  return <div className="tool-viewport" aria-label="Tools used">
    <div className="tool-track">
      {[0, 1].map(copy => <div className="tool-set" aria-hidden={copy === 1} key={copy}>{toolStack.map(tool => <span className={`tool-item tool-${tool.logo}`} key={`${copy}-${tool.name}`}><ToolLogo type={tool.logo} /><b>{tool.name}</b></span>)}</div>)}
    </div>
  </div>;
}

function useParisTime() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);
  return time;
}

function SiteHeader({ page }: { page: SitePage }) {
  const time = useParisTime();
  return <header className="site-header">
    <a className="identity" href="/en/" aria-label="Home">{page !== "home" && <Arrow back />}<span>Irphanoullah M.</span></a>
    <span className="position">IT Support · Cybersecurity · AI</span>
    <time className="paris-time" dateTime={time === "--:--" ? undefined : time}>Paris · {time}</time>
    <LanguageSwitch language="en" href={page === "home" ? "/" : `/${page}/`} />
    <ThemeToggle />
  </header>;
}

function SocialFooter() {
  return <footer className="social-footer" aria-label="Public profiles">
    <a href={profiles.github} target="_blank" rel="me noreferrer" aria-label="GitHub"><SocialMark type="github" /></a>
    <a href={profiles.tryhackme} target="_blank" rel="me noreferrer" aria-label="TryHackMe"><SocialMark type="tryhackme" /></a>
    <a href={profiles.rootme} target="_blank" rel="me noreferrer" aria-label="Root-Me"><span>RM</span></a>
    <a href={profiles.hackthebox} target="_blank" rel="me noreferrer" aria-label="Hack The Box"><SocialMark type="hackthebox" /></a>
    <a href={profiles.linkedin} target="_blank" rel="me noreferrer" aria-label="LinkedIn"><SocialMark type="linkedin" /></a>
  </footer>;
}

function PageShell({ page, children }: { page: SitePage; children: ReactNode }) {
  return <div className={`site-shell page-${page}`}><SiteHeader page={page} /><main>{children}</main><SocialFooter /></div>;
}

function HomePage() {
  return <PageShell page="home"><section className="home-hero" aria-labelledby="home-title">
    <h1 id="home-title">Irphanoullah</h1>
    <div className="bento-grid">
      <a className="bento-card about-card" href="/en/about/"><span className="bento-copy"><strong>About</strong><small>From user support to cybersecurity.</small></span><Arrow /></a>
      <a className="bento-card projects-card" href="/en/portfolio/"><span className="bento-copy"><strong>Projects</strong><small>Labs, audits and systems documented as evidence of method.</small><em>05 case studies</em></span><Arrow /></a>
      <a className="bento-card contact-card" href="/en/contact/"><span className="bento-copy"><strong>Contact</strong><small>A role, a project or a problem to solve?</small><em>Available in the Paris region</em></span><Arrow /></a>
      <figure className="portrait-card"><img src="/irphan-home-portrait.webp" alt="Profile portrait of Irphanoullah Mohamed Mustapha" width="1024" height="1280" /></figure>
      <div className="right-stack">
        <div className="bento-card tools-card"><span>Tools</span><ToolMarquee /></div>
        <div className="social-card-row">
          <a className="bento-card social-card" href={profiles.github} target="_blank" rel="me noreferrer" aria-label="GitHub"><SocialMark type="github" /></a>
          <a className="bento-card social-card" href={profiles.linkedin} target="_blank" rel="me noreferrer" aria-label="LinkedIn"><SocialMark type="linkedin" /></a>
        </div>
      </div>
    </div>
  </section></PageShell>;
}

const capabilities = [
  ["User support", "Understand quickly, explain clearly and get the user moving again.", "Windows · macOS · Microsoft 365 · Jira · troubleshooting · documentation."],
  ["Identity & endpoints", "Connect identity and endpoint signals to resolve the incident as a whole.", "Entra ID · Intune · IAM · RBAC · device management."],
  ["Systems & networks", "Understand the flows before touching the tools.", "TCP/IP · DNS · DHCP · Wireshark · Nmap · mapping."],
  ["Cybersecurity", "Observe, reduce exposure and turn risk into clear actions.", "OSINT · Wazuh · Sigma · OWASP · ISO 27001 · NIST."],
  ["Artificial intelligence", "Use AI as a copilot, with guardrails and explicit human validation.", "LLM · agents · RAG · Python · workflows."],
];

const experience = [
  ["Nearly 8 years", "Sales Advisor & user support", "Apple", "User-facing support, active listening, diagnosis, clear guidance, resolution, product feedback and a high quality bar."],
  ["May 2025 — Jan. 2026", "Cybersecurity audit engagement", "CECCA", "OSINT, mapping, attack surface, vulnerabilities, NIST/ISO 27001 maturity assessment and executive reporting."],
  ["Today", "Labs & personal projects", "IT Support · Cyber · AI", "Reproducible environments, documented incidents, automation and public repositories as evidence of method."],
  ["Ongoing", "Professional development", "Networks · Cloud · Security", "FullStack Cybersecurity training at Jedha, Cisco Networking Basics and regular practice on TryHackMe, Root-Me and Hack The Box."],
];

type CertificationLogoName = "jedha" | "cisco" | "france-competences" | "google" | "comptia" | "infosec";

const certifications = {
  obtained: [
    {
      title: "FullStack Cybersecurity Training",
      issuer: "Jedha Bootcamp",
      detail: "Intensive training · 2025",
      logo: "jedha" as CertificationLogoName,
    },
    {
      title: "Networking Basics",
      issuer: "Cisco Networking Academy",
      detail: "Completed course · 2026",
      logo: "cisco" as CertificationLogoName,
    },
    {
      title: "Introduction to Cybersecurity",
      issuer: "Cisco Networking Academy",
      detail: "Course and final assessment completed",
      logo: "cisco" as CertificationLogoName,
    },
    {
      title: "Technical Support Fundamentals",
      issuer: "Google Career Certificates",
      detail: "Course certificate earned",
      logo: "google" as CertificationLogoName,
    },
    {
      title: "Cybersecurity Foundations",
      issuer: "Infosec",
      detail: "Learning path certificate earned",
      logo: "infosec" as CertificationLogoName,
    },
    {
      title: "RNCP level 6 qualification",
      issuer: "Secure Infrastructure Administrator",
      detail: "Competency blocks 2 and 3 validated",
      logo: "france-competences" as CertificationLogoName,
    },
  ],
  inProgress: [
    {
      title: "RNCP level 6 qualification",
      issuer: "Secure Infrastructure Administrator",
      detail: "Competency block 1 to validate",
      logo: "france-competences" as CertificationLogoName,
    },
    {
      title: "Google IT Support Certificate",
      issuer: "Google Career Certificates",
      detail: "In progress",
      logo: "google" as CertificationLogoName,
    },

  ],
  future: [
    {
      title: "CompTIA A+",
      issuer: "CompTIA",
      detail: "Certification target",
      logo: "comptia" as CertificationLogoName,
    },
    {
      title: "CompTIA Security+",
      issuer: "CompTIA",
      detail: "Certification target",
      logo: "comptia" as CertificationLogoName,
    },
  ],
};

function CertificationLogo({ type }: { type: CertificationLogoName }) {
  if (type === "infosec") {
    return <span className="cert-logo cert-logo--infosec" aria-hidden="true"><i>●</i><strong>INFOSEC</strong></span>;
  }
  if (type === "comptia") {
    return <span className="cert-logo cert-logo--comptia" aria-hidden="true"><strong>CompTIA</strong><i>+</i></span>;
  }
  if (type === "google") {
    return <span className="cert-logo cert-logo--google" aria-hidden="true">
      <i>G</i><b>o</b><em>o</em><strong>g</strong><i>l</i><b>e</b>
    </span>;
  }
  if (type === "cisco") {
    return <span className="cert-logo cert-logo--cisco" aria-hidden="true">
      <svg viewBox="0 0 88 48"><path d="M8 19v10M15 13v22M22 8v32M29 15v18M36 19v10M43 15v18M50 8v32M57 13v22M64 19v10M71 15v18M78 19v10" /></svg>
      <strong>CISCO</strong>
    </span>;
  }
  if (type === "france-competences") {
    return <span className="cert-logo cert-logo--france" aria-hidden="true"><i>FRANCE</i><strong>COMPÉTENCES</strong></span>;
  }
  return <span className="cert-logo cert-logo--jedha" aria-hidden="true">JEDHA<span>◆</span></span>;
}

function CertificationSection() {
  const renderCard = (item: (typeof certifications.obtained)[number]) => (
    <article className="certification-card" key={item.title}>
      <CertificationLogo type={item.logo} />
      <div><h3>{item.title}</h3><p>{item.issuer}</p><small>{item.detail}</small></div>
    </article>
  );

  return <section className="certifications-section" aria-labelledby="certifications-title">
    <div className="certifications-heading">
      <span>Verifiable learning</span>
      <h2 id="certifications-title">Certifications & training</h2>
      <p>Completed credentials, current learning and future goals are clearly separated.</p>
    </div>
    <div className="certification-group">
      <h3>Completed</h3>
      <div className="certification-grid">{certifications.obtained.map(renderCard)}</div>
    </div>
    <div className="certification-group">
      <h3>In progress</h3>
      <div className="certification-grid">{certifications.inProgress.map(renderCard)}</div>
    </div>
    <div className="certification-group">
      <h3>Target certifications</h3>
      <div className="certification-grid">{certifications.future.map(renderCard)}</div>
    </div>
  </section>;
}

function AboutPage() {
  return <PageShell page="about"><article className="about-layout">
    <h1>About</h1>
    <div className="about-profile">
      <div className="about-intro"><p>During nearly eight years at Apple, I learned that every technical problem starts with a person trying to move forward.</p><p>Listen, reframe, diagnose, then explain: this method led me from user support to systems, networks and cybersecurity.</p><p>My background is cross-functional because real incidents do not respect boundaries between endpoints, identity, networks, security and user experience.</p></div>
      <figure className="about-portrait"><img src="/irphan-about-portrait-bw.webp" alt="Black-and-white portrait of Irphanoullah" width="1024" height="1280" /></figure>
    </div>
    <section className="capability-grid" aria-label="Skills">{capabilities.map(([title, text, tools]) => <article key={title}><span aria-hidden="true">“</span><h2>{text}</h2><p><strong>{title}</strong> {tools}</p></article>)}</section>
    <section className="experience-list" aria-label="Experience">{experience.map(([date, role, company, text]) => <article key={date}><time>{date}</time><h2>{role}<small>{company}</small></h2><p>{text}</p></article>)}</section>
    <CertificationSection />
    <div className="expertise-ticker" aria-hidden="true">IT Support — Microsoft — Cybersecurity — AI — IT Support — Microsoft — Cybersecurity — AI</div>
  </article></PageShell>;
}

const projects = [
  { title: "Modern IT Helpdesk Lab", tag: "IT Support · Microsoft 365", image: "/labs/project-modern-it-helpdesk.webp", href: "/en/projects/modern-it-helpdesk-lab/" },
  { title: "Nginx SOC Detection Lab", tag: "Blue Team · Detection", image: "/labs/project-nginx-soc-detection.webp", href: "/en/projects/nginx-soc-detection-lab/" },
  { title: "AI IT Support Lab", tag: "AI · IT Support", image: "/labs/project-ai-it-support.webp", href: "/en/projects/ai-it-support-lab/", wide: true },
  { title: "irphan.eu", tag: "Portfolio · Personal product", image: "/labs/project-irphan-eu.webp", href: profiles.github },
  { title: "Cybersecurity maturity audit", tag: "Audit · Risk · Azure", image: "/labs/project-cyber-maturity-audit.webp", href: "/en/contact/" },
];

function PortfolioPage() {
  return <PageShell page="portfolio"><section className="portfolio-layout">
    <h1>Projects designed as evidence: context, environment, decisions and outcomes.</h1>
    <div className="project-gallery">{projects.map(project => <a className={project.wide ? "project-card is-wide" : "project-card"} key={project.title} href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel={project.href.startsWith("http") ? "noreferrer" : undefined}><img src={project.image} alt="" width="1200" height="800" loading="lazy" /><span><strong>{project.title}</strong><small>{project.tag}</small></span></a>)}</div>
  </section></PageShell>;
}

function ContactForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = String(data.get("need") || "Contact from irphan.eu");
    const body = [`Name: ${data.get("name") || ""}`, `Email: ${data.get("email") || ""}`, `Type of conversation: ${data.get("exchange") || ""}`, "", String(data.get("message") || "")].join("\n");
    window.location.href = `mailto:mohamed.irphan09@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  return <form className="contact-form" onSubmit={submit}>
    <label>Full name<input name="name" type="text" placeholder="e.g. Irphan Mohamed" required /></label>
    <label>E-mail<input name="email" type="email" placeholder="you@email.com" required /></label>
    <div className="form-columns">
      <fieldset><legend>What do you need?</legend>{["Support IT / Microsoft 365", "Cybersecurity / Blue Team", "Audit / security", "AI / automation"].map(value => <label key={value}><input type="radio" name="need" value={value} required />{value}</label>)}</fieldset>
      <fieldset><legend>Type of conversation</legend>{["Permanent / fixed-term role", "Apprenticeship", "Project / freelance", "Other"].map(value => <label key={value}><input type="radio" name="exchange" value={value} required />{value}</label>)}</fieldset>
    </div>
    <label>More details<textarea name="message" placeholder="Tell me about your needs…" rows={5} required /></label>
    <button type="submit">Prepare email <Arrow /></button>
    <p className="availability"><i />Open to opportunities · Paris region</p>
  </form>;
}

function ContactPage() {
  return <PageShell page="contact"><section className="contact-layout">
    <h1>IT support, Microsoft environments, cybersecurity or projects combining technology and AI: I am open to conversations that lead to concrete outcomes.</h1>
    <aside className="contact-profiles"><a href={profiles.linkedin} target="_blank" rel="me noreferrer"><SocialMark type="linkedin" /><span>LinkedIn</span></a><a href={profiles.github} target="_blank" rel="me noreferrer"><SocialMark type="github" /><span>GitHub</span></a></aside>
    <ContactForm />
  </section></PageShell>;
}

export default function App({ page = "home" }: { page?: SitePage }) {
  if (page === "about") return <AboutPage />;
  if (page === "portfolio") return <PortfolioPage />;
  if (page === "contact") return <ContactPage />;
  return <HomePage />;
}

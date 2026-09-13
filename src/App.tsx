import { FormEvent, ReactNode, useEffect, useState } from "react";
import { siHackthebox, siKalilinux, siTryhackme } from "simple-icons";
import ThemeToggle from "./ThemeToggle";

export type SitePage = "home" | "about" | "portfolio" | "contact";

const profiles = {
  github: "https://github.com/maneekbaasha",
  linkedin: "https://www.linkedin.com/in/irphan-mohamed-mustapha/",
  tryhackme: "https://tryhackme.com/p/maneekbaasha",
  rootme: "https://www.root-me.org/maneekbaasha?lang=fr",
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
  return <div className="tool-viewport" aria-label="Outils utilisés">
    <div className="tool-track">
      {[0, 1].map(copy => <div className="tool-set" aria-hidden={copy === 1} key={copy}>{toolStack.map(tool => <span className={`tool-item tool-${tool.logo}`} key={`${copy}-${tool.name}`}><ToolLogo type={tool.logo} /><b>{tool.name}</b></span>)}</div>)}
    </div>
  </div>;
}

function useParisTime() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);
  return time;
}

function SiteHeader({ page }: { page: SitePage }) {
  const time = useParisTime();
  return <header className="site-header">
    <a className="identity" href="/" aria-label="Accueil">{page !== "home" && <Arrow back />}<span>Irphanoullah M.</span></a>
    <span className="position">Support IT · Cybersécurité · IA</span>
    <time className="paris-time" dateTime={time === "--:--" ? undefined : time}>Paris · {time}</time>
    <ThemeToggle />
  </header>;
}

function SocialFooter() {
  return <footer className="social-footer" aria-label="Profils publics">
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
      <a className="bento-card about-card" href="/about/"><span className="bento-copy"><strong>À propos</strong><small>Du support utilisateur à la cybersécurité.</small></span><Arrow /></a>
      <a className="bento-card projects-card" href="/portfolio/"><span className="bento-copy"><strong>Projets</strong><small>Labs, audits et systèmes documentés comme preuves de méthode.</small><em>05 réalisations</em></span><Arrow /></a>
      <a className="bento-card contact-card" href="/contact/"><span className="bento-copy"><strong>Contact</strong><small>Un poste, une mission ou un problème à résoudre&nbsp;?</small><em>Disponible en Île-de-France</em></span><Arrow /></a>
      <figure className="portrait-card"><img src="/irphan-home-portrait.webp" alt="Portrait de profil d’Irphanoullah Mohamed Mustapha" width="1024" height="1280" /></figure>
      <div className="right-stack">
        <div className="bento-card tools-card"><span>Outils</span><ToolMarquee /></div>
        <div className="social-card-row">
          <a className="bento-card social-card" href={profiles.github} target="_blank" rel="me noreferrer" aria-label="GitHub"><SocialMark type="github" /></a>
          <a className="bento-card social-card" href={profiles.linkedin} target="_blank" rel="me noreferrer" aria-label="LinkedIn"><SocialMark type="linkedin" /></a>
        </div>
      </div>
    </div>
  </section></PageShell>;
}

const capabilities = [
  ["Support utilisateur", "Comprendre vite, expliquer clairement et remettre l’utilisateur en mouvement.", "Windows · macOS · Microsoft 365 · Jira · troubleshooting · documentation."],
  ["Identité & terminaux", "Relier les identités et les terminaux pour résoudre l’incident dans son ensemble.", "Entra ID · Intune · IAM · RBAC · device management."],
  ["Systèmes & réseaux", "Comprendre les flux avant de toucher aux outils.", "TCP/IP · DNS · DHCP · Wireshark · Nmap · cartographie."],
  ["Cybersécurité", "Observer, réduire l’exposition et transformer le risque en actions compréhensibles.", "OSINT · Wazuh · Sigma · OWASP · ISO 27001 · NIST."],
  ["Intelligence artificielle", "Utiliser l’IA comme copilote, avec des garde-fous et une validation humaine explicite.", "LLM · agents · RAG · Python · workflows."],
];

const experience = [
  ["Près de 8 ans", "Conseiller de vente & support utilisateur", "Apple", "Contact utilisateur, écoute, diagnostic, pédagogie, résolution, retours produit et exigence de qualité."],
  ["Mai 2025 — Jan. 2026", "Mission d’audit cybersécurité", "CECCA", "OSINT, cartographie, surface d’attaque, vulnérabilités, évaluation de maturité NIST/ISO 27001 et restitution."],
  ["Aujourd’hui", "Labs & projets personnels", "Support IT · Cyber · IA", "Environnements reproductibles, incidents documentés, automatisation et dépôts publics comme preuves de méthode."],
  ["En continu", "Développement professionnel", "Réseaux · Cloud · Sécurité", "Formation FullStack cybersécurité chez Jedha, Cisco Networking Basics et pratique régulière sur TryHackMe, Root-Me et Hack The Box."],
];

function AboutPage() {
  return <PageShell page="about"><article className="about-layout">
    <h1>À propos</h1>
    <div className="about-intro"><p>Pendant près de huit ans chez Apple, j’ai appris qu’un problème technique commence toujours par une personne qui essaie d’avancer.</p><p>Écouter, reformuler, diagnostiquer puis expliquer : cette méthode m’a conduit du support utilisateur vers les systèmes, les réseaux et la cybersécurité.</p><p>Mon profil est transversal parce qu’un incident réel ne respecte pas les frontières entre poste de travail, identité, réseau, sécurité et expérience utilisateur.</p></div>
    <figure className="about-portrait"><img src="/irphan-about-portrait-bw.webp" alt="Portrait en noir et blanc d’Irphanoullah" width="1024" height="1280" /></figure>
    <section className="capability-grid" aria-label="Compétences">{capabilities.map(([title, text, tools]) => <article key={title}><span aria-hidden="true">“</span><h2>{text}</h2><p><strong>{title}</strong> {tools}</p></article>)}</section>
    <section className="experience-list" aria-label="Expérience">{experience.map(([date, role, company, text]) => <article key={date}><time>{date}</time><h2>{role}<small>{company}</small></h2><p>{text}</p></article>)}</section>
    <div className="expertise-ticker" aria-hidden="true">Support IT — Microsoft — Cybersécurité — IA — Support IT — Microsoft — Cybersécurité — IA</div>
  </article></PageShell>;
}

const projects = [
  { title: "Modern IT Helpdesk Lab", tag: "Support IT · Microsoft 365", image: "/labs/project-modern-it-helpdesk.webp", href: "/projets/modern-it-helpdesk-lab/" },
  { title: "Nginx SOC Detection Lab", tag: "Blue Team · Détection", image: "/labs/project-nginx-soc-detection.webp", href: "/projets/nginx-soc-detection-lab/" },
  { title: "AI IT Support Lab", tag: "IA · Support IT", image: "/labs/project-ai-it-support.webp", href: "/projets/ai-it-support-lab/", wide: true },
  { title: "irphan.eu", tag: "Portfolio · Produit personnel", image: "/labs/project-irphan-eu.webp", href: profiles.github },
  { title: "Audit de maturité cyber", tag: "Audit · Risque · Azure", image: "/labs/project-cyber-maturity-audit.webp", href: "/contact/" },
];

function PortfolioPage() {
  return <PageShell page="portfolio"><section className="portfolio-layout">
    <h1>Des projets conçus comme des preuves : contexte, environnement, décisions et résultat.</h1>
    <div className="project-gallery">{projects.map(project => <a className={project.wide ? "project-card is-wide" : "project-card"} key={project.title} href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel={project.href.startsWith("http") ? "noreferrer" : undefined}><img src={project.image} alt="" width="1200" height="800" loading="lazy" /><span><strong>{project.title}</strong><small>{project.tag}</small></span></a>)}</div>
  </section></PageShell>;
}

function ContactForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = String(data.get("need") || "Prise de contact depuis irphan.eu");
    const body = [`Nom : ${data.get("name") || ""}`, `Email : ${data.get("email") || ""}`, `Type d’échange : ${data.get("exchange") || ""}`, "", String(data.get("message") || "")].join("\n");
    window.location.href = `mailto:mohamed.irphan09@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  return <form className="contact-form" onSubmit={submit}>
    <label>Nom complet<input name="name" type="text" placeholder="ex. Irphan Mohamed" required /></label>
    <label>E-mail<input name="email" type="email" placeholder="votre@email.fr" required /></label>
    <div className="form-columns">
      <fieldset><legend>Quel est votre besoin ?</legend>{["Support IT / Microsoft 365", "Cybersécurité / Blue Team", "Audit / sécurité", "IA / automatisation"].map(value => <label key={value}><input type="radio" name="need" value={value} required />{value}</label>)}</fieldset>
      <fieldset><legend>Type d’échange</legend>{["Opportunité CDI / CDD", "Alternance", "Mission / freelance", "Autre"].map(value => <label key={value}><input type="radio" name="exchange" value={value} required />{value}</label>)}</fieldset>
    </div>
    <label>Plus de détails<textarea name="message" placeholder="Décrivez votre besoin…" rows={5} required /></label>
    <button type="submit">Préparer l’e-mail <Arrow /></button>
    <p className="availability"><i />Ouvert aux opportunités · Île-de-France</p>
  </form>;
}

function ContactPage() {
  return <PageShell page="contact"><section className="contact-layout">
    <h1>Support IT, environnement Microsoft, cybersécurité ou projet mêlant technologie et IA : je suis ouvert aux conversations qui débouchent sur du concret.</h1>
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

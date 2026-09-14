import { useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitch from "./LanguageSwitch";

const repo = "https://github.com/maneekbaasha/modern-it-helpdesk-lab";

const incidents = [
  {
    id: "IT-1",
    title: "Outlook authentication loop",
    context: "After a password change, Outlook repeatedly requested authentication.",
    diagnosis: "The new password worked elsewhere, so the issue was on the endpoint rather than the account. The working hypothesis was a stale token stored locally.",
    action: "Removed obsolete Office credentials from Windows Credential Manager, restarted Outlook and signed in again.",
    result: "Access restored without another password reset.",
    href: `${repo}/blob/main/solutions/IT-1-solution.md`,
  },
  {
    id: "IT-2",
    title: "Finance employee onboarding",
    context: "Create an identity, assign appropriate access and prepare a managed Windows endpoint without excessive privileges.",
    diagnosis: "Device enrollment failed with error 80180003. Logs and reports pointed the investigation toward the tenant’s MDM authority.",
    action: "Finance group, licence, MFA, separate admin accounts, Intune authority configuration, then a new Entra join.",
    result: "Identity provisioned, endpoint joined to Entra ID and enrolled in Intune under least privilege.",
    href: `${repo}/blob/main/solutions/IT-2-solution.md`,
  },
  {
    id: "IT-3",
    title: "Noncompliant Windows endpoint",
    context: "Microsoft Defender Firewall was intentionally disabled on a pilot endpoint to reproduce security drift.",
    diagnosis: "The Intune timeline and firewall report confirmed the change from compliant to noncompliant.",
    action: "Re-enabled the firewall, synchronized the device and triggered a new compliance evaluation.",
    result: "The device returned to a compliant state, with an end-to-end documented evidence trail.",
    href: `${repo}/blob/main/solutions/IT-3-solution.md`,
  },
  {
    id: "IT-6",
    title: "Corporate device reported lost",
    context: "Assess the risk and choose the appropriate Intune action for a potentially exposed corporate Windows device.",
    diagnosis: "Documented comparison of Retire, Wipe and Delete, considering device ownership, last check-in and data risk.",
    action: "Selected a full wipe with documented rationale. The destructive command was intentionally not executed on the reusable VM.",
    result: "A realistic, controlled and traceable incident decision without claiming a device had been wiped when it had not.",
    href: `${repo}/blob/main/solutions/IT-6-solution.md`,
  },
];

const method = [
  "Understand the symptoms",
  "Determine the scope",
  "Identify recent changes",
  "Form a hypothesis",
  "Test the hypothesis",
  "Apply the smallest change",
  "Validate the outcome",
  "Document the resolution",
];

export default function HelpdeskCaseStudy() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Modern IT Helpdesk Lab — Case Study | Irphanoullah";
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <main className="case-page">

      <header className="case-topbar">
        <a href="/en/portfolio/" className="case-back">← All projects</a>
        <span>Case study · IT Support</span>
        <LanguageSwitch language="en" href="/projets/modern-it-helpdesk-lab/" />
        <ThemeToggle />
      </header>

      <section className="case-hero" id="case-content">
        <div className="case-hero-grid" aria-hidden="true" />
        <div className="case-kicker">Modern IT Helpdesk Lab · 2026</div>
        <h1>Solve methodically.<br /><em>Document for lasting impact.</em></h1>
        <p className="case-lead">A personal lab reproducing the IT incident and request lifecycle with Jira Service Management, Microsoft Entra ID, Intune, Microsoft 365, and Windows and macOS endpoints.</p>
        <div className="case-actions">
          <a className="pill-button light" href={repo} target="_blank" rel="noreferrer">Explore the repository <span>↗</span></a>
          <a href="#incidents">View incidents ↓</a>
        </div>
        <div className="case-facts">
          <div><span>Role</span><strong>Design & implementation</strong></div>
          <div><span>Format</span><strong>Independent lab</strong></div>
          <div><span>Scenarios</span><strong>6 documented tickets</strong></div>
          <div><span>Environment</span><strong>Microsoft 365 & endpoints</strong></div>
        </div>
      </section>

      <section className="case-section case-overview">
        <div className="case-number">01 · Context</div>
        <div className="case-two-columns">
          <h2>Simulate support that is<br /><em>modern and credible.</em></h2>
          <div className="case-copy">
            <p className="case-copy-lead">The goal was not to pile up screenshots, but to reproduce a working method: qualify, diagnose, remediate carefully and leave usable documentation.</p>
            <p>Each exercise starts from a fictional ticket, separates the brief from the solution and explains the decisions made. The lab covers identity, endpoint management, compliance, software deployment and incident response for a lost device.</p>
          </div>
        </div>
        <div className="case-architecture" aria-label="Lab architecture">
          <div><span>01</span><strong>User</strong><small>Request or incident</small></div>
          <i>→</i>
          <div><span>02</span><strong>Jira Service Management</strong><small>Triage & tracking</small></div>
          <i>→</i>
          <div><span>03</span><strong>Entra ID · Intune · M365</strong><small>Diagnosis & action</small></div>
          <i>→</i>
          <div><span>04</span><strong>Endpoint</strong><small>Validation & evidence</small></div>
        </div>
      </section>

      <section className="case-section case-method">
        <div className="case-number">02 · Method</div>
        <div className="case-two-columns">
          <h2>Eight steps.<br /><em>No magic.</em></h2>
          <p className="case-copy-lead">A simple procedure that avoids two common junior-support mistakes: changing too many things at once and closing a ticket without validation.</p>
        </div>
        <ol className="method-list">
          {method.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}
        </ol>
      </section>

      <section className="case-section case-incidents" id="incidents">
        <div className="case-number">03 · Selected incidents</div>
        <div className="case-heading-row">
          <h2>From symptom<br /><em>to evidence.</em></h2>
          <p>Four representative scenarios. Full procedures, commands, decisions and closure notes remain available on GitHub.</p>
        </div>
        <div className="incident-list">
          {incidents.map((incident) => (
            <article className="incident-card" key={incident.id}>
              <header><span>{incident.id}</span><h3>{incident.title}</h3></header>
              <div className="incident-grid">
                <div><small>Context</small><p>{incident.context}</p></div>
                <div><small>Diagnostic</small><p>{incident.diagnosis}</p></div>
                <div><small>Action</small><p>{incident.action}</p></div>
                <div className="incident-result"><small>Outcome</small><p>{incident.result}</p></div>
              </div>
              <a href={incident.href} target="_blank" rel="noreferrer">View evidence on GitHub ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="case-section case-lessons">
        <div className="case-number">04 · What this project demonstrates</div>
        <div className="lesson-grid">
          <div>
            <h2>Skills<br /><em>put into practice.</em></h2>
            <div className="case-chips">
              {["User support", "Jira", "Microsoft 365", "Entra ID", "Intune", "Windows 11", "macOS", "IAM", "Compliance", "Documentation"].map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </div>
          <div className="case-limit">
            <span>Stated limitations</span>
            <h3>A lab is not production.</h3>
            <p>Users, the organization and incidents are fictional. Some services rely on Microsoft trials and virtual machines. The lost-device wipe was not executed in order to preserve the VM.</p>
            <p>These limitations are explicit: they clearly separate what was tested, what was simulated and what would require a real enterprise environment.</p>
          </div>
        </div>
      </section>

      <section className="case-cta">
        <span>View technical details</span>
        <h2>The repository contains all six tickets,<br />their solutions and documentation.</h2>
        <div className="case-actions">
          <a className="pill-button light" href={repo} target="_blank" rel="noreferrer">Open GitHub <span>↗</span></a>
          <a href="/en/portfolio/">Back to portfolio</a>
        </div>
        <footer><span>© 2026 Irphanoullah Mohamed Mustapha</span><a href="#case-content">Back to top ↑</a></footer>
      </section>
    </main>
  );
}

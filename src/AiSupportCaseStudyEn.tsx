import { useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitch from "./LanguageSwitch";

const tests = [
  ["01", "Documentation first", "The local model cannot replace an already documented first step with an improvised answer."],
  ["02", "Security incident", "A lost corporate device is classified as a security incident rather than a simple user request."],
  ["03", "Aligned response", "The Outlook scenario must remain consistent with the documented resolution procedure."],
  ["04", "Human decision", "The final report must explicitly retain a human decision or validation."],
  ["05", "Safe fallback", "An unknown request triggers a cautious response rather than an invented procedure."],
];

export default function AiSupportCaseStudy() {
  useEffect(() => {
    const previous = document.title;
    document.title = "AI IT Support Lab — Case Study | Irphanoullah";
    return () => { document.title = previous; };
  }, []);

  return (
    <main className="case-page">
      <header className="case-topbar">
        <a href="/en/portfolio/" className="case-back">← Portfolio</a>
        <span>Case study · AI & IT Support</span>
        <LanguageSwitch language="en" />
        <ThemeToggle />
      </header>

      <section className="case-hero" id="case-content">
        <div className="case-hero-grid" aria-hidden="true" />
        <div className="case-kicker">AI IT Support Lab · 2026</div>
        <h1>Assist the technician.<br /><em>Do not decide for them.</em></h1>
        <p className="case-lead">A local support-assistant prototype that triages requests, relies on a knowledge base and prepares responses while preserving explicit guardrails and human validation.</p>
        <div className="case-actions"><a href="#tests" className="pill-button light">View guardrails ↓</a></div>
        <div className="case-facts">
          <div><span>Format</span><strong>Local prototype</strong></div>
          <div><span>Stack</span><strong>Python · LLM · RAG</strong></div>
          <div><span>Validation</span><strong>5 automated tests</strong></div>
          <div><span>Principle</span><strong>Human in the loop</strong></div>
        </div>
      </section>

      <section className="case-section case-overview">
        <div className="case-number">01 · Problem</div>
        <div className="case-two-columns">
          <h2>Use AI<br /><em>without sacrificing method.</em></h2>
          <div className="case-copy">
            <p className="case-copy-lead">The goal is not to build a chatbot that “answers everything”, but a copilot that remains subordinate to documentation and support rules.</p>
            <p>When the knowledge base contains a known procedure, it remains authoritative. When a situation is uncertain or sensitive, the assistant must flag the limitation, escalate or request human validation instead of fabricating a solution.</p>
          </div>
        </div>
        <div className="case-architecture" aria-label="Assistant workflow">
          <div><span>01</span><strong>Ticket</strong><small>User request</small></div><i>→</i>
          <div><span>02</span><strong>Triage</strong><small>Context & risk</small></div><i>→</i>
          <div><span>03</span><strong>Documentation</strong><small>Retrieval & constraints</small></div><i>→</i>
          <div><span>04</span><strong>Technician</strong><small>Validation & decision</small></div>
        </div>
      </section>

      <section className="case-section case-incidents" id="tests">
        <div className="case-number">02 · Tested guardrails</div>
        <div className="case-heading-row">
          <h2>Five tests.<br /><em>Five useful limits.</em></h2>
          <p>The first engine version is validated by unit tests focused primarily on what the assistant must not do.</p>
        </div>
        <div className="incident-list">
          {tests.map(([id,title,description]) => (
            <article className="incident-card" key={id}>
              <header><span>TEST {id}</span><h3>{title}</h3></header>
              <div className="incident-grid"><div><small>Expected behavior</small><p>{description}</p></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="case-section case-lessons">
        <div className="case-number">03 · What the project demonstrates</div>
        <div className="lesson-grid">
          <div>
            <h2>Applied AI.<br /><em>Accountability retained.</em></h2>
            <div className="case-chips">{["Python", "Local LLM", "RAG", "Support IT", "Unit tests", "Fallback", "Documentation", "Human validation"].map((skill)=><span key={skill}>{skill}</span>)}</div>
          </div>
          <div className="case-limit">
            <span>Project status</span>
            <h3>An MVP, not a finished product.</h3>
            <p>The prototype runs locally and passes all five behavioral tests. It does not claim to replace an ITSM platform, a security decision engine or an experienced technician.</p>
            <p>The next logical step is to expand the knowledge base, trace the sources used and measure response quality across more scenarios.</p>
          </div>
        </div>
      </section>

      <section className="case-cta">
        <span>Approach</span>
        <h2>The project’s value is not “AI” itself.<br />It is the way AI is kept under control.</h2>
        <div className="case-actions"><a href="/en/portfolio/" className="pill-button light">Back to projects</a></div>
        <footer><span>© 2026 Irphanoullah Mohamed Mustapha</span><a href="#case-content">Back to top ↑</a></footer>
      </section>
    </main>
  );
}

import { useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitch from "./LanguageSwitch";

const repo = "https://github.com/maneekbaasha/nginx-soc-detection-lab";

const detections = [
  ["100100", "Sensitive access attempt", "Detects a request to /.htpasswd or /.env even when the resource is not served."],
  ["100101", "Successful exposure", "Raises severity when a sensitive file is actually returned with HTTP status 200."],
  ["100102", "Correlated reconnaissance", "Correlates four sensitive-file probes within 60 seconds from the same IP address."],
];

export default function NginxCaseStudy() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Nginx SOC Detection Lab — Case Study | Irphanoullah";
    return () => { document.title = previous; };
  }, []);

  return (
    <main className="case-page">
      <header className="case-topbar">
        <a href="/en/portfolio/" className="case-back">← Portfolio</a>
        <span>Case study · Blue Team</span>
        <LanguageSwitch language="en" href="/projets/nginx-soc-detection-lab/" />
        <ThemeToggle />
      </header>

      <section className="case-hero" id="case-content">
        <div className="case-hero-grid" aria-hidden="true" />
        <div className="case-kicker">Nginx SOC Detection Lab · 2026</div>
        <h1>Observe the attack.<br /><em>Prove the remediation.</em></h1>
        <p className="case-lead">A local Blue Team lab that places an intentionally vulnerable Nginx server beside its hardened version, then turns their JSON telemetry into testable Wazuh detections.</p>
        <div className="case-actions">
          <a className="pill-button light" href={repo} target="_blank" rel="noreferrer">Explore the repository <span>↗</span></a>
          <a href="#detections">View detections ↓</a>
        </div>
        <div className="case-facts">
          <div><span>Type</span><strong>Blue Team lab</strong></div>
          <div><span>Stack</span><strong>Nginx · Docker · Wazuh</strong></div>
          <div><span>Detection</span><strong>3 correlated rules</strong></div>
          <div><span>Validation</span><strong>Bash regression tests</strong></div>
        </div>
      </section>

      <section className="case-section case-overview">
        <div className="case-number">01 · Context</div>
        <div className="case-two-columns">
          <h2>Create a vulnerability<br /><em>to learn how to detect it.</em></h2>
          <div className="case-copy">
            <p className="case-copy-lead">The vulnerable server intentionally uses /etc/nginx as its web root, allowing a fictional .htpasswd file to be exposed on port 8080.</p>
            <p>The hardened server runs alongside it on port 8081, restores the web root to /usr/share/nginx/html and explicitly blocks dotfiles. Running both versions makes the before-and-after comparison unambiguous.</p>
          </div>
        </div>
        <div className="case-architecture" aria-label="Lab architecture">
          <div><span>01</span><strong>Vulnerable Nginx</strong><small>Port 8080 · controlled exposure</small></div><i>→</i>
          <div><span>02</span><strong>JSON logs</strong><small>IP · method · path · status</small></div><i>→</i>
          <div><span>03</span><strong>Wazuh</strong><small>Detection & correlation</small></div><i>→</i>
          <div><span>04</span><strong>Hardened Nginx</strong><small>Port 8081 · validation</small></div>
        </div>
      </section>

      <section className="case-section case-incidents" id="detections">
        <div className="case-number">02 · Detection</div>
        <div className="case-heading-row">
          <h2>From intent<br /><em>to incident.</em></h2>
          <p>The rules distinguish a simple sensitive-file probe, a confirmed exposure and repeated reconnaissance.</p>
        </div>
        <div className="incident-list">
          {detections.map(([id,title,description]) => (
            <article className="incident-card" key={id}>
              <header><span>Rule {id}</span><h3>{title}</h3></header>
              <div className="incident-grid"><div><small>Logic</small><p>{description}</p></div></div>
              <a href={`${repo}/blob/main/rules/wazuh/local_rules.xml`} target="_blank" rel="noreferrer">View rules on GitHub ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="case-section case-lessons">
        <div className="case-number">03 · Remediation & validation</div>
        <div className="lesson-grid">
          <div>
            <h2>Remediate.<br /><em>Then test that it holds.</em></h2>
            <div className="case-chips">{["Docker", "Nginx", "JSON logs", "Wazuh", "Correlation", "Bash", "Hardening", "Regression testing"].map((skill)=><span key={skill}>{skill}</span>)}</div>
          </div>
          <div className="case-limit">
            <span>Validation</span>
            <h3>The script must fail if the vulnerability returns.</h3>
            <p>The remediation script confirms that the vulnerability remains reproducible on the control server, that .htpasswd and .env are blocked on the hardened version, and that legitimate authentication still works.</p>
            <p>The project is intentionally local and educational: Wazuh acts as the rule engine without a production indexer or dashboard.</p>
          </div>
        </div>
      </section>

      <section className="case-cta">
        <span>Technical evidence</span>
        <h2>Configuration, Wazuh rules, screenshots and tests<br />are documented in the repository.</h2>
        <div className="case-actions"><a className="pill-button light" href={repo} target="_blank" rel="noreferrer">Open GitHub <span>↗</span></a><a href="/en/portfolio/">Back to projects</a></div>
        <footer><span>© 2026 Irphanoullah Mohamed Mustapha</span><a href="#case-content">Back to top ↑</a></footer>
      </section>
    </main>
  );
}

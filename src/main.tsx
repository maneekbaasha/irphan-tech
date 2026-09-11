import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import HelpdeskCaseStudy from "./HelpdeskCaseStudy";
import NginxCaseStudy from "./NginxCaseStudy";
import AiSupportCaseStudy from "./AiSupportCaseStudy";
import "./styles.css";
import "./premium.css";
import "./architecture.css";
import "./product-home.css";
import "./hero-portrait.css";
import "./figma-screens.css";
import "./motion-system.css";
import "./apple-viture-refinement.css";
import "./projects-product-v2.css";
import "./projects-utility-v1.css";
import "./project-card-apple-v1.css";
import "./sections-editorial-v2.css";
import "./case-studies-cinematic.css";
import "./site-polish-v1.css";
import "./site-audit-fixes-v1.css";
import "./mobile-first-v1.css";
import "./design-v2.css";
import "./design-v2-mobile-fix.css";
import "./motion-polish-v2.css";

const path = window.location.pathname.replace(/\/$/, "");

function Root() {
  if (path === "/projets/modern-it-helpdesk-lab") return <HelpdeskCaseStudy />;
  if (path === "/projets/nginx-soc-detection-lab") return <NginxCaseStudy />;
  if (path === "/projets/ai-it-support-lab") return <AiSupportCaseStudy />;
  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><Root /></React.StrictMode>,
);

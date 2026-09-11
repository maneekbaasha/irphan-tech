import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import HelpdeskCaseStudy from "./HelpdeskCaseStudy";
import NginxCaseStudy from "./NginxCaseStudy";
import AiSupportCaseStudy from "./AiSupportCaseStudy";
import "./styles.css";
import "./motion-accessibility.css";
import "./case-studies-cinematic.css";
import "./case-study-motion.css";
import "./studio-redesign-v3.css";
import "./studio-review-fixes-v1.css";
import "./project-visual-cards-v1.css";
import "./studio-coherence-v1.css";

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

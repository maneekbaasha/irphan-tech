import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import HelpdeskCaseStudy from "./HelpdeskCaseStudy";
import NginxCaseStudy from "./NginxCaseStudy";
import AiSupportCaseStudy from "./AiSupportCaseStudy";
import NotFound from "./NotFound";
import "./motion-accessibility.css";
import "./case-studies-cinematic.css";
import "./case-study-motion.css";
import "./not-found.css";
import "./light-mode-fixes.css";
import "./portfolio.css";

const path = window.location.pathname.replace(/\/$/, "");

function Root() {
  if (path === "") return <App />;
  if (path === "/projets/modern-it-helpdesk-lab") return <HelpdeskCaseStudy />;
  if (path === "/projets/nginx-soc-detection-lab") return <NginxCaseStudy />;
  if (path === "/projets/ai-it-support-lab") return <AiSupportCaseStudy />;
  return <NotFound />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><Root /></React.StrictMode>,
);

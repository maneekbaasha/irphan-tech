import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppEn from "./AppEn";
import HelpdeskCaseStudy from "./HelpdeskCaseStudy";
import NginxCaseStudy from "./NginxCaseStudy";
import AiSupportCaseStudy from "./AiSupportCaseStudy";
import NotFound from "./NotFound";
import HelpdeskCaseStudyEn from "./HelpdeskCaseStudyEn";
import NginxCaseStudyEn from "./NginxCaseStudyEn";
import AiSupportCaseStudyEn from "./AiSupportCaseStudyEn";
import "./motion-accessibility.css";
import "./case-studies-cinematic.css";
import "./case-study-motion.css";
import "./not-found.css";
import "./light-mode-fixes.css";
import "./portfolio.css";

const path = window.location.pathname.replace(/\/$/, "");

function Root() {
  if (path === "") return <App />;
  if (path === "/about") return <App page="about" />;
  if (path === "/portfolio") return <App page="portfolio" />;
  if (path === "/contact") return <App page="contact" />;
  if (path === "/projets/modern-it-helpdesk-lab") return <HelpdeskCaseStudy />;
  if (path === "/projets/nginx-soc-detection-lab") return <NginxCaseStudy />;
  if (path === "/projets/ai-it-support-lab") return <AiSupportCaseStudy />;
  if (path === "/en") return <AppEn />;
  if (path === "/en/about") return <AppEn page="about" />;
  if (path === "/en/portfolio") return <AppEn page="portfolio" />;
  if (path === "/en/contact") return <AppEn page="contact" />;
  if (path === "/en/projects/modern-it-helpdesk-lab") return <HelpdeskCaseStudyEn />;
  if (path === "/en/projects/nginx-soc-detection-lab") return <NginxCaseStudyEn />;
  if (path === "/en/projects/ai-it-support-lab") return <AiSupportCaseStudyEn />;
  return <NotFound language={path.startsWith("/en") ? "en" : "fr"} />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><Root /></React.StrictMode>,
);

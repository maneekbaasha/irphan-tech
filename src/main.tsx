import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import HelpdeskCaseStudy from "./HelpdeskCaseStudy";
import "./styles.css";
import "./premium.css";
import "./architecture.css";
import "./product-home.css";

const isHelpdeskCase = window.location.pathname.replace(/\/$/, "") === "/projets/modern-it-helpdesk-lab";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>{isHelpdeskCase ? <HelpdeskCaseStudy /> : <App />}</React.StrictMode>,
);

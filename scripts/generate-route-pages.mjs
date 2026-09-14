import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { renderPage } from "../.prerender/prerender.js";

const dist = "dist";
const sourcePath = join(dist, "index.html");
const source = await readFile(sourcePath, "utf8");

const home = {
  path: "",
  language: "fr",
  locale: "fr_FR",
  title: "Irphanoullah Mohamed Mustapha — IT, cybersécurité & IA",
  description: "Une présentation humaine, un parcours et des réalisations concrètes en support IT, systèmes et cybersécurité.",
  url: "https://irphan.eu/",
  alternate: "https://irphan.eu/en/",
};

const routes = [
  {
    path: "about",
    language: "fr",
    locale: "fr_FR",
    title: "À propos — Irphanoullah Mohamed Mustapha",
    description: "Parcours, expérience, certifications et compétences d’Irphanoullah Mohamed Mustapha en support IT, environnements Microsoft, cybersécurité et IA.",
    url: "https://irphan.eu/about/",
    alternate: "https://irphan.eu/en/about/",
  },
  {
    path: "portfolio",
    language: "fr",
    locale: "fr_FR",
    title: "Projets — Support IT, cybersécurité et IA | Irphanoullah",
    description: "Découvrez des projets documentés en support IT Microsoft, détection Blue Team, cybersécurité et intelligence artificielle.",
    url: "https://irphan.eu/portfolio/",
    alternate: "https://irphan.eu/en/portfolio/",
  },
  {
    path: "contact",
    language: "fr",
    locale: "fr_FR",
    title: "Contact — Irphanoullah Mohamed Mustapha",
    description: "Contactez Irphanoullah Mohamed Mustapha pour une opportunité en support IT, environnement Microsoft, cybersécurité ou IA.",
    url: "https://irphan.eu/contact/",
    alternate: "https://irphan.eu/en/contact/",
  },
  {
    path: "projets/modern-it-helpdesk-lab",
    language: "fr",
    locale: "fr_FR",
    title: "Modern IT Helpdesk Lab — Support IT & Microsoft | Irphanoullah",
    description: "Étude de cas d’un laboratoire de support IT moderne : Jira Service Management, Microsoft Entra ID, Intune, Microsoft 365, incidents Windows et documentation.",
    url: "https://irphan.eu/projets/modern-it-helpdesk-lab/",
    alternate: "https://irphan.eu/en/projects/modern-it-helpdesk-lab/",
  },
  {
    path: "projets/nginx-soc-detection-lab",
    language: "fr",
    locale: "fr_FR",
    title: "Nginx SOC Detection Lab — Blue Team & Wazuh | Irphanoullah",
    description: "Étude de cas Blue Team : exposition contrôlée Nginx, logs JSON, règles Wazuh, corrélation, hardening et tests automatisés de non-régression.",
    url: "https://irphan.eu/projets/nginx-soc-detection-lab/",
    alternate: "https://irphan.eu/en/projects/nginx-soc-detection-lab/",
  },
  {
    path: "projets/ai-it-support-lab",
    language: "fr",
    locale: "fr_FR",
    title: "AI IT Support Lab — IA appliquée au support IT | Irphanoullah",
    description: "Étude de cas d’un assistant local pour le support IT : documentation prioritaire, RAG, garde-fous, fallback sûr, tests automatisés et validation humaine.",
    url: "https://irphan.eu/projets/ai-it-support-lab/",
    alternate: "https://irphan.eu/en/projects/ai-it-support-lab/",
  },
  {
    path: "en",
    language: "en",
    locale: "en_GB",
    title: "Irphanoullah Mohamed Mustapha — IT, Cybersecurity & AI",
    description: "A human-centered profile with concrete experience and projects in IT support, systems, cybersecurity and AI.",
    url: "https://irphan.eu/en/",
    alternate: "https://irphan.eu/",
  },
  {
    path: "en/about",
    language: "en",
    locale: "en_GB",
    title: "About — Irphanoullah Mohamed Mustapha",
    description: "Experience, certifications and skills in IT support, Microsoft environments, cybersecurity and AI.",
    url: "https://irphan.eu/en/about/",
    alternate: "https://irphan.eu/about/",
  },
  {
    path: "en/portfolio",
    language: "en",
    locale: "en_GB",
    title: "Projects — IT Support, Cybersecurity and AI | Irphanoullah",
    description: "Explore documented projects in Microsoft IT support, Blue Team detection, cybersecurity and artificial intelligence.",
    url: "https://irphan.eu/en/portfolio/",
    alternate: "https://irphan.eu/portfolio/",
  },
  {
    path: "en/contact",
    language: "en",
    locale: "en_GB",
    title: "Contact — Irphanoullah Mohamed Mustapha",
    description: "Contact Irphanoullah Mohamed Mustapha about IT support, Microsoft environments, cybersecurity or AI opportunities.",
    url: "https://irphan.eu/en/contact/",
    alternate: "https://irphan.eu/contact/",
  },
  {
    path: "en/projects/modern-it-helpdesk-lab",
    language: "en",
    locale: "en_GB",
    title: "Modern IT Helpdesk Lab — IT Support & Microsoft | Irphanoullah",
    description: "Case study of a modern IT support lab using Jira Service Management, Microsoft Entra ID, Intune, Microsoft 365 and documented Windows incidents.",
    url: "https://irphan.eu/en/projects/modern-it-helpdesk-lab/",
    alternate: "https://irphan.eu/projets/modern-it-helpdesk-lab/",
  },
  {
    path: "en/projects/nginx-soc-detection-lab",
    language: "en",
    locale: "en_GB",
    title: "Nginx SOC Detection Lab — Blue Team & Wazuh | Irphanoullah",
    description: "Blue Team case study covering controlled Nginx exposure, JSON logs, Wazuh rules, correlation, hardening and automated regression testing.",
    url: "https://irphan.eu/en/projects/nginx-soc-detection-lab/",
    alternate: "https://irphan.eu/projets/nginx-soc-detection-lab/",
  },
  {
    path: "en/projects/ai-it-support-lab",
    language: "en",
    locale: "en_GB",
    title: "AI IT Support Lab — AI for IT Support | Irphanoullah",
    description: "Case study of a local IT support assistant using documentation-first retrieval, RAG, guardrails, safe fallback, automated tests and human validation.",
    url: "https://irphan.eu/en/projects/ai-it-support-lab/",
    alternate: "https://irphan.eu/projets/ai-it-support-lab/",
  },
];

function replaceMeta(html, route) {
  const frenchUrl = route.language === "fr" ? route.url : route.alternate;
  const englishUrl = route.language === "en" ? route.url : route.alternate;
  const alternates = [
    `    <link rel="alternate" hreflang="fr" href="${frenchUrl}" />`,
    `    <link rel="alternate" hreflang="en" href="${englishUrl}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${frenchUrl}" />`,
  ].join("\n");

  return html
    .replace(/<html lang="[^"]*">/, `<html lang="${route.language}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${route.description}" />`)
    .replace(/<meta property="og:locale" content="[^"]*"\s*\/?>/, `<meta property="og:locale" content="${route.locale}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${route.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${route.description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${route.url}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${route.title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${route.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${route.url}" />`)
    .replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/?>/g, "")
    .replace("</head>", `${alternates}\n  </head>`);
}

for (const route of routes) {
  const directory = join(dist, route.path);
  await mkdir(directory, { recursive: true });
  const html = replaceMeta(source, route)
    .replace('<div id="root"></div>', `<div id="root">${renderPage(route.path)}</div>`);
  await writeFile(join(directory, "index.html"), html);
}

const homeHtml = replaceMeta(source, home)
  .replace('<div id="root"></div>', `<div id="root">${renderPage("")}</div>`);
await writeFile(sourcePath, homeHtml);

console.log(`Generated ${routes.length + 1} localized route pages with SEO metadata.`);

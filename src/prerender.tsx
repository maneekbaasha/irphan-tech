import { renderToString } from 'react-dom/server';
import App from './App';
import HelpdeskCaseStudy from './HelpdeskCaseStudy';
import NginxCaseStudy from './NginxCaseStudy';
import AiSupportCaseStudy from './AiSupportCaseStudy';

// Static, readable HTML for crawlers, slow connections and disabled JavaScript.
export function renderPage(path: string) {
  if (path === 'about') return renderToString(<App page="about" />);
  if (path === 'portfolio') return renderToString(<App page="portfolio" />);
  if (path === 'contact') return renderToString(<App page="contact" />);
  const Page = path === 'projets/modern-it-helpdesk-lab' ? HelpdeskCaseStudy
    : path === 'projets/nginx-soc-detection-lab' ? NginxCaseStudy
    : path === 'projets/ai-it-support-lab' ? AiSupportCaseStudy : App;
  return renderToString(<Page />);
}

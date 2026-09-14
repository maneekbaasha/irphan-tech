import { renderToString } from 'react-dom/server';
import App from './App';
import AppEn from './AppEn';
import HelpdeskCaseStudy from './HelpdeskCaseStudy';
import NginxCaseStudy from './NginxCaseStudy';
import AiSupportCaseStudy from './AiSupportCaseStudy';
import HelpdeskCaseStudyEn from './HelpdeskCaseStudyEn';
import NginxCaseStudyEn from './NginxCaseStudyEn';
import AiSupportCaseStudyEn from './AiSupportCaseStudyEn';

// Static, readable HTML for crawlers, slow connections and disabled JavaScript.
export function renderPage(path: string) {
  if (path === 'en') return renderToString(<AppEn />);
  if (path === 'en/about') return renderToString(<AppEn page="about" />);
  if (path === 'en/portfolio') return renderToString(<AppEn page="portfolio" />);
  if (path === 'en/contact') return renderToString(<AppEn page="contact" />);
  if (path === 'en/projects/modern-it-helpdesk-lab') return renderToString(<HelpdeskCaseStudyEn />);
  if (path === 'en/projects/nginx-soc-detection-lab') return renderToString(<NginxCaseStudyEn />);
  if (path === 'en/projects/ai-it-support-lab') return renderToString(<AiSupportCaseStudyEn />);
  if (path === 'about') return renderToString(<App page="about" />);
  if (path === 'portfolio') return renderToString(<App page="portfolio" />);
  if (path === 'contact') return renderToString(<App page="contact" />);
  const Page = path === 'projets/modern-it-helpdesk-lab' ? HelpdeskCaseStudy
    : path === 'projets/nginx-soc-detection-lab' ? NginxCaseStudy
    : path === 'projets/ai-it-support-lab' ? AiSupportCaseStudy : App;
  return renderToString(<Page />);
}

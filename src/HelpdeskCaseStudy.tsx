import { useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const repo = "https://github.com/maneekbaasha/modern-it-helpdesk-lab";

const incidents = [
  {
    id: "IT-1",
    title: "Boucle d’authentification Outlook",
    context: "Après un changement de mot de passe, Outlook demandait sans cesse une nouvelle authentification.",
    diagnosis: "Le nouveau mot de passe fonctionnait ailleurs : le problème venait donc du poste, pas du compte. L’hypothèse retenue était un ancien jeton conservé localement.",
    action: "Suppression des identifiants Office obsolètes dans le Gestionnaire d’identification Windows, redémarrage d’Outlook et nouvelle connexion.",
    result: "Accès rétabli sans réinitialisation supplémentaire du mot de passe.",
    href: `${repo}/blob/main/solutions/IT-1-solution.md`,
  },
  {
    id: "IT-2",
    title: "Onboarding d’une collaboratrice Finance",
    context: "Créer une identité, attribuer les bons accès et préparer un poste Windows géré sans donner de privilèges excessifs.",
    diagnosis: "L’inscription du poste échouait avec l’erreur 80180003. Les journaux et rapports ont orienté l’analyse vers l’autorité MDM du tenant.",
    action: "Groupe Finance, licence, MFA, séparation des comptes administratifs, configuration de l’autorité Intune puis nouvel Entra Join.",
    result: "Identité provisionnée, poste joint à Entra ID et inscrit dans Intune avec le moindre privilège.",
    href: `${repo}/blob/main/solutions/IT-2-solution.md`,
  },
  {
    id: "IT-3",
    title: "Poste Windows non conforme",
    context: "Le pare-feu Microsoft Defender a été désactivé volontairement sur un poste pilote afin de reproduire une dérive de sécurité.",
    diagnosis: "La chronologie Intune et le rapport dédié au pare-feu ont confirmé le passage de conforme à non conforme après la modification.",
    action: "Réactivation du pare-feu, synchronisation du terminal et nouvelle évaluation de la politique de conformité.",
    result: "Retour du terminal à l’état conforme, avec une chaîne de preuve documentée de bout en bout.",
    href: `${repo}/blob/main/solutions/IT-3-solution.md`,
  },
  {
    id: "IT-6",
    title: "Terminal professionnel déclaré perdu",
    context: "Évaluer le risque et choisir l’action Intune adaptée pour un poste Windows d’entreprise potentiellement exposé.",
    diagnosis: "Comparaison documentée de Retire, Wipe et Delete, prise en compte de la propriété du terminal, du dernier check-in et du risque sur les données.",
    action: "Sélection argumentée d’un effacement complet. La commande destructive n’a volontairement pas été exécutée sur la VM réutilisable.",
    result: "Décision d’incident réaliste, contrôlée et traçable, sans prétendre avoir effacé un équipement qui ne l’a pas été.",
    href: `${repo}/blob/main/solutions/IT-6-solution.md`,
  },
];

const method = [
  "Comprendre les symptômes",
  "Déterminer le périmètre",
  "Identifier les changements récents",
  "Formuler une hypothèse",
  "Tester l’hypothèse",
  "Appliquer le changement minimal",
  "Valider le résultat",
  "Documenter la résolution",
];

export default function HelpdeskCaseStudy() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Modern IT Helpdesk Lab — Étude de cas | Irphanoullah";
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <main className="case-page">
      <a className="skip-link" href="#case-content">Aller au contenu</a>

      <header className="case-topbar">
        <a href="/" className="case-back">← Portfolio</a>
        <span>Étude de cas · Support IT</span>
        <ThemeToggle />
      </header>

      <section className="case-hero" id="case-content">
        <div className="case-hero-grid" aria-hidden="true" />
        <div className="case-kicker">Modern IT Helpdesk Lab · 2026</div>
        <h1>Résoudre avec méthode.<br /><em>Documenter pour durer.</em></h1>
        <p className="case-lead">Un laboratoire personnel qui reproduit le cycle de traitement d’incidents et de demandes IT avec Jira Service Management, Microsoft Entra ID, Intune, Microsoft 365 et des postes Windows et macOS.</p>
        <div className="case-actions">
          <a className="pill-button light" href={repo} target="_blank" rel="noreferrer">Explorer le dépôt <span>↗</span></a>
          <a href="#incidents">Voir les incidents ↓</a>
        </div>
        <div className="case-facts">
          <div><span>Rôle</span><strong>Conception & réalisation</strong></div>
          <div><span>Format</span><strong>Laboratoire autonome</strong></div>
          <div><span>Scénarios</span><strong>6 tickets documentés</strong></div>
          <div><span>Environnement</span><strong>Microsoft 365 & endpoints</strong></div>
        </div>
      </section>

      <section className="case-section case-overview">
        <div className="case-number">01 · Contexte</div>
        <div className="case-two-columns">
          <h2>Simuler un support<br /><em>moderne et crédible.</em></h2>
          <div className="case-copy">
            <p className="case-copy-lead">L’objectif n’était pas d’empiler des captures d’outils, mais de reproduire une façon de travailler : qualifier, diagnostiquer, corriger avec prudence et laisser une trace exploitable.</p>
            <p>Chaque exercice part d’un ticket fictif, sépare l’énoncé de la solution et explique les choix effectués. Le laboratoire couvre l’identité, la gestion des terminaux, la conformité, le déploiement logiciel et la réponse à un incident impliquant un équipement perdu.</p>
          </div>
        </div>
        <div className="case-architecture" aria-label="Architecture du laboratoire">
          <div><span>01</span><strong>Utilisateur</strong><small>Demande ou incident</small></div>
          <i>→</i>
          <div><span>02</span><strong>Jira Service Management</strong><small>Qualification & suivi</small></div>
          <i>→</i>
          <div><span>03</span><strong>Entra ID · Intune · M365</strong><small>Diagnostic & action</small></div>
          <i>→</i>
          <div><span>04</span><strong>Endpoint</strong><small>Validation & preuve</small></div>
        </div>
      </section>

      <section className="case-section case-method">
        <div className="case-number">02 · Méthode</div>
        <div className="case-two-columns">
          <h2>Huit étapes.<br /><em>Pas de magie.</em></h2>
          <p className="case-copy-lead">Une procédure simple qui évite deux travers classiques du support débutant : modifier trop de choses à la fois et déclarer un ticket résolu sans validation.</p>
        </div>
        <ol className="method-list">
          {method.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}
        </ol>
      </section>

      <section className="case-section case-incidents" id="incidents">
        <div className="case-number">03 · Incidents sélectionnés</div>
        <div className="case-heading-row">
          <h2>Du symptôme<br /><em>à la preuve.</em></h2>
          <p>Quatre scénarios représentatifs. Les procédures complètes, commandes, décisions et notes de clôture restent consultables dans GitHub.</p>
        </div>
        <div className="incident-list">
          {incidents.map((incident) => (
            <article className="incident-card" key={incident.id}>
              <header><span>{incident.id}</span><h3>{incident.title}</h3></header>
              <div className="incident-grid">
                <div><small>Contexte</small><p>{incident.context}</p></div>
                <div><small>Diagnostic</small><p>{incident.diagnosis}</p></div>
                <div><small>Action</small><p>{incident.action}</p></div>
                <div className="incident-result"><small>Résultat</small><p>{incident.result}</p></div>
              </div>
              <a href={incident.href} target="_blank" rel="noreferrer">Consulter la preuve sur GitHub ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="case-section case-lessons">
        <div className="case-number">04 · Ce que ce projet démontre</div>
        <div className="lesson-grid">
          <div>
            <h2>Compétences<br /><em>mises en pratique.</em></h2>
            <div className="case-chips">
              {["Support utilisateurs", "Jira", "Microsoft 365", "Entra ID", "Intune", "Windows 11", "macOS", "IAM", "Conformité", "Documentation"].map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </div>
          <div className="case-limit">
            <span>Limites assumées</span>
            <h3>Un laboratoire n’est pas une production.</h3>
            <p>Les utilisateurs, l’organisation et les incidents sont fictifs. Certains services reposent sur des essais Microsoft et des machines virtuelles. L’effacement du terminal perdu n’a pas été exécuté afin de préserver la VM.</p>
            <p>Ces limites ne sont pas maquillées : elles permettent de distinguer clairement ce qui a été testé, ce qui a été simulé et ce qui nécessiterait un environnement d’entreprise réel.</p>
          </div>
        </div>
      </section>

      <section className="case-cta">
        <span>Voir les détails techniques</span>
        <h2>Le dépôt contient les six tickets,<br />leurs solutions et la documentation.</h2>
        <div className="case-actions">
          <a className="pill-button light" href={repo} target="_blank" rel="noreferrer">Ouvrir GitHub <span>↗</span></a>
          <a href="/">Retour au portfolio</a>
        </div>
        <footer><span>© 2026 Irphanoullah Mohamed Mustapha</span><a href="#case-content">Retour en haut ↑</a></footer>
      </section>
    </main>
  );
}

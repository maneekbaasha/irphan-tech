# Portfolio UX — September 2026

The portfolio serves recruiters and technical peers: understand the person, inspect
verifiable work, then start a conversation. Preserve the bilingual content, portrait,
project routes, and system-aware theme preference.

The homepage now uses native scrolling and shareable section anchors. Projects follow
the introduction; the Helpdesk project is the primary proof, with documented ticket
examples. About, experience, skills and contact follow. A sticky navigation indicates
the visible section. At narrow widths, an explicit menu replaces the hidden overflow
navigation; Escape closes it and restores focus.

The visual system uses Geist served from the same origin, neutral surfaces and a
restrained warm accent. One entrance animation is reserved for the hero, and respects
reduced motion. Shared styles live in portfolio.css; seven superseded layers were
removed. Case studies share the readable controls and neutral palette.

Native links work without JavaScript. Build-time rendering includes the homepage and
three case studies in their HTML for indexing and slow connections. React adds
language, theme, mobile menu and active-section behavior. Preference storage failures
do not prevent the page from loading. Case-study return links go directly to projects.

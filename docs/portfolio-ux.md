# Portfolio UX — Framer direction, GitHub implementation

The Framer canvas is the visual reference; this React repository remains the source of
truth and Cloudflare Workers remains the host. The site uses four explicit routes:
home, about, portfolio and contact. Existing technical case studies are preserved.

The visual system is deliberately neutral: a paper-white or charcoal background,
large editorial typography, soft grey bento surfaces and one violet focus colour.
The portrait uses neutral studio light without blue or purple illumination. Project
covers and all portraits are stored locally so the production site has no Framer asset
dependency.

The homepage works as a compact map rather than a long sales page. About carries the
story, skills and experience. Portfolio carries the verifiable work. Contact prepares
a structured email locally and never sends personal data to a third-party form service.

Paris time is calculated in the browser with the Europe/Paris time zone. Theme choice
is system-aware and persisted locally. All routes are rendered to static HTML during
the build for indexing, resilient navigation and Cloudflare asset delivery.

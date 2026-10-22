# Secure contact form deployment

This branch replaces the previous `mailto:` contact interaction with `POST /api/contact` on a Cloudflare Worker. **Do not merge/deploy before the configuration below has been completed.** The current production site remains unchanged while this PR is in review.

## Cloudflare + Resend setup

1. Create a Cloudflare Turnstile widget for `irphan.eu` (and `www.irphan.eu` if applicable); set the public widget site key as **build-time** `VITE_TURNSTILE_SITE_KEY` in the build environment. Never store the secret as a `VITE_` variable.
2. Configure the Worker secret `TURNSTILE_SECRET_KEY` in Cloudflare for the Worker `irphan-tech`.
3. Verify a sending domain with Resend and configure `RESEND_API_KEY` as a Worker secret. The sender must be from the verified domain.
4. Set Worker configuration `CONTACT_FROM_EMAIL` (verified sender; e.g. `contact@your-verified-domain.example`) and `CONTACT_TO_EMAIL` (the actual IONOS inbox) **privately**, in Cloudflare dashboard deployment settings. Do not commit these values to GitHub.
5. Confirm the deployment pipeline sets these Worker variables and the frontend build-time site key in the correct places. `wrangler secret put RESEND_API_KEY` and `wrangler secret put TURNSTILE_SECRET_KEY` can be used when deploying through Wrangler; Cloudflare dashboard variables are another option.
6. Deploy to a staging Worker and perform a real successful send. Verify IONOS inbox and reply-to, mobile UX, error handling, and challenge refusal. Check that responses carry the expected security headers.
7. Configure Cloudflare WAF rate limiting for `/api/contact` (e.g. per-IP thresholds appropriate to genuine enquiries). Turnstile plus honeypot are not a substitute for abuse rate limiting.
8. Only after successful staging tests merge and deploy.

## Security notes
- API refuses to send if any of the required environment values is missing (HTTP 503).
- API validates fields server-side, checks Turnstile tokens server-side, and sends mail using an API key not available in browser JavaScript.
- Turnstile public site key is intentionally public; Resend API key and Turnstile *secret* are not.
- The prior personal Gmail address remains accessible in **Git history** (and possibly third-party caches). Removing it from the current source does not retract it from history.
- Receiving an email at IONOS does **not** establish that the former mailto form sent it. Examine that email's full headers to determine delivery route; do not assume compromise.
- Basic anti-spam protection does not guarantee zero spam. Keep logs minimal and avoid storing message contents unnecessarily.
- For stricter abuse control, enforce a request body size cap at the edge and a server-side rate limit.

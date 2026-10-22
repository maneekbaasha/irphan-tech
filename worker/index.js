// Cloudflare Worker: credentials stay in environment secrets, never in client bundles.
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff" } });
const clean = (value, max) => typeof value === "string" ? value.trim().slice(0, max + 1) : "";
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== "/api/contact") return env.ASSETS.fetch(request);
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return json({ error: "Invalid content type" }, 415);
    if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL || !env.TURNSTILE_SECRET_KEY) return json({ error: "Contact temporarily unavailable" }, 503);
    if (Number(request.headers.get("content-length") || 0) > 12000) return json({ error: "Payload too large" }, 413);
    let input;
    try { input = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
    if (!input || typeof input !== "object") return json({ error: "Invalid request" }, 400);
    // Honeypot: legitimate visitors never fill this hidden field.
    if (input.website) return json({ ok: true });
    const name = clean(input.name, 120), email = clean(input.email, 254), need = clean(input.need, 120);
    const exchange = clean(input.exchange, 120), message = clean(input.message, 4000);
    if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !need || need.length > 120 || !exchange || exchange.length > 120 || !message || message.length > 4000) return json({ error: "Invalid fields" }, 400);
    const token = clean(input.turnstileToken, 2048);
    if (!token || token.length > 2048) return json({ error: "Verification required" }, 400);
    const verifyBody = new FormData();
    verifyBody.set("secret", env.TURNSTILE_SECRET_KEY);
    verifyBody.set("response", token);
    verifyBody.set("remoteip", request.headers.get("CF-Connecting-IP") || "");
    let verified;
    try {
      const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: verifyBody });
      verified = response.ok && (await response.json()).success === true;
    } catch { verified = false; }
    if (!verified) return json({ error: "Verification failed" }, 403);
    const content = ["Name: " + name, "Email: " + email, "Need: " + need, "Exchange: " + exchange, "", message].join("\n");
    try {
      const sent = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": "Bearer " + env.RESEND_API_KEY, "content-type": "application/json" },
        body: JSON.stringify({ from: env.CONTACT_FROM_EMAIL, to: [env.CONTACT_TO_EMAIL], reply_to: email, subject: "irphan.eu — " + need, text: content })
      });
      if (!sent.ok) return json({ error: "Delivery unavailable" }, 502);
      return json({ ok: true });
    } catch { return json({ error: "Delivery unavailable" }, 502); }
  }
};

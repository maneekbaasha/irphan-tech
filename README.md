# irphan.eu

Mon Portfolio présentant mon histoire, mon expérience et mes réalisations en support IT, systèmes, cybersécurité et intelligence artificielle.

## Développement local

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
```

Le résultat statique est généré dans `dist/` et peut être déployé sur Cloudflare Pages, Netlify ou tout hébergeur de fichiers statiques.

## Déploiement Cloudflare Pages

- Commande de build : `npm run build`
- Dossier de sortie : `dist`
- Branche de production : `main`

Les en-têtes de sécurité sont définis dans `public/_headers`.

## Introduction CRT

Une introduction CRT apparaît sur `/` et `/en` une fois par session. Le paramètre `?intro=1` permet de la rejouer. L'écran est calibré sur le PNG complet ; le design et le portfolio existants restent inchangés, l'introduction étant uniquement un portail côté client.

Un clic déclenche un crépitement synthétisé et une transition hyperdrive de 1,3 seconde. Le bouton « Skip » ou la touche Échap permettent d'entrer directement. Avec `prefers-reduced-motion`, l'entrée est immédiate et sans son.

Validation : `npm run check` a réussi. La vérification visuelle et audio dans le navigateur n'a pas été effectuée, le téléchargement de Chromium étant indisponible.

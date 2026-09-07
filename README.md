# irphan.eu

Portfolio professionnel d’Irphanoullah Mohamed Mustapha, présentant son histoire, son expérience et ses réalisations en support IT, systèmes, cybersécurité et intelligence artificielle.

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

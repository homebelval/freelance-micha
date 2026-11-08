# Huxa Conseil — Portfolio de Michaël Belval

Landing page portfolio (fichier unique `index.html`, sans dépendance ni build).
En ligne sur **https://conseil.huxa.io**

## Mise en ligne (GitHub Pages + domaine personnalisé)

1. **DNS** — chez le registrar de `huxa.io`, ajouter :

   | Type  | Nom       | Valeur                  |
   |-------|-----------|-------------------------|
   | CNAME | `conseil` | `homebelval.github.io.` |

2. **GitHub** — Settings → Pages :
   - Source : « Deploy from a branch », branche contenant `index.html`, dossier `/ (root)`
   - Custom domain : `conseil.huxa.io` (déjà renseigné via le fichier `CNAME`)
   - Une fois le certificat émis, cocher **Enforce HTTPS**

3. (Recommandé) Settings → Pages → vérifier le domaine `huxa.io` pour éviter qu'un tiers puisse le revendiquer.

La propagation DNS prend de quelques minutes à quelques heures.

## Personnaliser

Tout se règle en haut du `<script>` de `index.html` :

- `BOOKING_URL` : lien de prise de rendez-vous (Microsoft Bookings).
- `TESTIMONIALS` : recommandations. Tant que la liste est vide, la section reste masquée.
  Format : `{q:"Texte", n:"Prénom Nom", r:"Fonction, Entreprise"}`.
- `QA` : questions / réponses de l'assistant « Une question ? » (réponses préparées, sans IA ni envoi de données).

Les articles de la section Notes sont dans `notes/`. Penser à ajouter chaque nouvel article dans `sitemap.xml`.
L'image de partage (LinkedIn, WhatsApp…) est `og-image.jpg` (1200×630).

## Version anglaise

- `index.html` (FR) et `en/index.html` (EN) partagent `styles.css` (mise en forme) et `app.js` (interactions).
- Les textes propres à chaque langue (sujets, assistant, calculateur…) sont dans le bloc `window.SITE` en bas de chaque page.
- Après une modification de la page française, regénérer la page anglaise :

  ```bash
  python3 tools/i18n/build_en.py
  ```

  Le script signale les textes français sans traduction : les ajouter dans `tools/i18n/tr.py` (textes de la page) ou `tools/i18n/site_en.js` (textes dynamiques).
- Les articles (`notes/`) et les pages légales restent en français ; la version anglaise y renvoie avec la mention « in French » / « (FR) ».

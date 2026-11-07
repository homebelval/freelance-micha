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

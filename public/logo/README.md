# Logos officiels

Déposez ici les assets de marque officiels :

- **navicon** – logo pour la barre de navigation (ex. `navicon.svg`, `navicon.png`)
- **favicon** – icône d’onglet navigateur (ex. `favicon.png`, `favicon.ico`)
- **og-image** – image pour le partage social (ex. `og-image.png`)
- Autres variantes (logo clair, sombre, compact, etc.)

Fichiers servis sous `/logo/`, ex. : `/logo/navicon.png`, `/logo/favicon.png`.

---

## Logo dans les résultats Google

Pour que **votre logo s’affiche à côté du lien** (au lieu de l’icône globe) :

1. **Favicon sur le site**
   - Gardez `favicon.png` dans ce dossier (`public/logo/favicon.png`) — déjà utilisé par le site.
   - **Recommandé** : ajoutez aussi un **favicon.ico** à la racine du site. Google le demande souvent en priorité.
     - Créez un fichier 48×48 px (ou 32×32) au format ICO (ex. via [favicon.io](https://favicon.io) ou [realfavicongenerator.net](https://realfavicongenerator.net)).
     - Placez-le dans **`public/favicon.ico`** (à la racine de `public/`, pas dans `logo/`).
     - Il sera servi à l’URL : `https://votredomaine.com/favicon.ico`.

2. **Vérifier que le favicon est bien servi**
   - Ouvrez `https://votredomaine.com/logo/favicon.png` et `https://votredomaine.com/favicon.ico` dans le navigateur : les images doivent s’afficher.

3. **Google Search Console**
   - Ajoutez la propriété du site dans [Google Search Console](https://search.google.com/search-console).
   - Demandez une réindexation de la page d’accueil si besoin.
   - L’affichage du favicon peut prendre **quelques jours à quelques semaines** après la prise en compte par Google.

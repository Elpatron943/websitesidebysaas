# SEO et rendu des pages (indexation Google)

## Règle pour les nouvelles pages

**Toute page dont le contenu principal doit être indexé par Google doit être un Server Component** (pas `'use client'`), avec les données chargées côté serveur.

- Si la page affiche d’abord « Chargement… » puis du contenu après un `fetch()` dans un `useEffect`, le HTML initial ne contient pas l’article/liste : **Google peut mal indexer ou ne pas indexer le contenu**.
- En rendu serveur, le contenu est présent dans le premier HTML, donc **indexable correctement**.

## Pages déjà en Server Component (contenu dans le HTML initial)

- `app/[locale]/(commercial)/blog/page.tsx` — liste des articles (getBlogPosts)
- `app/[locale]/(commercial)/blog/[slug]/page.tsx` — article (getBlogPostBySlug)
- `app/[locale]/page.tsx` — accueil (texte statique via i18n, rendu SSR)
- `app/[locale]/(commercial)/contact/page.tsx` — formulaire + texte statique (SSR)
- `app/[locale]/(commercial)/editeur/page.tsx` — texte statique (SSR)
- `app/[locale]/(commercial)/acheteur/page.tsx` — client (calculs, formulaires) ; le texte statique est tout de même rendu au premier paint.
- Pages secteurs/directions : Server Components avec `generateStaticParams`.

## Checklist pour une nouvelle page à indexer

1. **Éviter** `'use client'` si la page est principalement informative (article, liste, fiche).
2. **Charger les données** dans la page (async, `getBlogPosts`, API interne, etc.) **côté serveur**, pas dans un `useEffect`.
3. **Exporter `generateMetadata`** pour `title` et `description` (SEO).
4. Si la page est dynamique (`[slug]`, etc.), **exporter `generateStaticParams`** pour pré-générer les URLs au build (optionnel mais recommandé).
5. Ajouter les nouvelles URLs au **sitemap** (`app/sitemap.ts`) si ce sont des pages importantes.

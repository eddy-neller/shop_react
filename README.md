## E.N Shop Next.js – Frontend e‑commerce avec Next.js 15 & TypeScript

E.N Shop React est le **frontend e‑commerce** du projet E.N Shop, construit avec **Next.js 15**, **TypeScript** et **Tailwind CSS**.  
Comme pour `en_shop_api`, ce dépôt est pensé comme un **projet portfolio** qui montre une approche moderne du front : architecture claire, typage strict, UX soignée et intégration propre avec une API backend.

---

## 🎯 Objectifs du projet

- **Montrer la maîtrise de Next.js 15 (App Router) et TypeScript 5** pour un front moderne, SSR/SPA hybride.
- **Illustrer une architecture front claire** : séparation des features, composants UI, couches d’accès API, providers, schémas, types.
- **Mettre en avant des bonnes pratiques de qualité** : ESLint, Prettier, TypeScript strict, gestion d’état/remote data propre.
- **S’intégrer dans l’écosystème complet** : backend Symfony/API Platform (`en_shop_api`) + éventuelle interface d’admin.

En résumé : ce repo illustre comment je conçois un **front e‑commerce maintenable** au-dessus d’une vraie API métier.

---

## 🧩 Rôle du frontend dans l’écosystème

E.N Shop Next.js fournit :

- L’**interface utilisateur** du shop (parcours visiteur/utilisateur).
- La **consommation de l’API** `en_shop_api` (auth, profil, future gestion de catalogue, etc.).
- La **gestion de l’authentification** côté front (NextAuth + JWT) avec synchronisation des tokens et du profil.
- Une **base UX/UI** réutilisable (design system léger, composants accessibles, thèmes).

Le frontend est pensé pour rester **faiblement couplé** au backend :  
les URLs d’API, de statiques et de site sont injectées via les variables d’environnement, pas hardcodées dans le code.

---

## 🛠️ Stack technique & outils

- **Next.js 15** + **React 18** pour une application performante et une DX rapide.
- **TypeScript 5** avec configuration stricte.
- **Tailwind CSS 3**, **Sass**, **Radix UI**, **shadcn-style components** et **lucide-react** pour la couche UI.
- **NextAuth** avec provider Credentials (intégration JWT backend)
- **TanStack Query 5** pour les requêtes, le cache serveur et les états de chargement.
- **React Hook Form** + **Zod** + `@hookform/resolvers` pour les formulaires typés
- **Axios** avec client HTTP centralisé, intercepteurs, token JWT et gestion des erreurs 401.
- Outils qualité :
  - **ESLint 9** avec règles React, Hooks, Refresh et TypeScript.
  - **Prettier** pour un formatage cohérent.
  - **Husky** pour préparer les hooks Git.

Ces choix visent un front **proche de la production** : DX agréable, typage fort, base solide pour grandir.

---

## 📁 Architecture du projet

Le projet suit une organisation orientée “features” et couches partagées :

- `src/app/` : **App Router** Next.js (pages, layouts, routing).
- `src/features/` : **features métier** (ex : `Auth`, `User`, etc.) avec :
  - `components/` : composants spécifiques à la feature.
  - `services/` : appels API liés à la feature.
  - `hooks/` : hooks métier (ex : `useLogout`).
  - `schemas/` : schémas Zod pour cette feature.
  - `types/` : types dédiés à la feature.
- `src/components/` : **composants UI génériques** (design system).
- `src/lib/` :
  - `api/` : clients HTTP (`httpClient`, `serverApiClient`).
  - `metadata.ts` : métadonnées globales (SEO, OpenGraph…).
  - `utils/` : helpers partagés (erreurs, formats, etc.).
- `src/providers/` : **providers globaux** (QueryClient, thèmes, NextAuth, etc.).
- `src/schemas/` / `src/types/` : schémas et types transverses.

**Décision technique (en clair)** :  
je sépare les **features** (Auth, User, etc.) de l’**infra front** (`lib`, `providers`, `components`) pour garder un code lisible, testable et facilement extensible.

---

## 🚀 Démarrage rapide

### Prérequis

- **Node.js 18+**
- **npm**
- **Git**

### Installation

Depuis la racine du projet :

```bash
git clone <repository-url>
cd <dir>
npm install
```

### Configuration des variables d’environnement

Crée un fichier `.env.local` à la racine du projet (non versionné, voir `.gitignore`) avec par exemple :

```env
# URL de l'API backend (en général en_shop_api)
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# URL de base pour les assets statiques (images, fichiers uploadés)
# Si non définie, elle peut être dérivée de NEXT_PUBLIC_API_URL côté code
NEXT_PUBLIC_STATIC_URL=http://localhost:8000

# URL publique du front pour NextAuth (adaptée à ton port)
NEXTAUTH_URL=http://localhost:3001

# Secret NextAuth (ne jamais committer une vraie valeur)
NEXTAUTH_SECRET=votre-secret-tres-securise-ici
```

**Pourquoi cette approche ?**  
Toutes les URLs et secrets sensibles restent dans l’**environnement** et ne sont jamais committés dans Git.

Pour générer un `NEXTAUTH_SECRET` sécurisé :

```bash
openssl rand -base64 32
```

### Lancement du serveur de développement

```bash
npm run dev
```

Par défaut, l’application est accessible sur `http://localhost:4000` (voir `package.json` si tu ajustes le port).

---

## 📝 Scripts disponibles

- `npm run dev` : démarre le serveur de développement.
- `npm run build` : build de production Next.js.
- `npm run start` : démarre le serveur en mode production.
- `npm run lint` : exécute ESLint.
- `npm run format` : formate le code avec Prettier.
- `npm run format:check` : vérifie le formatage.

---

## ✅ Qualité de code & bonnes pratiques

- **TypeScript strict** pour limiter les erreurs de contrat entre composants, API et formulaires.
- **ESLint** avec les règles Next.js + TypeScript.
- **Prettier** pour un formatage cohérent.
- **Design orienté DRY & KISS** : composants réutilisables, logique partagée dans `lib` et `features`.

**Objectif** : un front **prêt pour la production**, sans dette technique évidente, et facile à faire évoluer.

---

## 📄 Licence / type de projet

Ce dépôt est utilisé comme **projet de portfolio** pour illustrer un frontend e‑commerce moderne.  
Il peut être librement consulté et utilisé comme **référence technique** (structure, patterns, organisation du code).  
Si une licence formelle (ex. MIT, alignée sur `en_shop_api`) est ajoutée, elle sera indiquée dans un fichier `LICENSE` dédié.

---

## 👤 À propos du développeur

Ce projet fait partie d’un **portfolio full‑stack** autour d’E.N Shop :  
il complète `en_shop_api` (backend Symfony/API Platform) et prépare le terrain pour une future interface d’admin.  
L’objectif est de montrer ma manière de :

- concevoir une **expérience utilisateur** moderne au-dessus d’une vraie API,
- structurer un **front Next.js** maintenable,
- intégrer de façon propre les préoccupations **auth, état, qualité et DX**.

N’hésite pas à parcourir les autres dépôts associés pour avoir une vision complète de l’écosystème.

# Shop - E-commerce Next.js

Projet e-commerce moderne développé avec Next.js 16, TypeScript et Tailwind CSS. Ce projet a été conçu pour démontrer les compétences en développement web moderne, avec une architecture propre, du code maintenable et des bonnes pratiques.

## 🚀 Technologies utilisées

- **Next.js 15** - Framework React avec App Router
- **TypeScript 5** - Typage statique pour une meilleure maintenabilité
- **Tailwind CSS 3** - Framework CSS utility-first
- **NextAuth.js** - Authentification et gestion de sessions
- **React Hook Form** - Gestion performante des formulaires
- **Zod** - Validation de schémas TypeScript-first
- **TanStack Query** - Gestion des requêtes et du cache
- **ESLint** - Linting du code
- **Prettier** - Formatage automatique du code

## 📋 Prérequis

- Node.js 18+ et npm
- Git

## 🛠️ Installation

1. Cloner le projet (si nécessaire) :

```bash
git clone <repository-url>
cd endevelop_shop
```

2. Installer les dépendances :

```bash
npm install
```

3. Configurer les variables d'environnement :

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# URL de l'API backend
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# URL de base pour les assets statiques (images, fichiers uploadés)
# Si non définie, sera dérivée de NEXT_PUBLIC_API_URL en retirant /api
NEXT_PUBLIC_STATIC_URL=http://localhost:8000

# NextAuth.js
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=votre-secret-tres-securise-ici
```

**Note** : Pour générer un `NEXTAUTH_SECRET` sécurisé, vous pouvez utiliser :

```bash
openssl rand -base64 32
```

4. Démarrer le serveur de développement :

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
endevelop_shop/
├── app/                    # App Router (Next.js 14+)
│   ├── layout.tsx         # Layout principal avec Header et Footer
│   ├── page.tsx           # Page d'accueil
│   ├── contact/
│   │   └── page.tsx       # Page de contact avec formulaire
│   └── globals.css        # Styles globaux et variables de thème
├── components/            # Composants réutilisables
│   ├── ui/               # Composants UI de base
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   └── Card.tsx
│   └── layout/           # Composants de layout
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/                  # Utilitaires et helpers
│   └── validation.ts     # Schémas de validation Zod
├── types/                # Types TypeScript
│   └── index.ts
└── public/               # Assets statiques
```

## 🎨 Fonctionnalités

### Page d'accueil

- Hero section avec message d'accueil
- Section produits en vedette (données mockées)
- Section "Pourquoi nous choisir" avec valeurs
- Design moderne et responsive

### Page de contact

- Formulaire de contact avec validation complète
- Validation côté client avec Zod et React Hook Form
- Gestion des erreurs et messages de succès
- Informations de contact supplémentaires

### Composants réutilisables

- **Button** : Bouton avec variantes (primary, secondary, outline)
- **Input** : Champ de formulaire avec label et gestion d'erreurs
- **Textarea** : Zone de texte avec validation
- **Card** : Carte pour afficher les produits

## 📝 Scripts disponibles

- `npm run dev` - Démarrer le serveur de développement
- `npm run build` - Créer un build de production
- `npm run start` - Démarrer le serveur de production
- `npm run lint` - Vérifier le code avec ESLint

## 🎯 Bonnes pratiques appliquées

- **TypeScript strict** : Configuration TypeScript stricte, pas d'utilisation de `any`
- **DRY (Don't Repeat Yourself)** : Code réutilisable et composants modulaires
- **KISS (Keep It Simple, Stupid)** : Solutions simples et efficaces
- **Composants réutilisables** : Architecture modulaire avec composants UI
- **Validation robuste** : Validation de formulaires avec Zod
- **Accessibilité** : Labels, rôles ARIA, navigation au clavier
- **SEO** : Metadata optimisée pour les moteurs de recherche
- **Responsive Design** : Design mobile-first avec Tailwind CSS

## 🔧 Configuration

### TypeScript

Le projet utilise une configuration TypeScript stricte pour garantir la qualité du code et éviter les erreurs à l'exécution.

### ESLint

Configuration ESLint avec les règles Next.js pour maintenir un code cohérent.

### Prettier

Configuration Prettier pour un formatage automatique et cohérent du code.

## 📦 Dépendances principales

- `next` - Framework React
- `react` & `react-dom` - Bibliothèque React
- `typescript` - Typage statique
- `tailwindcss` - Framework CSS
- `react-hook-form` - Gestion de formulaires
- `zod` - Validation de schémas
- `@hookform/resolvers` - Résolveurs pour React Hook Form

## 🚢 Déploiement

Le projet peut être déployé sur différentes plateformes :

- **Vercel** (recommandé pour Next.js) : [Documentation](https://vercel.com/docs)
- **Netlify** : [Documentation](https://docs.netlify.com/)
- **Autres plateformes** : Suivre la documentation Next.js pour le déploiement

## 📄 Licence

Ce projet est un exemple de portfolio et peut être utilisé comme référence pour vos propres projets.

## 👤 Auteur

Développé dans le cadre d'un portfolio professionnel pour démontrer les compétences en développement web moderne.

---

**Note** : Ce projet est en constante évolution. N'hésitez pas à proposer des améliorations ou à signaler des problèmes.

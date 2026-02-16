# RemindR

Application web de prévention santé qui aide les particuliers et les professionnels à mieux gérer la santé au quotidien : rappels de rendez-vous, suivi des proches, questionnaire santé et tableau de bord personnalisé.

**Slogan :** _Simplifions la santé du quotidien, pour tous._

---

## À propos du projet

RemindR s’adresse à deux types d’utilisateurs :

- **Particuliers** — Gérer sa santé et celle de ses proches : rappels (vaccins, contrôles, dépistages), calendrier santé, partage avec la famille, tableau de bord personnalisé.
- **Professionnels** — Mutuelles, assurances santé et organismes de prévoyance : renforcer la prévention des adhérents, démos et contact dédiés.

Fonctionnalités principales côté particulier : questionnaire santé (mesures, maladies, habitudes), tableau de bord avec rappels recommandés, calendrier, espace « Mes proches et moi », mon compte (paramètres, notifications, contrat, contact), magazine, newsletter et chat d’aide.

---

## Stack technique

- **Framework :** [Next.js](https://nextjs.org) 16 (App Router)
- **UI :** React 19, [Tailwind CSS](https://tailwindcss.com) 4
- **Auth :** [Better Auth](https://www.better-auth.com) (configuration prête, service personnalisé utilisé côté API)
- **Icônes :** [Tabler Icons](https://tabler.io/icons) (React)
- **Langage :** TypeScript

---

## Prérequis

- Node.js (version supportée par Next.js 16)
- `npm`, `yarn`, `pnpm` ou `bun`

---

## Installation et lancement

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrir l’application dans le navigateur : [http://localhost:3000](http://localhost:3000) ou [http://localhost:3001](http://localhost:3001) selon que l’API Remindr tourne aussi ou non (le port 3001 est utilisé lorsque le port 3000 est déjà pris).

### Autres commandes

| Commande        | Description           |
| --------------- | --------------------- |
| `npm run build` | Build de production   |
| `npm run start` | Serveur de production |
| `npm run lint`  | Vérification ESLint   |

---

## Structure du projet (aperçu)

- **`src/app/`** — Routes et pages (App Router)
  - **`(landing)/`** — Pages d’accueil : particuliers, professionnels, magazine
  - **`(connexion)/`** — Connexion, inscription, vérification, activation
  - **`(private)/`** — Espace connecté (protégé)
    - **`dashboard/`** — Tableau de bord, calendrier, mon compte, mes proches, magazine
    - **`mon-questionnaire-sante/`** — Questionnaire santé (mesures, maladies, habitudes)
- **`src/app/components/`** — Composants (atoms, molecules, organisms)
- **`src/lib/`** — Auth (client, provider, service), configuration
- **`src/app/api/`** — Routes API (auth, chat, newsletter)
- **`src/proxy.ts`** — Logique de redirection pour les routes protégées (`/dashboard`, `/connexion`)

---

## Variables d’environnement

En fonction de votre déploiement, vous pouvez avoir besoin de variables pour :

- L’API d’authentification (backend)
- Mailjet (newsletter, emails)
- Toute API externe utilisée par l’app

Créer un fichier `.env.local` à la racine du projet et y ajouter les clés nécessaires (voir la doc Next.js sur [Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)).

---

## Déploiement

Le déploiement se fait via [Vercel](https://vercel.com) :

- **Production** — branche `main`
- **Pré-production** — branche `develop`

---

## Documentation Next.js

- [Documentation Next.js](https://nextjs.org/docs)
- [Tutoriel Learn Next.js](https://nextjs.org/learn)

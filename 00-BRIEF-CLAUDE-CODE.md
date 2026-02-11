# 📋 Brief Complet pour Claude Code - Application QCM

## 🎯 Objectif du Projet

Créer une application web React pour des quiz de culture générale (préparation concours gardien de la paix), avec :
- Fichiers .md contenant les questions stockés dans `/public/qcm/`
- Sélection aléatoire d'un fichier QCM au démarrage
- Interface interactive avec feedback immédiat
- Scoring et résultats finaux
- Déploiement sur GitHub Pages (100% statique)

---

## 🏗️ Architecture Technique

### Stack
- **Framework** : React 18+ avec Vite
- **Langage** : JavaScript (ES6+)
- **Styling** : TailwindCSS
- **Icons** : lucide-react
- **Parsing MD** : Parser custom (regex) pour format spécifique
- **Build** : Vite (output statique)
- **Hébergement** : GitHub Pages

### Structure de Projet
```
qcm-gardien-paix/
├── public/
│   └── qcm/
│       ├── qcm-1.md
│       ├── qcm-2.md
│       └── qcm-3.md
├── src/
│   ├── components/
│   │   ├── QuizSelector.jsx
│   │   ├── QuizQuestion.jsx
│   │   ├── QuizResults.jsx
│   │   └── QuizHeader.jsx
│   ├── utils/
│   │   ├── markdownParser.js
│   │   └── quizManager.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── README.md
```

---

## 📝 Format des Fichiers .md

### Structure Markdown
```markdown
### Question 1

Texte de la question ?

- [ ] **a.** Réponse A
- [ ] **b.** Réponse B
- [ ] **c.** Réponse C

**✅ Réponse correcte : b**
📎 Source : [Titre du lien](https://url-source.com)
💡 Explication : Texte d'explication détaillé.

---

### Question 2
...
```

### Règles de Parsing
- Chaque question commence par `### Question N`
- Options : format `- [ ] **lettre.** texte`
- Réponse correcte : `**✅ Réponse correcte : lettre**`
- Source : `📎 Source : [texte](url)` ou `📎 Source : texte`
- Explication : `💡 Explication : texte`
- Séparateur : `---` entre questions

---

## 🚀 Commandes de Démarrage Rapide

```bash
# 1. Créer le projet Vite
npm create vite@latest qcm-gardien-paix -- --template react
cd qcm-gardien-paix

# 2. Installer les dépendances
npm install
npm install -D tailwindcss postcss autoprefixer
npm install lucide-react
npm install --save-dev gh-pages

# 3. Initialiser Tailwind
npx tailwindcss init -p

# 4. Créer la structure de dossiers
mkdir -p src/components src/utils public/qcm

# 5. Copier tous les fichiers depuis la documentation

# 6. Tester en local
npm run dev

# 7. Build de production
npm run build

# 8. Déploiement GitHub Pages
npm run deploy
```

---

## 🎯 Checklist de Validation

- [ ] Application se lance avec `npm run dev`
- [ ] Fichiers .md sont bien chargés depuis `/public/qcm/`
- [ ] Sélection aléatoire fonctionne
- [ ] Parsing des questions est correct
- [ ] Interface affiche les questions
- [ ] Feedback visuel sur bonne/mauvaise réponse
- [ ] Sources sont cliquables
- [ ] Score est comptabilisé correctement
- [ ] Écran de résultat s'affiche
- [ ] Build production fonctionne (`npm run build`)
- [ ] Déploiement GitHub Pages réussi

---

## 📚 Documentation Complète

**Voir les autres fichiers pour le code détaillé :**
- `01-package.json` - Configuration npm
- `02-vite.config.js` - Configuration Vite
- `03-tailwind.config.js` - Configuration Tailwind
- `04-utils-markdownParser.js` - Parser de markdown
- `05-utils-quizManager.js` - Gestion des quiz
- `06-components-QuizHeader.jsx` - Composant en-tête
- `07-components-QuizQuestion.jsx` - Composant question
- `08-components-QuizResults.jsx` - Composant résultats
- `09-App.jsx` - Application principale
- `10-autres-fichiers.md` - index.html, main.jsx, index.css
- `11-deploiement-github.md` - Guide complet de déploiement

---

**VERSION : 1.0**  
**DATE : 11 février 2026**  
**AUTEUR : Brief créé avec Claude (Anthropic)**

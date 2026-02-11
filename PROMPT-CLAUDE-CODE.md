# 🚀 PROMPT POUR CLAUDE CODE

Copiez-collez ce texte directement dans Claude Code pour créer l'application automatiquement.

---

## Prompt à utiliser

```
Bonjour Claude Code,

Je veux créer une application web React de QCM (Quiz à Choix Multiples) pour la préparation au concours de gardien de la paix.

OBJECTIF :
- Application React avec Vite
- Questions stockées dans des fichiers .md dans /public/qcm/
- Sélection aléatoire d'un QCM au démarrage
- Interface interactive avec feedback immédiat
- Scoring et résultats finaux
- Déploiement sur GitHub Pages (100% statique)

STACK TECHNIQUE :
- React 18 + Vite
- TailwindCSS pour le styling
- lucide-react pour les icônes
- Parser custom pour les fichiers markdown
- gh-pages pour le déploiement

STRUCTURE DU PROJET :
qcm-gardien-paix/
├── public/
│   └── qcm/
│       ├── qcm-1.md
│       ├── qcm-2.md
│       └── qcm-3.md
├── src/
│   ├── components/
│   │   ├── QuizHeader.jsx
│   │   ├── QuizQuestion.jsx
│   │   └── QuizResults.jsx
│   ├── utils/
│   │   ├── markdownParser.js
│   │   └── quizManager.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html

FORMAT DES FICHIERS .MD :
Les fichiers QCM suivent ce format :

```markdown
### Question 1

Texte de la question ?

- [ ] **a.** Réponse A
- [ ] **b.** Réponse B
- [ ] **c.** Réponse C

**✅ Réponse correcte : b**
📎 Source : [Titre](https://url.com)
💡 Explication : Texte explicatif.

---

### Question 2
...
```

FONCTIONNALITÉS À IMPLÉMENTER :

1. **Parser Markdown** (src/utils/markdownParser.js)
   - Parse les fichiers .md selon le format ci-dessus
   - Extrait : question, options, réponse correcte, source, explication
   - Retourne un tableau d'objets question

2. **Quiz Manager** (src/utils/quizManager.js)
   - loadAvailableQuizzes() : liste des QCM disponibles
   - loadQuiz(filename) : charge un QCM spécifique
   - loadRandomQuiz() : sélectionne et charge un QCM aléatoire

3. **Composants React** :
   - **QuizHeader** : Affiche progression (Question X/Y, Score, barre de progression)
   - **QuizQuestion** : 
     * Affiche une question avec ses options
     * Gère la sélection de réponse
     * Affiche feedback visuel (vert si correct, rouge si incorrect)
     * Montre l'explication et la source après réponse
     * Bouton "Question suivante"
   - **QuizResults** : 
     * Affiche le score final (X/Y et pourcentage)
     * Commentaire personnalisé selon le score
     * Boutons "Recommencer" et "Nouveau QCM"

4. **App.jsx** :
   - Charge un QCM aléatoire au démarrage
   - Gère l'état : question actuelle, score, progression
   - Navigue entre les questions
   - Affiche écran de chargement / erreur / quiz / résultats

DESIGN :
- Interface moderne avec Tailwind
- Couleurs : indigo/blue pour le thème principal
- Vert pour bonnes réponses, rouge pour mauvaises
- Dégradé d'arrière-plan : from-blue-50 to-indigo-100
- Cards avec ombres (shadow-lg, shadow-xl)
- Animations fluides (transitions)
- Responsive design

CONFIGURATION IMPORTANTE :
Dans vite.config.js, définir :
```javascript
base: '/qcm-gardien-paix/'  // Pour GitHub Pages
```

DÉPENDANCES :
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "gh-pages": "^6.1.1",
    "vite": "^5.4.2"
  }
}
```

SCRIPTS NPM :
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

COMPORTEMENTS SPÉCIFIQUES :
- Après avoir répondu à une question, l'utilisateur voit immédiatement si c'est correct
- Les sources doivent être des liens cliquables (ouvrir dans nouvel onglet)
- Auto-advance vers question suivante après 2 secondes (ou bouton manuel)
- Écran de chargement pendant le fetch des fichiers .md
- Gestion d'erreurs si un fichier ne charge pas

Peux-tu créer cette application complète avec tous les fichiers nécessaires ?

Assure-toi que :
1. Le parser markdown fonctionne avec le format spécifié
2. L'interface est moderne et intuitive
3. Le code est propre et commenté
4. Tous les fichiers de config sont corrects
5. L'application est prête pour le déploiement GitHub Pages

Merci !
```

---

## Notes pour Claude Code

Si Claude Code demande des précisions :

1. **Pour le parser** : Utiliser des regex pour extraire les différentes parties
2. **Pour le design** : Suivre les exemples d'interfaces modernes avec Tailwind
3. **Pour les états** : Utiliser useState et useEffect
4. **Pour les fichiers** : fetch() depuis /qcm/ pour charger les .md

---

## Fichiers de Référence

Si Claude Code a besoin d'exemples précis, référez-vous aux fichiers :
- `04-utils-markdownParser.js` - Code du parser
- `05-utils-quizManager.js` - Code du manager
- `06-07-08-components-*.jsx` - Code des composants
- `09-App.jsx` - Code de l'application principale

---

## Alternative : Prompt Court

Si vous voulez un prompt plus concis :

```
Crée une application React de QCM avec :
- Vite + React + TailwindCSS
- Questions en .md dans /public/qcm/ (format spécifique avec options a/b/c)
- Parser markdown pour extraire questions/réponses/sources
- Sélection aléatoire de QCM
- Interface interactive : feedback immédiat, progression, scoring
- Déploiement GitHub Pages ready

Tous les détails sont dans le dossier qcm-project-docs/ si besoin.
```

---

**Bonne création ! 🎉**

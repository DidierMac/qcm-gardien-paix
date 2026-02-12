# Documentation pour Claude - Projet QCM Gardien de la Paix

> **⚠️ CE FICHIER EST POUR CLAUDE (l'IA), PAS POUR UN HUMAIN**
>
> Contient le contexte non-évident, les décisions prises, les erreurs à éviter et la "mémoire institutionnelle" du projet.

---

## 🎯 Contexte du Projet (Ce qui n'est pas évident)

### Utilisateur Final
- **Bérengère** prépare le concours de Gardien de la Paix
- Elle a besoin de s'entraîner avec des QCM actualisés (2024-2026)
- **Didier** maintient le projet pour elle

### Pourquoi ce projet existe
- Application React déjà créée et déployée
- L'objectif principal maintenant = **générer de nouveaux QCM** au format correct
- Les QCM sont au format Markdown dans `/public/qcm/`
- L'app React lit dynamiquement ces fichiers .md

---

## 📊 Architecture Technique (Pour comprendre le contexte)

### Stack
- **Frontend** : React 18 + Vite + TailwindCSS
- **Hébergement** : GitHub Pages (statique)
- **QCM** : Fichiers Markdown dans `/public/qcm/`
- **Parsing** : Parser custom JavaScript (regex) côté client

### Comment ça marche
1. L'application React charge aléatoirement un fichier QCM depuis `/public/qcm/`
2. Le parser extrait les questions, options, réponses, sources
3. L'utilisateur répond question par question
4. Score calculé en temps réel
5. Écran de résultats à la fin

**⚠️ Point clé** : L'app est déjà fonctionnelle. Le travail de Claude = créer de nouveaux fichiers QCM au bon format.

---

## 🔑 Fichiers Importants et Leur Rôle

### Fichiers pour Claude (génération de QCM)

1. **`generation-de-qcm.md`** ⭐ **FICHIER LE PLUS IMPORTANT**
   - Prompt complet pour générer un QCM
   - Répartition thématique **STRICTE** (11+4+8+7+3+2+4+1 = 40)
   - Checklist de vérification obligatoire
   - **TOUJOURS lire ce fichier avant de générer un QCM**

2. **`CLAUDE.md`** (ce fichier)
   - Contexte rapide du projet
   - Référence à la répartition thématique
   - Workflow simplifié

3. **`FORMAT_FICHIERS_QCM.md`**
   - Format Markdown exact des questions
   - Structure des réponses, sources, explications
   - Exemples concrets

### Fichiers pour les développeurs (moins pertinents pour la génération de QCM)

4. **`00-BRIEF-CLAUDE-CODE.md`**
   - Documentation technique de l'app React
   - Architecture, stack, structure
   - Utile si on doit modifier l'application

5. **`README-INDEX.md`**
   - Index de la documentation développement
   - Guide de setup initial
   - Utile pour recréer l'app

### Fichiers de configuration (ne pas toucher)
- `package.json`, `vite.config.js`, etc. : Configuration React
- `/src/` : Code source de l'application

---

## ⚠️ PIÈGES ET ERREURS À ÉVITER

### 🔴 Erreur #1 : Ne pas respecter la répartition thématique

**Ce qui s'est passé** :
- Lors de la première génération, j'ai créé 3 QCM (qcm-1, qcm-2, qcm-3)
- **QCM-1** : répartition OK ✓
- **QCM-2 et QCM-3** : répartition INCORRECTE ❌
  - Trop de questions sur les institutions
  - Pas assez sur actualités France
  - Zéro question de géographie/culture générale

**Pourquoi ça s'est passé** :
- Le fichier `generation-de-qcm.md` disait "APPROXIMATIVE" avec des fourchettes (~)
- Je me suis laissé emporter par mes recherches
- J'ai oublié de vérifier la répartition avant sauvegarde

**Comment éviter** :
1. ⚠️ **TOUJOURS créer un plan détaillé AVANT de commencer**
2. Lister Q1 à Q40 avec leur thème assigné
3. Vérifier que 11+4+8+7+3+2+4+1 = 40
4. Cocher la checklist thématique AVANT de sauvegarder

**Solution appliquée** :
- Modification du fichier `generation-de-qcm.md` pour rendre la répartition **STRICTE**
- Ajout d'une checklist de vérification obligatoire
- Numéros de questions précis (Q1-Q11 = Actualités France, etc.)

---

### 🔴 Erreur #2 : Options à 4 choix au lieu de 3

**Contexte** :
- L'ancien format avait 4 options (a, b, c, d)
- Le **nouveau standard** = 3 options (a, b, c) conformément aux vrais concours

**Vérification** :
```bash
grep -c '\*\*d\.\*\*' public/qcm/qcm-X.md
# Doit retourner 0 (zéro option d)
```

---

### 🔴 Erreur #3 : Sources inventées ou non vérifiables

**Ce qui est attendu** :
- Sources **RÉELLES** avec URLs vérifiables
- Privilégier les sites officiels : `.gouv.fr`, `legifrance.gouv.fr`, `assemblee-nationale.fr`
- Utiliser WebSearch pour trouver des informations actuelles

**Ce qu'il NE faut PAS faire** :
- Inventer des URLs
- Utiliser des sources génériques sans vérification
- Mettre des liens qui n'existent pas

---

## 📋 Workflow Mental pour Générer un QCM

### Étape 0 : Préparation (OBLIGATOIRE)
1. Lire `generation-de-qcm.md` en entier
2. Comprendre la répartition stricte : 11+4+8+7+3+2+4+1 = 40

### Étape 1 : Créer un plan détaillé
```
Q1-Q11  : Actualités France 2024-2026 (11 questions)
Q12-Q15 : Actualités internationales (4 questions)
Q16-Q23 : Histoire de France (8 questions)
Q24-Q30 : Institutions françaises (7 questions)
Q31-Q33 : Symboles et valeurs républicains (3 questions)
Q34-Q35 : Laïcité (2 questions)
Q36-Q39 : Union européenne (4 questions)
Q40     : Géographie/Culture générale (1 question)
```

### Étape 2 : Recherches web ciblées
- Faire des recherches par lots thématiques
- Noter les URLs des sources fiables
- Privilégier les actualités récentes pour les questions d'actualité

### Étape 3 : Création des questions
- Respecter le format strict (voir `FORMAT_FICHIERS_QCM.md`)
- **3 options seulement** (a, b, c)
- Sources avec URLs réelles
- Explications détaillées (2-4 phrases)

### Étape 4 : Vérification AVANT sauvegarde
```bash
# Compter les questions (doit être 40)
grep -c '### Question' public/qcm/qcm-X.md

# Vérifier absence d'option "d" (doit être 0)
grep -c '\*\*d\.\*\*' public/qcm/qcm-X.md

# Vérifier les séparateurs (doit être 41 : 1 en-tête + 40 questions)
grep -c '^---$' public/qcm/qcm-X.md
```

### Étape 5 : Checklist thématique
- [ ] Actualités France : EXACTEMENT 11 questions
- [ ] Actualités internationales : EXACTEMENT 4 questions
- [ ] Histoire de France : EXACTEMENT 8 questions
- [ ] Institutions françaises : EXACTEMENT 7 questions
- [ ] Symboles et valeurs républicains : EXACTEMENT 3 questions
- [ ] Laïcité : EXACTEMENT 2 questions
- [ ] Union européenne : EXACTEMENT 4 questions
- [ ] Géographie/Culture générale : EXACTEMENT 1 question

---

## 💡 Leçons Apprises

### 1. La répartition thématique est CRITIQUE
- Ne JAMAIS considérer les thèmes comme "approximatifs"
- Créer un plan AVANT de commencer
- Vérifier la répartition AVANT de sauvegarder

### 2. Format strict = parsing correct
- Le parser React est sensible au format
- `### Question X` (3 dièses + espace)
- `- [ ] **a.**` (espace après les crochets)
- `**✅ Réponse correcte : x**` (emoji checkmark)
- `---` (séparateur obligatoire)

### 3. Actualités = WebSearch obligatoire
- Les QCM doivent être à jour (2024-2026)
- Utiliser WebSearch pour trouver des informations récentes
- Vérifier les dates, chiffres, noms avec des sources officielles

### 4. Qualité > Quantité
- Mieux vaut prendre le temps de bien faire
- Vérifier chaque question individuellement
- S'assurer que les explications sont pédagogiques

---

## 🗂️ Historique des QCM Créés

### QCM-1 ✅
- Répartition thématique : CORRECTE
- Format : CORRECT
- Peut servir de référence

### QCM-2 ❌
- Répartition thématique : INCORRECTE
- À refaire selon la répartition stricte

### QCM-3 ❌
- Répartition thématique : INCORRECTE
- À refaire selon la répartition stricte

---

## 🎯 Prochaines Étapes

1. ⏳ Refaire QCM-2 avec la bonne répartition
2. ⏳ Refaire QCM-3 avec la bonne répartition
3. ⏳ Générer d'autres QCM variés (QCM-4, QCM-5, etc.)

---

## 🔧 Commandes Utiles

### Vérifier un QCM existant
```bash
# Lister les QCM disponibles
ls -la /sessions/youthful-awesome-newton/mnt/qcm-gardien-paix/public/qcm/

# Compter les questions
grep -c '### Question' public/qcm/qcm-X.md

# Vérifier l'absence d'option "d"
grep -c '\*\*d\.\*\*' public/qcm/qcm-X.md

# Compter les séparateurs
grep -c '^---$' public/qcm/qcm-X.md
```

### Compter les questions par thème (manuel)
Lire le fichier et compter manuellement selon les sujets :
- Actualités France = gouvernement, élections, réformes récentes
- Actualités internationales = géopolitique, relations internationales
- Histoire = événements historiques, dates, personnages
- Institutions = Constitution, Assemblée, Sénat, Conseil constitutionnel
- Symboles républicains = devise, drapeau, hymne, Marianne
- Laïcité = loi de 1905, laïcité scolaire
- Union européenne = institutions UE, traités, fonctionnement
- Géographie/Culture = régions, départements, culture générale

---

## 🧠 Points à Retenir (TL;DR)

1. **TOUJOURS lire `generation-de-qcm.md` avant de générer un QCM**
2. **Créer un plan détaillé AVANT de commencer**
3. **Respecter la répartition stricte** : 11+4+8+7+3+2+4+1 = 40
4. **3 options uniquement** (a, b, c) - jamais 4
5. **Sources réelles** avec URLs vérifiables
6. **Vérifier la checklist thématique** avant sauvegarde
7. **Utiliser WebSearch** pour les actualités récentes

---

## 📝 Notes de Session (Février 2026)

### Décisions prises
- Répartition thématique rendue STRICTE (plus d'approximation)
- Création de `CLAUDE.md` pour référence rapide
- Création de `DOCUMENTATION-CLAUDE.md` (ce fichier) pour contexte complet
- QCM-2 et QCM-3 à refaire avec la bonne répartition

### Philosophie du projet
- **Qualité avant quantité** : mieux vaut 3 bons QCM que 10 moyens
- **Actualité** : les questions doivent être à jour (2024-2026)
- **Pédagogie** : les explications doivent être claires et instructives
- **Rigueur** : respect absolu du format et de la répartition

---

**Dernière mise à jour** : 11 février 2026
**Pour** : Claude (Anthropic AI)
**Maintenu par** : Didier pour Bérengère

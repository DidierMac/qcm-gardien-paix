# Format des fichiers QCM

Ce document décrit le format exact que doivent respecter les fichiers `.md` placés dans `public/qcm/`.

---

## Structure générale

```
# Titre du QCM
Description courte du QCM (une seule ligne)

---

### Question 1
Texte de la question ?
- [ ] **a.** Réponse A
- [ ] **b.** Réponse B
- [ ] **c.** Réponse C

**✅ Réponse correcte : b**
📎 Source : [Titre de la source](https://url-de-la-source.fr)
💡 Explication : Texte explicatif de la bonne réponse.

---

### Question 2
...

---
```

---

## Règles détaillées

### En-tête du fichier

- `# Titre` — une seule ligne commençant par `# ` (un dièse + espace)
- Ligne de description — texte libre, sur la ligne suivante
- Séparateur `---` avant la première question

### Chaque question

1. **Marqueur de question** : `### Question N` (trois dièses + espace + le mot "Question" + le numéro)
2. **Texte de la question** : sur la ligne suivante, texte libre se terminant par `?`
3. **Options** : 4 options, chacune sur sa propre ligne, au format :

   ```
   - [ ] **a.** Texte de la réponse
   ```

   - Les lettres sont : `a`, `b`, `c`, `d` (minuscules)
   - Le point après la lettre est obligatoire : `**a.**`
   - Une ligne vide avant la réponse correcte
4. **Réponse correcte** (obligatoire) :

   ```
   **✅ Réponse correcte : b**
   ```

   - La lettre est en minuscule (`a`, `b`, `c` ou `d`)
   - L'emoji ✅ est facultatif mais recommandé
5. **Source** (facultative) :

   ```
   📎 Source : [Titre du texte](https://url.com)
   ```
6. **Explication** (facultative) :

   ```
   💡 Explication : Texte explicatif en une ou plusieurs phrases.
   ```
7. **Séparateur de fin** : ligne `---` après chaque question (y compris la dernière)

---

## Exemple complet (5 questions)

```markdown
# QCM Droit pénal — Notions fondamentales
Entraînement sur les notions essentielles du droit pénal pour le concours de Gardien de la Paix.

---

### Question 1
Quel est le délai de prescription de l'action publique pour un crime en France ?
- [ ] **a.** 3 ans
- [ ] **b.** 6 ans
- [ ] **c.** 20 ans

**✅ Réponse correcte : c**
📎 Source : [Article 7 du Code de procédure pénale](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038311454/)
💡 Explication : Depuis la loi du 27 février 2017, le délai de prescription des crimes est de 20 ans à compter du jour où l'infraction a été commise.

---

### Question 2
Quelle est la peine maximale encourue pour un délit en droit français ?
- [ ] **a.** 5 ans d'emprisonnement
- [ ] **b.** 10 ans d'emprisonnement
- [ ] **c.** 20 ans d'emprisonnement

**✅ Réponse correcte : b**
📎 Source : [Article 131-4 du Code pénal](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006417206/)
💡 Explication : Les délits sont passibles d'une peine d'emprisonnement de 2 mois à 10 ans maximum. Au-delà, on entre dans la catégorie des crimes.

---

### Question 3
Qu'est-ce que la légitime défense ?
- [ ] **a.** Le droit de se faire justice soi-même en toutes circonstances
- [ ] **b.** Le droit de riposter à une attaque injuste, de manière proportionnée et nécessaire
- [ ] **c.** L'autorisation de porter une arme pour se protéger

**✅ Réponse correcte : b**
📎 Source : [Article 122-5 du Code pénal](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006417229/)
💡 Explication : La légitime défense exige trois conditions cumulatives : une agression injuste, actuelle ou imminente, une riposte nécessaire et une riposte proportionnée à l'attaque.

---

### Question 4
Quelle infraction est classée comme une contravention de 5e classe ?
- [ ] **a.** Le vol simple
- [ ] **b.** Les violences volontaires sans incapacité
- [ ] **c.** La destruction légère de biens d'autrui

**✅ Réponse correcte : b**
📎 Source : [Article R625-1 du Code pénal](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006418007/)
💡 Explication : Les violences volontaires n'ayant pas entraîné d'incapacité de travail constituent une contravention de 5e classe, punie d'une amende de 1 500 €.

---

### Question 5
Quel organe est chargé de diriger la police judiciaire ?
- [ ] **a.** Le préfet
- [ ] **b.** Le ministre de l'Intérieur
- [ ] **c.** Le procureur de la République

**✅ Réponse correcte : c**
📎 Source : [Article 41 du Code de procédure pénale](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042193712/)
💡 Explication : Sous l'autorité du procureur général près la cour d'appel, le procureur de la République dirige l'activité des officiers et agents de police judiciaire dans son ressort.

---
```

---

## Checklist avant d'enregistrer un fichier QCM

- [ ] Le fichier est au format `.md` et placé dans `public/qcm/`
- [ ] Le titre commence bien par `# ` (un seul dièse)
- [ ] Chaque question commence par `### Question N`
- [ ] Chaque option est au format `- [ ] **a.** ...` (lettres minuscules a/b/c/d)
- [ ] La réponse correcte est au format `**✅ Réponse correcte : x**` (lettre minuscule)
- [ ] Chaque question est séparée par `---`
- [ ] Le fichier se termine par `---`

---

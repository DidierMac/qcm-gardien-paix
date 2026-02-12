# Contexte du projet : QCM Gardien de la Paix

## 📋 Fichiers de documentation

**⚠️ IMPORTANT : Lire ces fichiers au démarrage de chaque session**

1. **`CLAUDE.md`** (ce fichier) : Référence rapide du projet
2. **`generation-de-qcm.md`** : Guide de création de QCM avec répartition stricte
3. **`DOCUMENTATION-CLAUDE.md`** : Historique complet, erreurs passées, leçons apprises
   - 🔴 Contient les erreurs à ne PAS répéter (ex: répartition thématique incorrecte)
   - 💡 Workflow détaillé et troubleshooting
   - 📊 Exemples concrets de vérification
4. **`DEPLOIEMENT.md`** : 🚀 Processus de build et déploiement GitHub Pages
   - 📝 Workflow complet : build → git → deploy
   - ❌ Résolution des problèmes courants
   - ✅ Checklist de vérification

**Ordre de lecture recommandé** : CLAUDE.md → generation-de-qcm.md → DOCUMENTATION-CLAUDE.md

---

## Objectif du projet
Application web pour s'entraîner au concours de **Gardien de la Paix de la Police nationale française** avec des QCM de culture générale.

## Utilisateur
**Bérengère** prépare le concours de Gardien de la Paix. Elle a besoin de QCM variés et à jour pour s'entraîner efficacement.

## Structure du projet

### Dossier principal
- `/public/qcm/` : Contient tous les fichiers QCM au format Markdown
- Chaque QCM = 40 questions avec 3 options (a, b, c)
- Format strict : voir `FORMAT_FICHIERS_QCM.md`

### Fichier clé : `generation-de-qcm.md`
**⚠️ Fichier de référence obligatoire pour générer de nouveaux QCM**

Ce fichier contient :
- Le format exact à respecter
- La répartition thématique **STRICTE** (pas approximative !)
- Les sources à privilégier
- La checklist de vérification obligatoire

### Répartition thématique OBLIGATOIRE (40 questions)
1. **Actualités France 2024-2026** : 11 questions
2. **Actualités internationales** : 4 questions
3. **Histoire de France** : 8 questions
4. **Institutions françaises** : 7 questions
5. **Symboles et valeurs républicains** : 3 questions
6. **Laïcité** : 2 questions
7. **Union européenne** : 4 questions
8. **Géographie/Culture générale** : 1 question

**TOTAL = 40 questions exactement**

## Workflow de génération de QCM

### Quand l'utilisateur demande de générer un/des QCM :

1. **Lire le fichier** `generation-de-qcm.md` (OBLIGATOIRE)
2. **Créer un plan détaillé** AVANT de commencer :
   - Lister Q1 à Q40 avec leur thème
   - Vérifier que la répartition est exacte
3. **Rechercher sur le web** des informations vérifiables
4. **Créer les 40 questions** au format strict (3 options)
5. **VÉRIFIER la checklist thématique** avant sauvegarde
6. **Sauvegarder** dans `/public/qcm/qcm-X.md`

### Points critiques à respecter

✅ **TOUJOURS 3 options** (a, b, c) - jamais 4 !
✅ **Format strict** : `### Question X`, `- [ ] **a.**`, `**✅ Réponse correcte : x**`
✅ **Sources réelles** avec URLs vérifiables (.gouv.fr, sites officiels)
✅ **Explications détaillées** (2-4 phrases minimum)
✅ **Répartition thématique exacte** - pas d'approximation !
✅ Séparateurs `---` après chaque question

❌ Ne JAMAIS inventer de sources ou d'URLs
❌ Ne JAMAIS faire 4 options
❌ Ne JAMAIS dévier de la répartition thématique stricte

## Commandes courantes

### Générer un nouveau QCM
**Utilisateur** : "Génère un QCM" ou "Suis les instructions dans generation-de-qcm.md"

**Claude doit** :
1. Lire `generation-de-qcm.md`
2. Créer un plan thématique détaillé
3. Générer 40 questions selon la répartition STRICTE
4. Vérifier la checklist avant sauvegarde

### Vérifier un QCM existant
```bash
# Compter les questions
grep -c '### Question' public/qcm/qcm-X.md

# Vérifier qu'il n'y a pas d'option "d"
grep -c '\*\*d\.\*\*' public/qcm/qcm-X.md

# Compter les séparateurs (doit être 41 : 1 en-tête + 40 questions)
grep -c '^---$' public/qcm/qcm-X.md
```

### Build et Déploiement
**Utilisateur** : "build et deploy" ou "déploie l'application"

**Claude doit** :
1. Lire `DEPLOIEMENT.md` pour le workflow complet
2. Exécuter `npm run build` et vérifier le succès
3. Faire `git add .` pour ajouter les modifications
4. **Analyser le contexte** et **proposer un message de commit** adapté (ex: "feat: ajout QCM-4 et QCM-5 avec actualités 2024-2026 et histoire de France")
5. **Attendre validation** de l'utilisateur (qui peut modifier le message)
6. Faire `git commit -m "message validé"`
7. Faire `git push origin main`
8. Exécuter `npm run deploy`
9. **En cas d'erreur** : appliquer les solutions du fichier DEPLOIEMENT.md

**Note importante** :
- Si l'utilisateur fournit un message explicite (ex: "build et deploy avec le message : feat: xxx"), Claude l'utilise directement
- Sinon, Claude propose un message basé sur le contexte et attend validation
- Le processus complet est documenté dans `DEPLOIEMENT.md`

## Historique du projet

### QCM créés
- **qcm-1.md** : Session Février 2026 (actualités récentes) ✅
- **qcm-2.md** : Budget 2026, actualités, institutions ✅ (refait avec répartition stricte)
- **qcm-3.md** : Histoire, valeurs républicaines ✅ (refait avec répartition stricte)
- **qcm-4.md** : Actualités et Histoire Contemporaine 2024-2026 ✅ (Février 2026)
  - Focus : JO Paris 2024, réformes législatives, Mai 68, institutions
- **qcm-5.md** : Histoire et Institutions de France ✅ (Février 2026)
  - Focus : Clovis, Renaissance, Révolution, symboles républicains

✅ **Tous les QCM respectent la répartition thématique stricte (11+4+8+7+3+2+4+1)**

## Notes importantes

- Le projet est une application React + Vite
- Les QCM sont lus dynamiquement depuis `/public/qcm/`
- Format d'origine avait 4 options, mais **le nouveau standard est 3 options** conformément aux vrais concours
- Les actualités doivent être très récentes (2024-2026)
- Privilégier les sources officielles françaises (.gouv.fr, legifrance, etc.)

## Prochaines étapes
1. ✅ Améliorer `generation-de-qcm.md` (fait !)
2. ✅ Créer `CLAUDE.md` (fait !)
3. ✅ Créer `DOCUMENTATION-CLAUDE.md` (fait !)
4. ✅ Refaire QCM-2 et QCM-3 avec la bonne répartition (fait !)
5. ✅ Générer QCM-4 et QCM-5 avec thématiques variées (fait !)
6. ✅ Créer `DEPLOIEMENT.md` - guide de build et déploiement (fait !)
7. ⏳ Déployer QCM-4 et QCM-5 sur GitHub Pages
8. ⏳ Générer d'autres QCM avec des thèmes variés

---

**Dernière mise à jour** : Février 2026
**Projet maintenu par** : Didier pour Bérengère

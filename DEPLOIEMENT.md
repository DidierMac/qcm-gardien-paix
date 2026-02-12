# 🚀 Guide de Déploiement - QCM Gardien de la Paix

## Processus complet de build et déploiement

### ⚠️ Prérequis
- Node.js et npm installés
- Git configuré avec accès au dépôt GitHub
- Dépendances installées (`npm install`)

---

## 📋 Processus standard (à suivre dans l'ordre)

### 1️⃣ **Build de l'application**
```bash
npm run build
```
✅ Vérifie que le build réussit sans erreur
📁 Génère le dossier `dist/` avec les fichiers compilés

---

### 2️⃣ **Ajout des fichiers au staging Git**
```bash
git add .
```
💡 Ajoute tous les fichiers modifiés (nouveaux QCM, modifications de code, etc.)

---

### 3️⃣ **Commit avec message descriptif**

**💡 Claude propose automatiquement un message de commit**

Quand tu ne fournis pas de message explicite, Claude :
1. Analyse le contexte (nouveaux QCM, corrections, modifications)
2. Génère un message de commit descriptif selon les conventions
3. Te le propose pour validation avant de commit
4. Tu peux l'accepter ou le modifier

**Exemples de messages proposés par Claude :**
- `git commit -m "feat: ajout QCM-4 (actualités 2024-2026) et QCM-5 (histoire de France)"`
- `git commit -m "fix: correction erreurs QCM-3 question 15"`
- `git commit -m "docs: mise à jour documentation génération QCM"`
- `git commit -m "refactor: amélioration répartition thématique QCM-2"`

**Convention de préfixes :**
- `feat:` nouvelle fonctionnalité (nouveau QCM, nouvelle feature)
- `fix:` correction de bug ou erreur
- `docs:` modification de documentation
- `refactor:` refactorisation sans changement de fonctionnalité
- `style:` changements de style/formatage
- `chore:` tâches de maintenance

**Tu peux aussi fournir ton propre message :**
```
"build et deploy avec le message : feat: ajout QCM spécial institutions"
```

---

### 4️⃣ **Push vers GitHub**
```bash
git push origin main
```
⬆️ Envoie les commits vers le dépôt distant GitHub
📌 Branche par défaut : `main` (ou `master` selon votre config)

---

### 5️⃣ **Déploiement sur GitHub Pages**
```bash
npm run deploy
```
🌐 Publie automatiquement sur GitHub Pages
🔗 URL : `https://[votre-username].github.io/qcm-gardien-paix/`

---

## 🤖 Processus automatisé avec Claude

Quand tu demandes à Claude de "build et deploy", voici comment il procède :

### Option 1 : Sans message fourni (Claude propose)
```
"build et deploy"
```
➡️ Claude va :
1. Builder l'application
2. Analyser le contexte (ex: "ajout QCM-4 et QCM-5")
3. **Proposer un message de commit** adapté
4. Attendre ta confirmation ou modification
5. Commit, push, deploy

### Option 2 : Avec message explicite
```
"build et deploy avec le message : feat: ajout QCM spécial institutions"
```
➡️ Claude utilise directement ton message et exécute tout automatiquement

### Option 3 : Avec questions intermédiaires
Si Claude détecte un problème ou besoin de clarification, il peut :
- ✅ Proposer un message de commit et attendre validation
- ✅ Demander confirmation avant des actions sensibles
- ✅ Corriger automatiquement les bugs de build
- ✅ Suggérer des corrections si le déploiement échoue

---

## ❌ Problèmes courants et solutions

### Erreur : "Cannot find module @rollup/rollup-linux-arm64-gnu"
**Solution :**
```bash
npm install --force
```

### Erreur : "EPERM: operation not permitted, unlink dist/.DS_Store"
**Solution :**
```bash
# Déjà corrigé dans vite.config.js avec emptyOutDir: false
# Si le problème persiste :
rm -f dist/.DS_Store
npm run build
```

### Erreur : "ssh: Could not resolve hostname github.com"
**Cause :** Pas de connexion réseau ou problème d'authentification GitHub
**Solution :**
```bash
# Vérifier la connexion GitHub
ssh -T git@github.com

# Si problème d'authentification, vérifier les clés SSH
ls -al ~/.ssh
```

### Build réussi mais deploy échoue
**Solution :**
```bash
# S'assurer d'avoir commit et push avant
git add .
git commit -m "votre message"
git push origin main

# Puis retry deploy
npm run deploy
```

---

## 🔄 Workflow complet en une seule commande

Pour automatiser complètement (après avoir ajouté les fichiers) :
```bash
npm run build && git add . && git commit -m "feat: mise à jour QCM" && git push origin main && npm run deploy
```

⚠️ **Attention :** Vérifier que le build réussit avant de commit !

---

## 📊 Vérification post-déploiement

1. **Vérifier localement :**
   ```bash
   npm run preview
   ```
   Ouvre http://localhost:4173

2. **Vérifier sur GitHub Pages :**
   - Aller sur `https://[username].github.io/qcm-gardien-paix/`
   - Vérifier que les nouveaux QCM apparaissent
   - Tester quelques questions

3. **Vérifier les fichiers déployés :**
   - Aller dans l'onglet "Settings" → "Pages" du dépôt GitHub
   - Vérifier que la branche `gh-pages` est active
   - Vérifier la dernière date de déploiement

---

## 🎯 Checklist rapide

- [ ] Build réussi (`npm run build`)
- [ ] Nouveaux QCM vérifiés (format, répartition thématique)
- [ ] Fichiers ajoutés (`git add .`)
- [ ] Commit avec message descriptif
- [ ] Push vers GitHub (`git push origin main`)
- [ ] Déploiement GitHub Pages (`npm run deploy`)
- [ ] Vérification en ligne que les QCM sont accessibles

---

## 📝 Notes importantes

1. **Toujours builder avant de commit** pour s'assurer qu'il n'y a pas d'erreurs
2. **Le fichier `vite.config.js` a été modifié** avec `emptyOutDir: false` pour éviter les problèmes de permissions
3. **Les QCM sont dans `/public/qcm/`** et sont automatiquement indexés lors du build
4. **GitHub Pages peut prendre 1-2 minutes** pour se mettre à jour après le deploy

---

**Dernière mise à jour :** Février 2026
**Maintenu par :** Didier pour Bérengère

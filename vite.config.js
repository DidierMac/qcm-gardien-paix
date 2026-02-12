import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

/**
 * Plugin Vite : génère automatiquement public/qcm/index.json
 * en scannant tous les fichiers .md présents dans public/qcm/.
 * Déclenché à chaque build ET au démarrage du serveur de dev.
 */
function generateQcmIndex() {
  return {
    name: 'generate-qcm-index',
    buildStart() {
      const qcmDir = path.resolve(__dirname, 'public/qcm')
      const indexPath = path.join(qcmDir, 'index.json')

      const files = fs.readdirSync(qcmDir)
        .filter(f => f.endsWith('.md'))
        .sort()
        .map(filename => ({
          filename,
          label: filename.replace(/\.md$/, '').replace(/[-_]/g, ' '),
        }))

      fs.writeFileSync(indexPath, JSON.stringify(files, null, 2))
      console.log(`[qcm-index] ${files.length} fichier(s) indexé(s) → index.json`)
    },
  }
}

export default defineConfig({
  plugins: [
    generateQcmIndex(),
    tailwindcss(),
    react(),
  ],
  // Pour GitHub Pages : mettre le nom exact du dépôt GitHub
  base: '/qcm-gardien-paix/',
  build: {
    emptyOutDir: false, // Désactiver le vidage automatique du dossier dist
  },
})

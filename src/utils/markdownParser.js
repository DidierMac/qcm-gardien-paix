/**
 * Parser pour les fichiers QCM au format Markdown.
 *
 * Format attendu :
 *
 * # Titre du QCM
 * Description optionnelle
 *
 * ---
 *
 * ### Question 1
 * Texte de la question ?
 * - [ ] **a.** Réponse A
 * - [ ] **b.** Réponse B
 * - [ ] **c.** Réponse C
 * - [ ] **d.** Réponse D
 *
 * **✅ Réponse correcte : b**
 * 📎 Source : [Titre](https://url.com)
 * 💡 Explication : Texte explicatif
 *
 * ---
 */

/**
 * Parse un fichier Markdown et retourne un objet quiz structuré.
 * @param {string} markdown - Contenu brut du fichier .md
 * @returns {{ title: string, description: string, questions: Array }}
 */
export function parseMarkdown(markdown) {
  const lines = markdown.split('\n');
  const quiz = {
    title: '',
    description: '',
    questions: [],
  };

  let currentQuestion = null;
  let descriptionLines = [];
  let headerParsed = false;
  // Texte de la question en cours d'accumulation (peut être multi-lignes)
  let pendingQuestionText = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Titre principal (# ...)
    if (trimmed.startsWith('# ') && !quiz.title) {
      quiz.title = trimmed.slice(2).trim();
      headerParsed = true;
      continue;
    }

    // Séparateur --- : fermer la question en cours
    if (trimmed === '---') {
      if (currentQuestion) {
        quiz.questions.push(currentQuestion);
        currentQuestion = null;
        pendingQuestionText = null;
      }
      continue;
    }

    // Nouvelle question : ### Question N  ou  ### N.
    if (trimmed.match(/^###\s+/)) {
      // Sauvegarder la question précédente si elle n'a pas encore été pushée
      if (currentQuestion) {
        quiz.questions.push(currentQuestion);
      }
      currentQuestion = {
        text: '',
        options: [],
        answer: null,
        explanation: '',
        source: null,
      };
      pendingQuestionText = null;
      continue;
    }

    if (!currentQuestion) {
      // Description du quiz (lignes entre le titre et la première question)
      if (headerParsed && trimmed && !trimmed.startsWith('#') && trimmed !== '---') {
        descriptionLines.push(trimmed);
      }
      continue;
    }

    // Option de réponse : - [ ] **a.** Texte  ou  - [ ] **a)** Texte
    const optionMatch = trimmed.match(/^-\s+\[[ x]?\]\s+\*\*([a-eA-E])[.)]\*\*\s+(.+)$/);
    if (optionMatch) {
      currentQuestion.options.push({
        letter: optionMatch[1].toLowerCase(),
        text: optionMatch[2].trim(),
      });
      continue;
    }

    // Réponse correcte : **✅ Réponse correcte : b**  ou  **Réponse correcte : b**
    const answerMatch = trimmed.match(/^\*\*.*[Rr][ée]ponse\s+correcte\s*:\s*([a-eA-E])\*\*$/);
    if (answerMatch) {
      currentQuestion.answer = answerMatch[1].toLowerCase();
      continue;
    }

    // Source : 📎 Source : [Titre](url)  ou  Source : [Titre](url)
    const sourceMatch = trimmed.match(/^📎?\s*Source\s*:\s*\[(.+?)\]\((.+?)\)/);
    if (sourceMatch) {
      currentQuestion.source = { label: sourceMatch[1], url: sourceMatch[2] };
      continue;
    }

    // Explication : 💡 Explication : texte
    const explMatch = trimmed.match(/^💡?\s*Explication\s*:\s*(.+)$/);
    if (explMatch) {
      currentQuestion.explanation = explMatch[1].trim();
      continue;
    }

    // Texte de la question (première ligne non-vide après ### Question N)
    if (trimmed && !trimmed.startsWith('-') && !trimmed.startsWith('*') && !trimmed.startsWith('#')) {
      if (!currentQuestion.text) {
        currentQuestion.text = trimmed;
      }
    }
  }

  // Flush de la dernière question si pas encore ajoutée
  if (currentQuestion) {
    quiz.questions.push(currentQuestion);
  }

  quiz.description = descriptionLines.join(' ');

  return quiz;
}

import { parseMarkdown } from './markdownParser.js';

/**
 * Charge et parse un fichier QCM Markdown depuis le dossier public/qcm/.
 * @param {string} filename - Nom du fichier (ex: "qcm-test.md")
 * @returns {Promise<{ title: string, description: string, questions: Array }>}
 */
export async function loadQuiz(filename) {
  const url = `${import.meta.env.BASE_URL}qcm/${filename}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Impossible de charger le fichier QCM : ${url} (${response.status})`);
  }
  const text = await response.text();
  return parseMarkdown(text);
}

/**
 * Liste les fichiers QCM disponibles depuis un fichier d'index JSON.
 * Si le fichier index.json n'existe pas, retourne une liste par défaut.
 * @returns {Promise<Array<{ filename: string, label: string }>>}
 */
export async function listQuizzes() {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}qcm/index.json`);
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // index.json absent, on continue avec la liste par défaut
  }
  return [{ filename: 'qcm-test.md', label: 'QCM de test' }];
}

/**
 * Calcule le score d'un quiz.
 * @param {Array} questions - Questions du quiz
 * @param {Object} userAnswers - Map { questionIndex: letterChoisie }
 * @returns {{ score: number, total: number, percentage: number, details: Array }}
 */
export function calculateScore(questions, userAnswers) {
  let score = 0;
  const details = questions.map((q, index) => {
    const userAnswer = userAnswers[index] ?? null;
    const correct = q.answer;
    const isCorrect = userAnswer === correct;
    if (isCorrect) score++;
    return {
      question: q.text,
      options: q.options,
      userAnswer,
      correctAnswer: correct,
      explanation: q.explanation,
      source: q.source ?? null,
      isCorrect,
    };
  });

  const total = questions.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return { score, total, percentage, details };
}

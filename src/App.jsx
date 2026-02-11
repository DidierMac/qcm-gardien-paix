import { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import QuizHeader from './components/QuizHeader.jsx';
import QuizQuestion from './components/QuizQuestion.jsx';
import QuizResults from './components/QuizResults.jsx';
import { loadQuiz, listQuizzes, calculateScore } from './utils/quizManager.js';

export default function App() {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  // { [questionIndex]: letter }
  const [userAnswers, setUserAnswers] = useState({});
  const [phase, setPhase] = useState('quiz');
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const list = await listQuizzes();
        // Chargement aléatoire parmi les QCM disponibles
        const pick = list[Math.floor(Math.random() * list.length)];
        const data = await loadQuiz(pick.filename);
        setQuiz(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchQuiz();
  }, []);

  function handleAnswer(letter) {
    if (!showFeedback) {
      setSelectedAnswer(letter);
    }
  }

  function handleValidate() {
    if (selectedAnswer === null || showFeedback) return;
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: selectedAnswer }));
    setShowFeedback(true);
  }

  function handleNext() {
    if (!quiz) return;
    const isLast = currentIndex === quiz.questions.length - 1;
    if (isLast) {
      // La réponse de la dernière question est déjà dans userAnswers (ajoutée au moment de Valider)
      setResult(calculateScore(quiz.questions, { ...userAnswers }));
      setPhase('results');
    } else {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedAnswer(userAnswers[nextIndex] ?? null);
      // Afficher le feedback si la question suivante a déjà été répondue
      setShowFeedback(nextIndex in userAnswers);
    }
  }

  function handlePrev() {
    if (currentIndex === 0) return;
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedAnswer(userAnswers[prevIndex] ?? null);
    setShowFeedback(prevIndex in userAnswers);
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setUserAnswers({});
    setPhase('quiz');
    setResult(null);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-indigo-600">
          <Loader2 size={36} className="animate-spin" />
          <p className="text-sm text-gray-500">Chargement du QCM…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full flex gap-3">
          <AlertCircle size={22} className="shrink-0 text-red-500 mt-0.5" />
          <div>
            <p className="font-semibold text-red-800">Erreur de chargement</p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz || quiz.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <p className="text-gray-500">Aucune question trouvée dans ce QCM.</p>
      </div>
    );
  }

  const total = quiz.questions.length;
  const currentQuestion = quiz.questions[currentIndex];
  // Score en temps réel
  const liveScore = Object.entries(userAnswers).filter(
    ([idx, ans]) => quiz.questions[Number(idx)]?.answer === ans
  ).length;

  if (phase === 'results' && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-indigo-700 text-white px-4 py-4 shadow-md">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-lg font-semibold">{quiz.title}</h1>
          </div>
        </div>
        <QuizResults result={result} quizTitle={quiz.title} onRestart={handleRestart} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <QuizHeader
        title={quiz.title}
        current={currentIndex + 1}
        total={total}
        liveScore={liveScore}
      />
      <QuizQuestion
        question={currentQuestion}
        questionIndex={currentIndex}
        selectedAnswer={selectedAnswer}
        showFeedback={showFeedback}
        onAnswer={handleAnswer}
        onValidate={handleValidate}
        onNext={handleNext}
        onPrev={handlePrev}
        isFirst={currentIndex === 0}
        isLast={currentIndex === total - 1}
      />
    </div>
  );
}

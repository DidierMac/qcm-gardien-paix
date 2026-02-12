import { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import QuizSelector from './components/QuizSelector.jsx';
import QuizHeader from './components/QuizHeader.jsx';
import QuizQuestion from './components/QuizQuestion.jsx';
import QuizResults from './components/QuizResults.jsx';
import { loadQuiz, listQuizzes, calculateScore } from './utils/quizManager.js';

export default function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedFilename, setSelectedFilename] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [quizFilename, setQuizFilename] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [error, setError] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  // { [questionIndex]: letter }
  const [userAnswers, setUserAnswers] = useState({});
  const [phase, setPhase] = useState('select');
  const [result, setResult] = useState(null);

  // Chargement de la liste des QCM au démarrage
  useEffect(() => {
    async function fetchList() {
      try {
        const list = await listQuizzes();
        setQuizzes(list);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchList();
  }, []);

  async function handleStart() {
    if (!selectedFilename) return;
    setLoadingQuiz(true);
    setError(null);
    try {
      const data = await loadQuiz(selectedFilename);
      setQuiz(data);
      setQuizFilename(selectedFilename);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setUserAnswers({});
      setResult(null);
      setPhase('quiz');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingQuiz(false);
    }
  }

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
      setResult(calculateScore(quiz.questions, { ...userAnswers }));
      setPhase('results');
    } else {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedAnswer(userAnswers[nextIndex] ?? null);
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
    setQuiz(null);
    setQuizFilename(null);
    setSelectedFilename(null);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setUserAnswers({});
    setResult(null);
    setPhase('select');
  }

  // Chargement initial de la liste
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-indigo-600">
          <Loader2 size={36} className="animate-spin" />
          <p className="text-sm text-gray-500">Chargement…</p>
        </div>
      </div>
    );
  }

  if (error && phase === 'select') {
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

  const total = quiz?.questions.length ?? 0;
  const currentQuestion = quiz?.questions[currentIndex];
  const liveScore = quiz
    ? Object.entries(userAnswers).filter(
        ([idx, ans]) => quiz.questions[Number(idx)]?.answer === ans
      ).length
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

      {/* Modale de sélection */}
      {phase === 'select' && (
        <QuizSelector
          quizzes={quizzes}
          selected={selectedFilename}
          onSelect={setSelectedFilename}
          onStart={handleStart}
        />
      )}

      {/* Chargement du QCM sélectionné */}
      {loadingQuiz && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-3 text-white">
            <Loader2 size={36} className="animate-spin" />
            <p className="text-sm">Chargement du QCM…</p>
          </div>
        </div>
      )}

      {/* Phase quiz */}
      {phase === 'quiz' && quiz && (
        <>
          <QuizHeader
            title={quiz.title}
            filename={quizFilename}
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
        </>
      )}

      {/* Phase résultats */}
      {phase === 'results' && result && (
        <>
          <div className="bg-indigo-700 text-white px-4 py-4 shadow-md">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-lg font-semibold">{quiz.title}</h1>
            </div>
          </div>
          <QuizResults result={result} quizTitle={quiz.title} onRestart={handleRestart} />
        </>
      )}
    </div>
  );
}

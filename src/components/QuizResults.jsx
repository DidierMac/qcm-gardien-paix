import { Trophy, CheckCircle, XCircle, RotateCcw, Info, ExternalLink } from 'lucide-react';

export default function QuizResults({ result, quizTitle, onRestart }) {
  const { score, total, percentage, details } = result;

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Couleur du cercle en fonction du score
  let ringColor = '#dc2626'; // rouge
  if (percentage >= 80) ringColor = '#16a34a';
  else if (percentage >= 60) ringColor = '#4f46e5';
  else if (percentage >= 40) ringColor = '#ca8a04';

  // Mention textuelle
  let mentionText = 'À retravailler sérieusement.';
  let mentionCls = 'text-red-700';
  if (percentage >= 80) { mentionText = 'Excellent ! Félicitations !'; mentionCls = 'text-green-700'; }
  else if (percentage >= 60) { mentionText = 'Bien ! Continuez vos efforts.'; mentionCls = 'text-indigo-700'; }
  else if (percentage >= 40) { mentionText = 'Peut mieux faire. Révisez !'; mentionCls = 'text-yellow-700'; }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      {/* Carte score */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{quizTitle}</h2>
        <p className="text-gray-500 text-sm mb-5">Quiz terminé</p>

        <div className="flex justify-center mb-4">
          <svg width="110" height="110" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="40"
              fill="none"
              stroke={ringColor}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
            <text x="50" y="46" textAnchor="middle" fontSize="18" fill={ringColor} fontWeight="bold">
              {score}/{total}
            </text>
            <text x="50" y="62" textAnchor="middle" fontSize="11" fill="#6b7280">
              {percentage}%
            </text>
          </svg>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Trophy size={20} className={mentionCls} />
          <p className={`text-base font-semibold ${mentionCls}`}>{mentionText}</p>
        </div>
      </div>

      {/* Détail */}
      <h3 className="text-base font-semibold text-gray-700 mb-3">Détail des réponses</h3>
      <div className="space-y-3 mb-6">
        {details.map((d, i) => (
          <div
            key={i}
            className={
              d.isCorrect
                ? 'rounded-xl p-4 border border-green-200 bg-white shadow-sm'
                : 'rounded-xl p-4 border border-red-200 bg-white shadow-sm'
            }
          >
            <div className="flex items-start gap-2 mb-2">
              {d.isCorrect
                ? <CheckCircle size={16} className="shrink-0 text-green-600 mt-0.5" />
                : <XCircle size={16} className="shrink-0 text-red-500 mt-0.5" />
              }
              <p className="text-sm font-medium text-gray-800 leading-snug">{d.question}</p>
            </div>

            <div className="pl-5 space-y-0.5 mb-1">
              {d.options.map((opt) => {
                const isCorrectOpt = opt.letter === d.correctAnswer;
                const isUserWrong = opt.letter === d.userAnswer && !d.isCorrect;
                let cls = 'text-gray-400 text-xs';
                if (isCorrectOpt) cls = 'text-green-700 text-xs font-semibold';
                else if (isUserWrong) cls = 'text-red-500 text-xs line-through';
                return (
                  <p key={opt.letter} className={cls}>
                    {opt.letter.toUpperCase()}. {opt.text}
                    {isCorrectOpt && ' ✓'}
                    {isUserWrong && ' ✗'}
                  </p>
                );
              })}
            </div>

            {d.explanation && (
              <div className="flex gap-1 items-start pl-5 mt-1">
                <Info size={12} className="shrink-0 mt-0.5 text-gray-400" />
                <p className="text-xs text-gray-500">{d.explanation}</p>
              </div>
            )}

            {d.source && (
              <a
                href={d.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-1 pl-5 text-xs text-indigo-600 underline"
              >
                <ExternalLink size={11} />
                {d.source.label}
              </a>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-medium"
      >
        <RotateCcw size={16} />
        Recommencer le quiz
      </button>
    </div>
  );
}

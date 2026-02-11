import { ChevronRight, ChevronLeft, CheckCircle, XCircle, Info, ExternalLink } from 'lucide-react';

export default function QuizQuestion({
  question,
  selectedAnswer,
  showFeedback,
  onAnswer,
  onValidate,
  onNext,
  onPrev,
  isFirst,
  isLast,
}) {
  const { text, options, answer, explanation, source } = question;

  const canValidate = selectedAnswer !== null && !showFeedback;
  const isCorrect = showFeedback && selectedAnswer === answer;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      {/* Texte de la question */}
      <div className="bg-white rounded-xl shadow-lg p-5 mb-4">
        <p className="text-gray-800 text-base font-medium leading-relaxed">{text}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-4">
        {options.map((opt) => {
          const isSelected = selectedAnswer === opt.letter;
          const isAnswerOpt = opt.letter === answer;
          const isWrongSelected = isSelected && !isAnswerOpt;

          // Classes de base communes à toutes les options
          let optionCls = 'w-full flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all duration-150 ';
          let badgeCls = 'shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ';

          if (!showFeedback) {
            if (isSelected) {
              optionCls += 'border-indigo-500 bg-indigo-50 text-indigo-900 cursor-pointer';
              badgeCls += 'bg-indigo-600 text-white';
            } else {
              optionCls += 'border-gray-200 bg-white text-gray-700 cursor-pointer';
              badgeCls += 'bg-gray-100 text-gray-600';
            }
          } else {
            if (isAnswerOpt) {
              optionCls += 'border-green-500 bg-green-50 text-green-900 cursor-default';
              badgeCls += 'bg-green-600 text-white';
            } else if (isWrongSelected) {
              optionCls += 'border-red-400 bg-red-50 text-red-900 cursor-default';
              badgeCls += 'bg-red-500 text-white';
            } else {
              optionCls += 'border-gray-100 bg-gray-50 text-gray-400 cursor-default';
              badgeCls += 'bg-gray-100 text-gray-400';
            }
          }

          return (
            <button
              key={opt.letter}
              className={optionCls}
              onClick={() => !showFeedback && onAnswer(opt.letter)}
              disabled={showFeedback}
              type="button"
            >
              <span className={badgeCls}>{opt.letter.toUpperCase()}</span>
              <span className="pt-0.5 text-sm leading-snug flex-1 text-left">{opt.text}</span>
              {showFeedback && isAnswerOpt && (
                <CheckCircle size={18} className="ml-auto shrink-0 text-green-600 mt-0.5" />
              )}
              {showFeedback && isWrongSelected && (
                <XCircle size={18} className="ml-auto shrink-0 text-red-500 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback après validation */}
      {showFeedback && (
        <div className={
          isCorrect
            ? 'rounded-xl p-4 mb-4 bg-green-50 border border-green-200'
            : 'rounded-xl p-4 mb-4 bg-red-50 border border-red-200'
        }>
          <div className="flex gap-2 items-start mb-2">
            {isCorrect
              ? <CheckCircle size={18} className="shrink-0 text-green-600 mt-0.5" />
              : <XCircle size={18} className="shrink-0 text-red-500 mt-0.5" />
            }
            <p className={isCorrect ? 'font-semibold text-sm text-green-800' : 'font-semibold text-sm text-red-800'}>
              {isCorrect
                ? 'Bonne réponse !'
                : `Mauvaise réponse — La bonne réponse était ${answer.toUpperCase()}`}
            </p>
          </div>

          {explanation && (
            <div className="flex gap-1 items-start ml-6">
              <Info size={13} className="shrink-0 mt-0.5 text-gray-400" />
              <p className="text-sm text-gray-600">{explanation}</p>
            </div>
          )}

          {source && (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 ml-6 text-xs text-indigo-600 underline"
            >
              <ExternalLink size={12} />
              {source.label}
            </a>
          )}
        </div>
      )}

      {/* Boutons navigation */}
      <div className="flex gap-3">
        {!isFirst && (
          <button
            type="button"
            onClick={onPrev}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-600 text-sm"
          >
            <ChevronLeft size={16} />
            Précédent
          </button>
        )}

        {!showFeedback ? (
          <button
            type="button"
            onClick={onValidate}
            disabled={!canValidate}
            className={
              canValidate
                ? 'ml-auto flex items-center gap-1 px-5 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white'
                : 'ml-auto flex items-center gap-1 px-5 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          >
            Valider
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="ml-auto flex items-center gap-1 px-5 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white"
          >
            {isLast ? 'Voir les résultats' : 'Question suivante'}
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

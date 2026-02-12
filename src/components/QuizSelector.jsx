import { BookOpen, PlayCircle } from 'lucide-react';

export default function QuizSelector({ quizzes, selected, onSelect, onStart }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">

        {/* En-tête */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-100 p-2.5 rounded-xl">
            <BookOpen size={24} className="text-indigo-700" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Choisir un QCM</h2>
            <p className="text-sm text-gray-500">Gardien de la Paix — Culture générale</p>
          </div>
        </div>

        {/* Liste des QCM */}
        <div className="space-y-2 mb-6">
          {quizzes.map((q) => (
            <button
              key={q.filename}
              type="button"
              onClick={() => onSelect(q.filename)}
              className={
                selected === q.filename
                  ? 'w-full text-left px-4 py-3 rounded-xl border-2 border-indigo-500 bg-indigo-50 text-indigo-800 font-medium text-sm transition-colors'
                  : 'w-full text-left px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-700 text-sm hover:border-indigo-300 hover:bg-indigo-50 transition-colors'
              }
            >
              <span className="font-semibold">{q.label}</span>
              <span className="ml-2 text-xs text-gray-400">{q.filename}</span>
            </button>
          ))}
        </div>

        {/* Bouton Démarrer */}
        <button
          type="button"
          onClick={onStart}
          disabled={!selected}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-base disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
        >
          <PlayCircle size={20} />
          Démarrer le QCM
        </button>
      </div>
    </div>
  );
}

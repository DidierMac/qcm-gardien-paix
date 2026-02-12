import { BookOpen, Award } from 'lucide-react';

export default function QuizHeader({ title, filename, current, total, liveScore }) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <header className="bg-indigo-700 text-white px-4 py-4 shadow-md">
      <div className="max-w-2xl mx-auto">
        {/* Titre + score en temps réel */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <BookOpen size={20} className="shrink-0" />
            <div className="min-w-0">
              <h1 className="text-base font-semibold leading-tight truncate">{title}</h1>
              {filename && (
                <p className="text-xs text-indigo-300 leading-tight">{filename}</p>
              )}
            </div>
          </div>
          {liveScore !== undefined && (
            <div className="flex items-center gap-1 bg-indigo-600 rounded-lg px-2 py-1 shrink-0">
              <Award size={14} />
              <span className="text-sm font-bold">{liveScore}/{total}</span>
            </div>
          )}
        </div>

        {/* Progression textuelle */}
        <div className="flex justify-between text-sm text-indigo-200 mb-1">
          <span>Question {current} / {total}</span>
          <span>{percentage}%</span>
        </div>

        {/* Barre de progression */}
        <div className="w-full bg-indigo-900 rounded-full h-2">
          <div
            className="bg-white rounded-full h-2 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </header>
  );
}

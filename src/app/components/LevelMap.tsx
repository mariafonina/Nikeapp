import { UserProgress } from '@/app/App';
import { JourneyTracker } from '@/app/components/JourneyTracker';
import naikImage from 'figma:asset/69b5262de568edb311edab8d0a70fc08afa221f4.png';

interface LevelMapProps {
  progress: UserProgress;
  onStartLevel: (level: number) => void;
}

const levels = [
  { number: 1, title: 'Начало путешествия', description: 'Найк ищет дорогу домой' },
  { number: 2, title: 'Через парк', description: 'Найк идёт через парк' },
  { number: 3, title: 'У речки', description: 'Найк переходит мостик' },
  { number: 4, title: 'В лесу', description: 'Найк проходит через лес' },
  { number: 5, title: 'Близко к дому', description: 'Найк почти дома' },
  { number: 6, title: 'Дома!', description: 'Найк возвращается к папе' },
];

export function LevelMap({ progress, onStartLevel }: LevelMapProps) {
  const currentLevel = Math.floor(progress.completedExercises / 4) + 1;
  const todayLevel = progress.currentDay;
  const canPlayToday = todayLevel <= levels.length && !progress.todayCompleted;

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      {/* Header with Naik */}
      <div className="text-center mb-12">
        <div className="w-24 h-24 mx-auto mb-6">
          <img src={naikImage} alt="Найк" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-3xl font-light text-gray-900 mb-3 tracking-tight">
          День {todayLevel}
        </h1>
        <p className="text-gray-400 font-light">
          {canPlayToday ? 'Помоги Найку пройти дальше' : 'Отлично! Возвращайся завтра'}
        </p>
      </div>

      {/* Journey Tracker */}
      <JourneyTracker progress={progress} />

      {/* Level Progress Path */}
      <div className="space-y-6 mb-12">
        {levels.map((level) => {
          const isCompleted = level.number < todayLevel;
          const isCurrent = level.number === todayLevel;
          const isLocked = level.number > todayLevel;
          
          return (
            <div key={level.number} className="relative">
              {/* Connection line */}
              {level.number < levels.length && (
                <div className="absolute left-8 top-16 w-0.5 h-12 bg-gray-200" />
              )}
              
              <button
                onClick={() => isCurrent && canPlayToday && onStartLevel(level.number)}
                disabled={isLocked || (isCurrent && !canPlayToday)}
                className={`w-full bg-white border rounded-3xl p-6 transition-all text-left ${
                  isCurrent && canPlayToday
                    ? 'border-gray-900 hover:bg-gray-50 active:scale-[0.98]'
                    : isCompleted
                    ? 'border-gray-200 opacity-60'
                    : 'border-gray-100 opacity-30'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl flex-shrink-0 ${
                    isCompleted
                      ? 'bg-gray-900 text-white'
                      : isCurrent
                      ? 'border-2 border-gray-900 text-gray-900'
                      : 'border border-gray-200 text-gray-300'
                  }`}>
                    {isCompleted ? '✓' : level.number}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-normal text-gray-900 mb-1">
                      {level.title}
                    </h3>
                    <p className="text-sm text-gray-400 font-light">
                      {level.description}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <div className="text-2xl mb-1">🦴</div>
            <div className="text-2xl font-light text-gray-900">{progress.bones}</div>
            <div className="text-xs text-gray-400 font-light">косточек</div>
          </div>
          <div className="w-px h-12 bg-gray-200" />
          <div className="text-center flex-1">
            <div className="text-2xl mb-1">📅</div>
            <div className="text-2xl font-light text-gray-900">{todayLevel}</div>
            <div className="text-xs text-gray-400 font-light">день</div>
          </div>
        </div>
      </div>
    </div>
  );
}
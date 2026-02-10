import { UserProgress } from '@/app/App';
import naikImage from 'figma:asset/69b5262de568edb311edab8d0a70fc08afa221f4.png';

interface Quest {
  id: string;
  title: string;
  description: string;
  requiredLevel: number;
  icon: string;
}

const quests: Quest[] = [
  {
    id: 'vocabulary',
    title: 'Словарик',
    description: 'Запомни словарные слова',
    requiredLevel: 1,
    icon: '📝',
  },
  {
    id: 'silent-letters',
    title: 'Тихие буквы',
    description: 'Непроизносимые согласные',
    requiredLevel: 1,
    icon: '🤫',
  },
  {
    id: 'chu-schu',
    title: 'ЧУ-ЩУ',
    description: 'Пиши с буквой У',
    requiredLevel: 1,
    icon: '✏️',
  },
  {
    id: 'paired-consonants',
    title: 'Хитрые согласные',
    description: 'Проверяй парные согласные',
    requiredLevel: 2,
    icon: '🔍',
  },
  {
    id: 'prepositions',
    title: 'Предлоги',
    description: 'Пиши раздельно',
    requiredLevel: 2,
    icon: '📏',
  },
  {
    id: 'dictation',
    title: 'Диктант',
    description: 'Слушай и пиши правильно',
    requiredLevel: 3,
    icon: '🎧',
  },
];

interface QuestMapProps {
  progress: UserProgress;
  onStartQuest: (questId: string) => void;
}

export function QuestMap({ progress, onStartQuest }: QuestMapProps) {
  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-light text-gray-900 mb-3 tracking-tight">
          Задания
        </h1>
        <p className="text-gray-400 font-light">
          Выбери для начала
        </p>
      </div>

      <div className="space-y-3">
        {quests.map((quest) => {
          const isUnlocked = progress.level >= quest.requiredLevel;
          const isCompleted = progress.completedQuests.includes(quest.id);
          
          return (
            <button
              key={quest.id}
              onClick={() => isUnlocked && onStartQuest(quest.id)}
              disabled={!isUnlocked}
              className={`w-full bg-white border border-gray-100 rounded-3xl p-6 transition-all ${
                isUnlocked 
                  ? 'hover:border-gray-200 active:scale-[0.98]' 
                  : 'opacity-30'
              } relative`}
            >
              {isCompleted && (
                <div className="absolute top-6 right-6">
                  <div className="w-2 h-2 bg-gray-900 rounded-full" />
                </div>
              )}
              
              {!isUnlocked && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center backdrop-blur-sm rounded-3xl">
                  <span className="text-xs text-gray-400 font-light">
                    Уровень {quest.requiredLevel}
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 flex items-center justify-center text-2xl">
                  {quest.icon}
                </div>
                
                <div className="flex-1 text-left">
                  <h3 className="font-normal text-base text-gray-900 mb-1">{quest.title}</h3>
                  <p className="text-sm text-gray-400 font-light">{quest.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-16 flex justify-center">
        <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-full py-4 px-6">
          <div className="w-10 h-10 flex-shrink-0">
            <img src={naikImage} alt="Найк" className="w-full h-full object-contain" />
          </div>
          <p className="text-sm text-gray-500 font-light">
            {progress.todayCompleted 
              ? 'Отличная работа' 
              : 'Начни с любого задания'}
          </p>
        </div>
      </div>
    </div>
  );
}

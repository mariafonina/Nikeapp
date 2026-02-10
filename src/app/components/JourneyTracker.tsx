import { UserProgress } from '@/app/App';
import { motion } from 'motion/react';

interface JourneyTrackerProps {
  progress: UserProgress;
}

export function JourneyTracker({ progress }: JourneyTrackerProps) {
  // Calculate total days to show (30 days journey)
  const totalDays = 30;
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Get completed days from localStorage
  const completedDaysKey = `completedDays_${currentYear}_${currentMonth}`;
  const completedDaysStr = localStorage.getItem(completedDaysKey);
  const completedDays = completedDaysStr ? JSON.parse(completedDaysStr) : [];

  // Add today if completed
  if (progress.todayCompleted && !completedDays.includes(today.getDate())) {
    const newCompletedDays = [...completedDays, today.getDate()];
    localStorage.setItem(completedDaysKey, JSON.stringify(newCompletedDays));
  }

  // Calculate streak
  const streak = calculateStreak(completedDays, today.getDate());

  // Get the current day number (1-30)
  const currentDayInMonth = today.getDate();

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-6 mb-8 border border-orange-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-normal text-gray-900 mb-1">
            Путь Найка домой 🐾
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <p className="text-base text-gray-600 font-light">
              Серия: <span className="font-normal">{streak}</span> {getDayWord(streak)}
            </p>
          </div>
        </div>
        <div className="text-5xl animate-bounce">
          🦴
        </div>
      </div>

      {/* Journey Path - snake pattern */}
      <div className="relative">
        {/* Top row (days 1-10) - left to right */}
        <div className="flex items-center justify-between mb-4">
          {Array.from({ length: 10 }).map((_, index) => {
            const day = index + 1;
            return renderPawPrint(day, currentDayInMonth, completedDays, progress.todayCompleted);
          })}
        </div>

        {/* Arrow down */}
        <div className="flex justify-end mb-4">
          <div className="text-3xl text-gray-300">↓</div>
        </div>

        {/* Middle row (days 11-20) - right to left */}
        <div className="flex items-center justify-between mb-4 flex-row-reverse">
          {Array.from({ length: 10 }).map((_, index) => {
            const day = 11 + index;
            return renderPawPrint(day, currentDayInMonth, completedDays, progress.todayCompleted);
          })}
        </div>

        {/* Arrow down */}
        <div className="flex justify-start mb-4">
          <div className="text-3xl text-gray-300">↓</div>
        </div>

        {/* Bottom row (days 21-30) - left to right */}
        <div className="flex items-center justify-between">
          {Array.from({ length: 10 }).map((_, index) => {
            const day = 21 + index;
            return renderPawPrint(day, currentDayInMonth, completedDays, progress.todayCompleted);
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6 bg-white/50 rounded-full h-3 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(completedDays.length / totalDays) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <p className="text-center text-sm text-gray-500 font-light mt-2">
        {completedDays.length} из {totalDays} дней пройдено
      </p>
    </div>
  );
}

function renderPawPrint(
  day: number,
  currentDay: number,
  completedDays: number[],
  todayCompleted: boolean
) {
  const isCompleted = completedDays.includes(day);
  const isToday = day === currentDay;
  const isFuture = day > currentDay;

  return (
    <motion.div
      key={day}
      className="relative flex-shrink-0"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: day * 0.02, type: "spring", stiffness: 200 }}
    >
      {isCompleted ? (
        // Completed day - filled paw with bone
        <motion.div
          className="w-10 h-10 flex items-center justify-center relative"
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-3xl">
            🐾
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-sm">
            🦴
          </div>
        </motion.div>
      ) : isToday ? (
        // Today - highlighted paw
        <motion.div
          className="w-10 h-10 flex items-center justify-center relative"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <div className="absolute inset-0 bg-yellow-300 rounded-full blur-md opacity-50" />
          <div className="relative text-3xl filter drop-shadow-lg">
            {todayCompleted ? '🐾' : '⭐'}
          </div>
          <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-light text-gray-600 whitespace-nowrap">
            {day}
          </div>
        </motion.div>
      ) : isFuture ? (
        // Future day - faded outline
        <div className="w-10 h-10 flex items-center justify-center relative opacity-30">
          <div className="text-2xl">○</div>
          <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-light text-gray-400 whitespace-nowrap">
            {day}
          </div>
        </div>
      ) : (
        // Past day - missed
        <div className="w-10 h-10 flex items-center justify-center relative opacity-50">
          <div className="text-2xl text-gray-400">✕</div>
          <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-light text-gray-400 whitespace-nowrap">
            {day}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function calculateStreak(completedDays: number[], today: number): number {
  if (completedDays.length === 0) return 0;

  const sorted = [...completedDays].sort((a, b) => b - a);
  let streak = 0;
  let expectedDay = today;

  for (const day of sorted) {
    if (day === expectedDay || day === expectedDay - 1) {
      streak++;
      expectedDay = day - 1;
    } else {
      break;
    }
  }

  return streak;
}

function getDayWord(count: number): string {
  if (count % 10 === 1 && count % 100 !== 11) return 'день';
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'дня';
  return 'дней';
}

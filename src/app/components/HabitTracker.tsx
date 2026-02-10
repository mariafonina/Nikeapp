import { UserProgress } from '@/app/App';

interface HabitTrackerProps {
  progress: UserProgress;
}

export function HabitTracker({ progress }: HabitTrackerProps) {
  // Calculate the days for the current month
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Get completed days from localStorage
  const completedDaysKey = `completedDays_${currentYear}_${currentMonth}`;
  const completedDaysStr = localStorage.getItem(completedDaysKey);
  const completedDays = completedDaysStr ? JSON.parse(completedDaysStr) : [];

  // Add today if completed
  if (progress.todayCompleted && !completedDays.includes(today.getDate())) {
    const newCompletedDays = [...completedDays, today.getDate()];
    localStorage.setItem(completedDaysKey, JSON.stringify(newCompletedDays));
  }

  const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  // Calculate streak
  const streak = calculateStreak(completedDays, today.getDate());

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-normal text-gray-900 mb-1">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <p className="text-sm text-gray-400 font-light">
            Твоя серия: {streak} {getDayWord(streak)}
          </p>
        </div>
        <div className="text-3xl">🔥</div>
      </div>

      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs text-gray-400 font-light">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {/* Days of the month */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const isToday = day === today.getDate();
          const isCompleted = completedDays.includes(day);
          const isFuture = day > today.getDate();

          return (
            <div
              key={day}
              className={`aspect-square rounded-xl flex items-center justify-center text-sm font-light transition-all ${
                isCompleted
                  ? 'bg-gray-900 text-white'
                  : isToday
                  ? 'border-2 border-gray-900 text-gray-900'
                  : isFuture
                  ? 'text-gray-300'
                  : 'text-gray-400 border border-gray-100'
              }`}
            >
              {isCompleted ? '🦴' : day}
            </div>
          );
        })}
      </div>
    </div>
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

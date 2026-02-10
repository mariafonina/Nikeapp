import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Check, X } from 'lucide-react';

const questions = [
  {
    word: 'лес_ница',
    correctAnswer: 'лестница',
    options: ['лесница', 'лестница', 'лестьница'],
    explanation: 'В слове "лестница" есть непроизносимая Т',
  },
  {
    word: 'прекрас_ный',
    correctAnswer: 'прекрасный',
    options: ['прекрастный', 'прекрасный', 'прикрасный'],
    explanation: 'В слове "прекрасный" НЕТ буквы Т',
  },
  {
    word: 'интерес_ный',
    correctAnswer: 'интересный',
    options: ['интерестный', 'интересный', 'интиресный'],
    explanation: 'В слове "интересный" НЕТ буквы Т',
  },
  {
    word: 'сер_це',
    correctAnswer: 'сердце',
    options: ['сердце', 'серце', 'сертце'],
    explanation: 'В слове "сердце" есть непроизносимая Д',
  },
  {
    word: 'со_нце',
    correctAnswer: 'солнце',
    options: ['сонце', 'солнце', 'сольнце'],
    explanation: 'В слове "солнце" есть непроизносимая Л',
  },
];

interface SilentLettersExerciseProps {
  onComplete: (questId: string, bones: number) => void;
}

export function SilentLettersExercise({ onComplete }: SilentLettersExerciseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const checkAnswer = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setShowResult(true);
    
    if (isCorrect) {
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        const bones = score + (isCorrect ? 1 : 0);
        onComplete('silent-letters', bones);
      }
    }, 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-8 relative overflow-hidden">
      {/* Confetti animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random() * 0.5}s`,
              }}
            >
              {['🦴', '⭐', '✨'][Math.floor(Math.random() * 3)]}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-200px) rotate(360deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 1.5s ease-out forwards;
        }
        @keyframes scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-scale {
          animation: scale 0.5s ease-in-out;
        }
      `}</style>

      <div className="text-center mb-12">
        <h2 className="text-2xl font-light text-gray-900 mb-3 tracking-tight">
          Тихие буквы
        </h2>
        <p className="text-gray-400 font-light">
          Найди правильное написание
        </p>
      </div>

      <div className="mb-12">
        <div className="flex justify-between text-sm text-gray-400 mb-4 font-light">
          <span>{currentIndex + 1} / {questions.length}</span>
          <span>{score} правильно</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1">
          <div
            className="bg-gray-900 h-1 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {!showResult ? (
        <div className="space-y-8">
          <div className="text-center py-8">
            <p className="text-3xl font-light text-gray-900 tracking-wide">
              {currentQuestion.word}
            </p>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option;

              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`w-full p-5 rounded-full font-light transition-all ${
                    isSelected
                      ? 'bg-gray-100 text-gray-900'
                      : 'border border-gray-200 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          <Button
            onClick={checkAnswer}
            disabled={!selectedAnswer}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-full py-6 font-light tracking-wide"
          >
            Проверить
          </Button>
        </div>
      ) : (
        <div className="text-center py-12">
          {selectedAnswer === currentQuestion.correctAnswer ? (
            <>
              <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-8 animate-scale">
                <Check className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                {currentQuestion.correctAnswer.toUpperCase()}
              </h3>
              <p className="text-lg text-gray-500 font-light mb-2">
                {currentQuestion.explanation}
              </p>
              <div className="mt-6 text-3xl">🦴 +1</div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 border-2 border-gray-900 rounded-full flex items-center justify-center mx-auto mb-8">
                <X className="w-10 h-10 text-gray-900" strokeWidth={2} />
              </div>
              <h3 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                {currentQuestion.correctAnswer.toUpperCase()}
              </h3>
              <p className="text-lg text-gray-500 font-light">
                {currentQuestion.explanation}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
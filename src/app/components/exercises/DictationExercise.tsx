import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Volume2, VolumeX, Check, X } from 'lucide-react';

const dictationWords = [
  { word: 'ракета', hint: '🚀' },
  { word: 'лестница', hint: '🪜' },
  { word: 'чувство', hint: '💖' },
  { word: 'четверг', hint: '📅' },
  { word: 'до свидания', hint: '👋' },
  { word: 'столица', hint: '🏛️' },
  { word: 'прекрасный', hint: '✨' },
  { word: 'интересный', hint: '📚' },
];

interface DictationExerciseProps {
  onComplete: (questId: string, bones: number) => void;
}

export function DictationExercise({ onComplete }: DictationExerciseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [canSpeak, setCanSpeak] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentWord = dictationWords[currentIndex];

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setCanSpeak(true);
    }
  }, []);

  const speakWord = () => {
    if (!canSpeak || isSpeaking) return;

    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.lang = 'ru-RU';
    utterance.rate = 0.8;
    utterance.pitch = 1.2;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const checkAnswer = () => {
    const normalizedAnswer = userAnswer.toLowerCase().trim();
    const normalizedCorrect = currentWord.word.toLowerCase().trim();
    const isCorrect = normalizedAnswer === normalizedCorrect;
    
    setShowResult(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    }

    setTimeout(() => {
      if (currentIndex < dictationWords.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setUserAnswer('');
        setShowResult(null);
      } else {
        const bones = score + (isCorrect ? 1 : 0);
        onComplete('dictation', bones);
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
          Диктант
        </h2>
        <p className="text-gray-400 font-light">
          Слушай и пиши
        </p>
      </div>

      <div className="mb-12">
        <div className="flex justify-between text-sm text-gray-400 mb-4 font-light">
          <span>{currentIndex + 1} / {dictationWords.length}</span>
          <span>{score} правильно</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1">
          <div
            className="bg-gray-900 h-1 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / dictationWords.length) * 100}%` }}
          />
        </div>
      </div>

      {!showResult ? (
        <div className="space-y-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-8">{currentWord.hint}</div>
            
            {canSpeak ? (
              <button
                onClick={speakWord}
                disabled={isSpeaking}
                className={`inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-light transition-all ${
                  isSpeaking ? 'opacity-50' : ''
                }`}
              >
                <Volume2 className="w-5 h-5" strokeWidth={1.5} />
                <span>{isSpeaking ? 'Слушай' : 'Прослушать'}</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-3 border border-gray-200 px-8 py-4 rounded-full">
                <VolumeX className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                <span className="text-sm text-gray-400 font-light">
                  {currentWord.word}
                </span>
              </div>
            )}
          </div>

          <div>
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Введи слово"
              className="text-lg text-center border-gray-200 rounded-2xl py-6 font-light"
              onKeyDown={(e) => e.key === 'Enter' && userAnswer && checkAnswer()}
              autoFocus
            />
          </div>

          <Button
            onClick={checkAnswer}
            disabled={!userAnswer}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-full py-6 font-light tracking-wide"
          >
            Проверить
          </Button>
        </div>
      ) : (
        <div className="text-center py-12">
          {showResult === 'correct' ? (
            <>
              <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-8 animate-scale">
                <Check className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                {currentWord.word.toUpperCase()}
              </h3>
              <p className="text-lg text-gray-500 font-light mb-2">
                Отлично! Запомни это слово
              </p>
              <div className="mt-6 text-3xl">🦴 +1</div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 border-2 border-gray-900 rounded-full flex items-center justify-center mx-auto mb-8">
                <X className="w-10 h-10 text-gray-900" strokeWidth={2} />
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-400 font-light mb-2">Ты написала:</p>
                <p className="text-2xl text-gray-400 line-through">{userAnswer}</p>
              </div>
              <h3 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                {currentWord.word.toUpperCase()}
              </h3>
              <p className="text-lg text-gray-500 font-light">
                Запомни правильное написание
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
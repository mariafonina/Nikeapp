import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { VocabularyExercise } from '@/app/components/exercises/VocabularyExercise';
import { SilentLettersExercise } from '@/app/components/exercises/SilentLettersExercise';
import { ChuSchuExercise } from '@/app/components/exercises/ChuSchuExercise';
import { DictationExercise } from '@/app/components/exercises/DictationExercise';
import { PairedConsonantsExercise } from '@/app/components/exercises/PairedConsonantsExercise';
import { PrepositionsExercise } from '@/app/components/exercises/PrepositionsExercise';

interface LevelProps {
  levelNumber: number;
  onComplete: (bonesEarned: number) => void;
  onBack: () => void;
}

export function Level({ levelNumber, onComplete, onBack }: LevelProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [totalBones, setTotalBones] = useState(0);

  // Each level has 4 exercises in sequence
  const exercises = [
    { type: 'vocabulary', component: VocabularyExercise },
    { type: 'silent-letters', component: SilentLettersExercise },
    { type: 'chu-schu', component: ChuSchuExercise },
    { type: 'dictation', component: DictationExercise },
  ];

  // Add variety for different levels
  if (levelNumber >= 2) {
    exercises[1] = { type: 'paired-consonants', component: PairedConsonantsExercise };
  }
  if (levelNumber >= 3) {
    exercises[2] = { type: 'prepositions', component: PrepositionsExercise };
  }

  const CurrentExerciseComponent = exercises[currentExerciseIndex].component;

  const handleExerciseComplete = (questId: string, bones: number) => {
    const newTotal = totalBones + bones;
    setTotalBones(newTotal);

    // Move to next exercise or complete level
    if (currentExerciseIndex < exercises.length - 1) {
      setTimeout(() => {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
      }, 2000);
    } else {
      setTimeout(() => {
        onComplete(newTotal);
      }, 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-50 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
        </button>
        
        <div className="text-center">
          <div className="text-sm text-gray-400 font-light mb-1">
            Задание {currentExerciseIndex + 1} из {exercises.length}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🦴</span>
            <span className="text-lg font-light text-gray-900">{totalBones}</span>
          </div>
        </div>

        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
        {exercises.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              index === currentExerciseIndex
                ? 'w-8 bg-gray-900'
                : index < currentExerciseIndex
                ? 'w-1.5 bg-gray-900'
                : 'w-1.5 bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Exercise */}
      <CurrentExerciseComponent onComplete={handleExerciseComplete} />
    </div>
  );
}

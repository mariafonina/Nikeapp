import { ArrowLeft } from 'lucide-react';
import { VocabularyExercise } from '@/app/components/exercises/VocabularyExercise';
import { SilentLettersExercise } from '@/app/components/exercises/SilentLettersExercise';
import { ChuSchuExercise } from '@/app/components/exercises/ChuSchuExercise';
import { PairedConsonantsExercise } from '@/app/components/exercises/PairedConsonantsExercise';
import { PrepositionsExercise } from '@/app/components/exercises/PrepositionsExercise';
import { DictationExercise } from '@/app/components/exercises/DictationExercise';

interface ExerciseProps {
  questId: string;
  onComplete: (questId: string, stars: number) => void;
  onBack: () => void;
}

export function Exercise({ questId, onComplete, onBack }: ExerciseProps) {
  const renderExercise = () => {
    switch (questId) {
      case 'vocabulary':
        return <VocabularyExercise onComplete={onComplete} />;
      case 'silent-letters':
        return <SilentLettersExercise onComplete={onComplete} />;
      case 'chu-schu':
        return <ChuSchuExercise onComplete={onComplete} />;
      case 'paired-consonants':
        return <PairedConsonantsExercise onComplete={onComplete} />;
      case 'prepositions':
        return <PrepositionsExercise onComplete={onComplete} />;
      case 'dictation':
        return <DictationExercise onComplete={onComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <button
        onClick={onBack}
        className="mb-6 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all"
      >
        <ArrowLeft className="w-5 h-5 text-purple-900" />
      </button>
      
      {renderExercise()}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Header } from '@/app/components/Header';
import { LevelMap } from '@/app/components/LevelMap';
import { ReadingDiary } from '@/app/components/ReadingDiary';
import { Level } from '@/app/components/Level';
import { Celebration } from '@/app/components/Celebration';
import { WelcomeScreen } from '@/app/components/WelcomeScreen';

export type Screen = 'welcome' | 'map' | 'diary' | 'level' | 'celebration';

export interface UserProgress {
  currentDay: number;
  bones: number;
  completedExercises: number;
  diaryEntries: DiaryEntry[];
  todayCompleted: boolean;
  lastPlayedDate: string;
}

export interface DiaryEntry {
  id: string;
  date: string;
  bookTitle: string;
  pages: number;
  thoughts: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const [celebrationBones, setCelebrationBones] = useState(0);
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('corgiQuestProgress');
    if (saved) {
      const data = JSON.parse(saved);
      // Check if it's a new day
      const today = new Date().toDateString();
      if (data.lastPlayedDate !== today) {
        return {
          ...data,
          todayCompleted: false,
          lastPlayedDate: today,
        };
      }
      return data;
    }
    return {
      currentDay: 1,
      bones: 0,
      completedExercises: 0,
      diaryEntries: [],
      todayCompleted: false,
      lastPlayedDate: new Date().toDateString(),
    };
  });

  useEffect(() => {
    localStorage.setItem('corgiQuestProgress', JSON.stringify(progress));
  }, [progress]);

  const handleLevelComplete = (bonesEarned: number) => {
    setCelebrationBones(bonesEarned);
    setProgress((prev) => ({
      ...prev,
      bones: prev.bones + bonesEarned,
      completedExercises: prev.completedExercises + 4,
      currentDay: prev.currentDay + 1,
      todayCompleted: true,
    }));
    setCurrentScreen('celebration');
    setTimeout(() => {
      setCurrentScreen('map');
    }, 4000);
  };

  const handleStartLevel = (levelNumber: number) => {
    setCurrentLevel(levelNumber);
    setCurrentScreen('level');
  };

  const handleAddDiaryEntry = (entry: DiaryEntry) => {
    setProgress((prev) => ({
      ...prev,
      diaryEntries: [entry, ...prev.diaryEntries],
      bones: prev.bones + 2,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {currentScreen !== 'welcome' && currentScreen !== 'celebration' && (
        <Header 
          level={progress.currentDay} 
          stars={progress.bones} 
          onDiaryClick={() => setCurrentScreen('diary')}
          onMapClick={() => setCurrentScreen('map')}
        />
      )}
      
      <main className="pb-6">
        {currentScreen === 'welcome' && (
          <WelcomeScreen onStart={() => setCurrentScreen('map')} />
        )}

        {currentScreen === 'map' && (
          <LevelMap 
            progress={progress}
            onStartLevel={handleStartLevel}
          />
        )}
        
        {currentScreen === 'diary' && (
          <ReadingDiary 
            entries={progress.diaryEntries}
            onAddEntry={handleAddDiaryEntry}
            onBack={() => setCurrentScreen('map')}
          />
        )}
        
        {currentScreen === 'level' && currentLevel && (
          <Level 
            levelNumber={currentLevel}
            onComplete={handleLevelComplete}
            onBack={() => setCurrentScreen('map')}
          />
        )}
        
        {currentScreen === 'celebration' && currentLevel && (
          <Celebration 
            bones={celebrationBones}
            levelNumber={currentLevel}
          />
        )}
      </main>
    </div>
  );
}

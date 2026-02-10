import { Star, BookOpen, Map } from 'lucide-react';

interface HeaderProps {
  level: number;
  stars: number;
  onDiaryClick: () => void;
  onMapClick: () => void;
}

export function Header({ level, stars, onDiaryClick, onMapClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 py-6 sticky top-0 z-50">
      <div className="max-w-md mx-auto px-6 flex items-center justify-between">
        <button 
          onClick={onMapClick}
          className="p-2 hover:bg-gray-50 rounded-full transition-colors"
        >
          <Map className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
        </button>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 font-light">День</span>
            <span className="text-sm text-gray-900 font-normal">{level}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-base">🦴</span>
            <span className="text-sm text-gray-900 font-normal">{stars}</span>
          </div>
        </div>
        
        <button 
          onClick={onDiaryClick}
          className="p-2 hover:bg-gray-50 rounded-full transition-colors"
        >
          <BookOpen className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
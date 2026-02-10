import { useEffect, useState } from 'react';
import naikImage from 'figma:asset/69b5262de568edb311edab8d0a70fc08afa221f4.png';

interface CelebrationProps {
  bones: number;
  levelNumber: number;
}

export function Celebration({ bones, levelNumber }: CelebrationProps) {
  const [visible, setVisible] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: string; delay: string }>>([]);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    
    const items = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
    }));
    setConfetti(items);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      {/* Confetti */}
      {confetti.map((item) => (
        <div
          key={item.id}
          className="absolute text-3xl animate-fall"
          style={{
            left: item.left,
            top: '-50px',
            animationDelay: item.delay,
          }}
        >
          {['🦴', '⭐', '✨', '🎉'][Math.floor(Math.random() * 4)]}
        </div>
      ))}

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(120vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall 3s ease-in forwards;
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
      `}</style>

      <div 
        className={`text-center px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="w-32 h-32 mx-auto mb-12 animate-scale-in">
          <img src={naikImage} alt="Найк" className="w-full h-full object-contain" />
        </div>
        
        <h1 className="text-5xl font-light text-gray-900 mb-8 tracking-tight">
          День {levelNumber}<br />пройден!
        </h1>
        
        <div className="bg-gray-50 rounded-3xl p-10 mb-8 border border-gray-100 inline-block">
          <div className="flex items-center justify-center gap-4">
            <span className="text-6xl">🦴</span>
            <span className="text-6xl font-light text-gray-900">+{bones}</span>
          </div>
        </div>

        <p className="text-lg text-gray-400 font-light">
          Найк стал на шаг ближе к дому!
        </p>
      </div>
    </div>
  );
}

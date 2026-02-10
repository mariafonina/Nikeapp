import { Button } from '@/app/components/ui/button';
import naikImage from 'figma:asset/69b5262de568edb311edab8d0a70fc08afa221f4.png';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <div className="text-center">
          {/* Naik Image */}
          <div className="mb-12 flex justify-center relative">
            <div className="relative">
              <img 
                src={naikImage} 
                alt="Найк корги" 
                className="w-48 h-48 object-contain"
              />
              {/* Lost indicator */}
              <div className="absolute -top-2 -right-2 text-4xl animate-bounce">
                😰
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <h1 className="text-4xl font-light text-gray-900 mb-6 tracking-tight">
            Привет, Саша!
          </h1>
          
          <div className="bg-gray-50 rounded-3xl p-8 mb-12 border border-gray-100">
            <p className="text-lg text-gray-900 leading-relaxed font-light mb-4">
              Помоги Найку найти дорогу домой и пройди вместе с ним приключения.
            </p>
            <p className="text-gray-500 font-light leading-relaxed">
              Найк гулял с папой и убежал за соседской собакой... Теперь он потерялся!
            </p>
          </div>

          {/* Start Button */}
          <Button
            onClick={onStart}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-full py-6 text-base font-normal tracking-wide transition-all active:scale-[0.97]"
          >
            Помочь Найку
          </Button>

          <p className="text-sm text-gray-400 mt-8 font-light">
            1 день = 1 уровень • 20 минут
          </p>
        </div>
      </div>
    </div>
  );
}

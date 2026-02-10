import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { DiaryEntry } from '@/app/App';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';

interface ReadingDiaryProps {
  entries: DiaryEntry[];
  onAddEntry: (entry: DiaryEntry) => void;
  onBack: () => void;
}

export function ReadingDiary({ entries, onAddEntry, onBack }: ReadingDiaryProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [pages, setPages] = useState('');
  const [thoughts, setThoughts] = useState('');

  const handleSubmit = () => {
    if (bookTitle && pages && thoughts) {
      const entry: DiaryEntry = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('ru-RU'),
        bookTitle,
        pages: parseInt(pages),
        thoughts,
      };
      onAddEntry(entry);
      setBookTitle('');
      setPages('');
      setThoughts('');
      setIsAdding(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-12">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-50 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
        </button>
        <h1 className="text-2xl font-light text-gray-900 tracking-tight">Дневник чтения</h1>
      </div>

      {!isAdding ? (
        <>
          <button
            onClick={() => setIsAdding(true)}
            className="w-full bg-gray-900 text-white py-5 rounded-full mb-12 hover:bg-gray-800 transition-all active:scale-[0.98] font-light tracking-wide"
          >
            Добавить запись
          </button>

          <div className="space-y-4">
            {entries.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 font-light">
                  Здесь будут твои записи
                </p>
                <p className="text-sm text-gray-300 mt-2 font-light">
                  +2 🦴 за каждую
                </p>
              </div>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white border border-gray-100 rounded-3xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-normal text-gray-900">{entry.bookTitle}</h3>
                    <span className="text-xs text-gray-400 font-light">{entry.date}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3 font-light">
                    {entry.pages} стр.
                  </p>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {entry.thoughts}
                  </p>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-3 font-light">
              Название книги
            </label>
            <Input
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder="Волшебник Изумрудного города"
              className="border-gray-200 rounded-2xl font-light"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-3 font-light">
              Страниц прочитано
            </label>
            <Input
              type="number"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder="10"
              className="border-gray-200 rounded-2xl font-light"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-3 font-light">
              Твои мысли
            </label>
            <Textarea
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              placeholder="Что понравилось?"
              rows={4}
              className="border-gray-200 rounded-2xl resize-none font-light"
            />
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-full py-6 font-light tracking-wide"
            >
              Сохранить
            </Button>
            <Button
              onClick={() => setIsAdding(false)}
              variant="outline"
              className="w-full border-gray-200 text-gray-500 rounded-full py-6 font-light tracking-wide hover:bg-gray-50"
            >
              Отмена
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
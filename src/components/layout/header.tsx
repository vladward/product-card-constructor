import type { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-xs font-black text-white">V</span>
          </div>
          <span className="font-bold tracking-tight text-slate-800">
            Vladward<span className="text-blue-600">Studio</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Локальный режим (Mock Data)
          </span>
        </div>
      </div>
    </header>
  );
};

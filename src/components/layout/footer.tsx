import type { FC } from 'react';
import Link from 'next/link';

export const Footer: FC = () => {
  return (
    <footer className="border-t py-10 text-center text-[10px] tracking-[0.2em] text-slate-400 uppercase">
      © 2026{' '}
      <Link className="text-blue-300" href="https://github.com/vladward">
        Vladward
      </Link>{' '}
      Marketplace • Powered by Next.js & Shadcn
    </footer>
  );
};

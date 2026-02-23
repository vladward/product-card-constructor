import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Metadata } from 'next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Vladward Studio | Конструктор товаров',
  description: 'Умный инструмент для создания идеальных карточек товаров',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="sticky top-0 z-50 h-16 border-b bg-white/80 backdrop-blur-md">
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
        </nav>
        {children}
        <footer className="border-t py-10 text-center text-[10px] tracking-[0.2em] text-slate-400 uppercase">
          © 2026{' '}
          <Link className="text-blue-300" href="https://github.com/vladward">
            Vladward
          </Link>{' '}
          Marketplace • Powered by Next.js & Shadcn
        </footer>
      </body>
    </html>
  );
}

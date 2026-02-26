import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import { Toaster } from 'sonner';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Vladward Studio',
    default: 'Vladward Studio | Конструктор товаров',
  },
  description: 'Умный инструмент для создания идеальных карточек товаров',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

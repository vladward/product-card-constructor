'use client';

import { useRef, memo } from 'react';
import { Box, Zap } from 'lucide-react';

export const PreviewImage = memo(
  ({
    photos,
    hasCashback,
    cashback,
  }: {
    photos?: string[] | null;
    hasCashback: boolean;
    cashback: number;
  }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
      const el = scrollRef.current;
      if (!el) return;
      const startX = e.pageX - el.offsetLeft;
      const scrollLeft = el.scrollLeft;

      const onMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startX) * 2;
        el.scrollLeft = scrollLeft - walk;
      };

      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    };

    return (
      <div className="relative aspect-square overflow-hidden rounded-t-[2.5rem] bg-slate-100">
        {photos && photos.length > 0 ? (
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            className="scrollbar-hide flex h-full cursor-grab snap-x snap-mandatory overflow-x-auto select-none active:cursor-grabbing"
          >
            {photos.map((url, i) => (
              <div key={i} className="h-full min-w-full shrink-0 snap-center">
                <img
                  src={url}
                  alt=""
                  className="pointer-events-none h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <Box className="h-12 w-12 opacity-20" />
          </div>
        )}

        {hasCashback && cashback > 0 && (
          <div className="animate-in slide-in-from-left-full absolute top-4 left-0 z-10 flex items-center gap-1 rounded-r-xl bg-blue-600 px-3 py-1.5 text-[10px] font-black text-white shadow-lg duration-500">
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>{cashback}% КЭШБЭК</span>
          </div>
        )}
      </div>
    );
  }
);

PreviewImage.displayName = 'PreviewImage';

'use client';

import { memo } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

interface MediaSectionProps {
  photos: string[];
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (idx: number) => void;
}

export const MediaSection = memo(
  ({ photos, onUpload, onRemove }: MediaSectionProps) => (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 duration-500">
      <label className="group hover:border-brand-blue hover:bg-brand-blue/5 flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-slate-50/50 transition-all">
        <div className="mb-3 rounded-full bg-white p-3 shadow-sm transition-transform group-hover:scale-110">
          <Upload className="text-brand-blue h-5 w-5" />
        </div>
        <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
          Загрузить фото
        </span>
        <input
          type="file"
          multiple
          className="hidden"
          onChange={onUpload}
          accept="image/*"
        />
      </label>

      <div className="grid grid-cols-3 gap-3">
        {photos.map((url, i) => (
          <div
            key={url}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-100 bg-white"
          >
            <Image
              src={url}
              fill
              className="object-cover"
              alt="preview"
              unoptimized
            />
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => onRemove(i)}
                className="bg-destructive rounded-full p-2 text-white shadow-lg transition-transform hover:scale-110"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
);

MediaSection.displayName = 'MediaSection';

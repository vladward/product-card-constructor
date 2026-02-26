'use client';

import { memo } from 'react';
import { Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { StandardSection, SectionProps } from './StandardSection';

export const OthersSection = memo((props: SectionProps) => {
  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(props.data, null, 2));
    toast.success('JSON конфигурация скопирована');
  };

  return (
    <div className="space-y-8">
      <StandardSection {...props} />
      <Button
        variant="outline"
        onClick={handleCopyJson}
        className="w-full gap-2 rounded-2xl border-dashed border-slate-200 py-6 text-[10px] font-bold tracking-widest text-slate-500 uppercase hover:bg-slate-50"
      >
        <Code className="h-3.5 w-3.5" /> Экспортировать RAW JSON
      </Button>
    </div>
  );
});

OthersSection.displayName = 'OthersSection';

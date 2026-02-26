import { ChangeEvent, memo } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export const FormField = memo(
  ({
    id,
    label,
    value,
    type,
    onChange,
  }: {
    id: string;
    label: string;
    value: string | number;
    type: 'text' | 'number';
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <div className="animate-in fade-in slide-in-from-top-1 space-y-1.5 duration-300">
      <Label
        htmlFor={id}
        className="ml-1 text-[10px] font-black tracking-widest text-slate-400 uppercase"
      >
        {label}
      </Label>
      <Input
        id={id}
        className="focus-visible:ring-brand-blue/10 focus-visible:border-brand-blue h-11 rounded-xl border-slate-200 bg-white transition-all"
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  )
);

FormField.displayName = 'FormField';

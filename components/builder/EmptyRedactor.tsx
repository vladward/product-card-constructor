import type { FC } from 'react';
import { Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type EmptyRedactorProps = {
  reset: () => void;
};

const EmptyRedactor: FC<EmptyRedactorProps> = ({ reset }) => {
  return (
    <div className="col-span-9 flex min-h-[60vh] flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-slate-100 bg-white">
      <div className="mb-4 rounded-full bg-slate-50 p-6">
        <Box className="h-12 w-12 text-slate-200" />
      </div>
      <h3 className="text-xl font-black tracking-widest text-slate-400 uppercase">
        Список пуст
      </h3>
      <p className="mt-2 text-sm text-slate-400">
        Создайте новый товар или сбросьте фильтры, чтобы начать
      </p>
      <Button
        // onClick={() => actions.reset()}
        onClick={reset}
        variant="outline"
        className={cn(
          'mt-6 h-11 rounded-xl border-2 px-8 font-bold transition-all',
          'border-[#BFDBFE] bg-[#FFFFFF] text-[#2563EB]',
          'shadow-sm hover:border-[#3B82F6] hover:bg-[#EFF6FF] hover:text-[#1D4ED8]'
        )}
      >
        Восстановить моки
      </Button>
    </div>
  );
};

export default EmptyRedactor;

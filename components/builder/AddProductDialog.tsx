import { FC, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type AddProductDialogType = {
  isOpen: boolean;
  onOpen: (val: boolean) => void;
  onCreate: (data: { name: string; value: string }) => void;
};

export const AddProductDialog: FC<AddProductDialogType> = ({
  isOpen,
  onOpen,
  onCreate,
}) => {
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const handleCreate = () => {
    onCreate({ name: newName, value: newPrice });
    setNewName('');
    setNewPrice('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogTrigger asChild>
        <Button className="h-12 w-full cursor-pointer rounded-2xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-100 transition-all hover:bg-blue-700 active:scale-[0.98] dark:shadow-none">
          <Plus className="mr-2 h-4 w-4" /> Добавить товар
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground text-2xl font-black">
            Новый товар
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label className="ml-1 text-[10px] font-black text-slate-400 uppercase dark:text-slate-500">
              Название
            </Label>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="iPhone 15 Pro Max gold"
              className="h-12 rounded-2xl border-slate-100 bg-slate-50 text-slate-900 focus-visible:ring-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50"
            />
          </div>

          <div className="space-y-2">
            <Label className="ml-1 text-[10px] font-black text-slate-400 uppercase dark:text-slate-500">
              Цена
            </Label>
            <Input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="0"
              className="h-12 rounded-2xl border-slate-100 bg-slate-50 text-slate-900 focus-visible:ring-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleCreate}
            className="bg-primary text-primary-foreground h-14 w-full rounded-2xl text-xs font-black tracking-widest uppercase transition-all hover:opacity-90"
          >
            Добавить товар
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

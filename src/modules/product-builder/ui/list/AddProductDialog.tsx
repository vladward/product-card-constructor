'use client';

import { FormEvent, useState } from 'react';
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
import { cn } from '@/lib/utils';

type AddProductDialogType = {
  isOpen: boolean;
  onOpen: (val: boolean) => void;
  onCreate: (data: { name: string; value: string }) => void;
};

export const AddProductDialog = ({
  isOpen,
  onOpen,
  onCreate,
}: AddProductDialogType) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleOpenChange = (open: boolean) => {
    onOpen(open);
    if (!open) {
      setName('');
      setPrice('');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onCreate({
      name: name.trim(),
      value: price,
    });
    handleOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            'h-9 rounded-xl border-2 px-4 text-[11px] font-semibold transition-all duration-200',
            'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-100 hover:border-blue-700 hover:bg-blue-700 hover:text-white'
          )}
        >
          <Plus className="mr-2 h-4 w-4" /> Добавить товар
        </Button>
      </DialogTrigger>

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="border-border bg-card shadow-2xl sm:max-w-md"
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-foreground text-2xl font-black">
              Новый товар
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="product-name"
                className="text-muted-foreground ml-1 text-[10px] font-black tracking-wider uppercase"
              >
                Название
              </Label>
              <Input
                id="product-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Напр: iPhone 15 Pro"
                className="border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-brand-blue focus-visible:border-brand-blue h-12 rounded-2xl transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="product-price"
                className="text-muted-foreground ml-1 text-[10px] font-black tracking-wider uppercase"
              >
                Цена
              </Label>
              <Input
                id="product-price"
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                className="border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-brand-blue focus-visible:border-brand-blue h-12 rounded-2xl transition-colors"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground h-14 w-full rounded-2xl text-xs font-black tracking-widest uppercase transition-all hover:opacity-90 active:scale-[0.98]"
            >
              Создать карточку
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

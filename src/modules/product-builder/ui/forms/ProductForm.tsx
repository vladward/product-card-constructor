'use client';

import { memo } from 'react';
import {
  BuilderFilterType,
  TProduct,
  IProductActions,
} from '@/modules/product-builder/types/builder';
import { StandardSection } from './sections/StandardSection';
import { MediaSection } from './sections/MediaSection';
import { OthersSection } from './sections/OthersSection';

interface ProductFormProps {
  filter: BuilderFilterType;
  data: TProduct;
  activeKeys: Set<keyof TProduct>;
  actions: IProductActions;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProductForm = memo(
  ({ filter, data, activeKeys, actions, onUpload }: ProductFormProps) => {
    const SECTIONS: Record<string, React.ReactNode> = {
      media: (
        <MediaSection
          photos={data.photos || []}
          onUpload={onUpload}
          onRemove={(idx) =>
            actions.updatePhotos(data.photos!.filter((_, i) => i !== idx))
          }
        />
      ),
      others: (
        <OthersSection
          filter={filter}
          data={data}
          activeKeys={activeKeys}
          onChange={actions.updateField}
        />
      ),
    };

    return (
      <div className="min-h-[400px]">
        {SECTIONS[filter] || (
          <StandardSection
            filter={filter}
            data={data}
            activeKeys={activeKeys}
            onChange={actions.updateField}
            onGenerateAI={filter === 'seo' ? actions.generateAI : undefined}
          />
        )}
      </div>
    );
  }
);

ProductForm.displayName = 'ProductForm';

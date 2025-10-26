import React from 'react';
import { STYLES, ThumbnailStyleInfo } from '../types';

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (styleId: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleChange }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {STYLES.map((style: ThumbnailStyleInfo) => (
        <button
          key={style.id}
          onClick={() => onStyleChange(style.id)}
          className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 text-center h-full
            ${selectedStyle === style.id
              ? 'border-primary bg-primary/10 text-primary scale-105 shadow-lg'
              : 'border-gray-600 bg-brand-bg hover:border-primary/70 hover:bg-white/5'
            }`}
        >
          <span className="font-bold text-sm">{style.name}</span>
          <span className="text-xs text-on-surface-variant mt-1">{style.description}</span>
        </button>
      ))}
    </div>
  );
};

export default StyleSelector;

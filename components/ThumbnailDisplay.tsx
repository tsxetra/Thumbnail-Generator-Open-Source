import React from 'react';
import { DownloadIcon, ImageIcon } from './icons';

interface ThumbnailDisplayProps {
  generatedImage: string | null;
  isLoading: boolean;
}

const ThumbnailDisplay: React.FC<ThumbnailDisplayProps> = ({ generatedImage, isLoading }) => {
  const SkeletonLoader = () => (
    <div className="w-full aspect-video bg-brand-bg rounded-lg animate-pulse"></div>
  );

  const Placeholder = () => (
    <div className="w-full aspect-video bg-brand-bg rounded-lg flex flex-col items-center justify-center text-on-surface-variant border-2 border-dashed border-gray-700">
      <ImageIcon className="h-16 w-16" />
      <p className="mt-4 text-center">Your generated thumbnail will appear here</p>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      {isLoading ? (
        <SkeletonLoader />
      ) : generatedImage ? (
        <div className="relative group">
          <img
            src={generatedImage}
            alt="Generated thumbnail"
            className="w-full aspect-video object-cover rounded-lg shadow-2xl shadow-black/30"
          />
          <a
            href={generatedImage}
            download="thumbcraft-thumbnail.jpg"
            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"
          >
            <div className="flex items-center gap-2 bg-on-surface text-brand-bg font-bold py-2 px-4 rounded-full transform group-hover:scale-105 transition-transform">
              <DownloadIcon className="h-5 w-5" />
              <span>Download</span>
            </div>
          </a>
        </div>
      ) : (
        <Placeholder />
      )}
    </div>
  );
};

export default ThumbnailDisplay;

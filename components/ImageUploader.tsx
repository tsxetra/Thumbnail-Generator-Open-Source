import React, { useState, useCallback, useRef } from 'react';
import { UploadedImage } from '../types';
import { UploadIcon, TrashIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (image: UploadedImage | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        alert("File is too large. Please upload an image under 4MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1];
        if (base64String) {
          setPreview(reader.result as string);
          onImageUpload({ base64: base64String, mimeType: file.type });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  }, [onImageUpload]);
  
  const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, [onImageUpload]);

  const handleRemoveImage = () => {
    setPreview(null);
    onImageUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex justify-center items-center w-full p-6 bg-brand-bg border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isDragging ? 'border-primary' : 'border-gray-600 hover:border-primary/70'
        }`}
      >
        <div className="text-center">
          <UploadIcon className="mx-auto h-10 w-10 text-on-surface-variant" />
          <p className="mt-2 text-sm text-on-surface-variant">
            <span className="font-semibold text-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, WEBP (max 4MB)</p>
        </div>
      </label>

      {preview && (
        <div className="mt-4 relative w-full h-32 rounded-lg overflow-hidden">
          <img src={preview} alt="Image preview" className="w-full h-full object-cover" />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-1.5 bg-black bg-opacity-60 rounded-full text-white hover:bg-opacity-80 transition-opacity"
            aria-label="Remove image"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

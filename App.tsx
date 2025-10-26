import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import ThumbnailDisplay from './components/ThumbnailDisplay';
import { UploadedImage, STYLES } from './types';
import { generateThumbnail } from './services/geminiService';
import { SparklesIcon } from './components/icons';

function App() {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>(STYLES[0].id);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClick = async () => {
    if (!uploadedImage || !videoTitle || !selectedStyle) {
      setError('Please upload an image, enter a video title, and select a style.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedImage(null);

    try {
      const styleInfo = STYLES.find(s => s.id === selectedStyle);
      const styleDescription = styleInfo ? `${styleInfo.name}: ${styleInfo.description}` : selectedStyle;
      const result = await generateThumbnail(uploadedImage, videoTitle, styleDescription);
      setGeneratedImage(result);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const isGenerateDisabled = !uploadedImage || !videoTitle || isLoading;

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans">
      <header className="py-6 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-primary">ThumbCraft AI</h1>
          <p className="text-center text-lg text-on-surface-variant mt-2">
            Generate stunning YouTube thumbnails in seconds with AI
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Inputs */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-3 text-on-surface">1. Upload your base image</h2>
              <ImageUploader onImageUpload={setUploadedImage} />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-3 text-on-surface">2. Enter your video title</h2>
              <input
                type="text"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="e.g., My Epic Trip to Japan"
                className="w-full px-4 py-3 bg-brand-bg border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-3 text-on-surface">3. Choose a style</h2>
              <StyleSelector selectedStyle={selectedStyle} onStyleChange={setSelectedStyle} />
            </div>
            <button
              onClick={handleGenerateClick}
              disabled={isGenerateDisabled}
              className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
            >
              <SparklesIcon className="h-5 w-5" />
              <span>{isLoading ? 'Generating...' : 'Generate Thumbnail'}</span>
            </button>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </div>

          {/* Right Column: Output */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-on-surface">Your AI-Generated Thumbnail</h2>
            <ThumbnailDisplay generatedImage={generatedImage} isLoading={isLoading} />
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-gray-800 mt-8">
          <div className="container mx-auto px-4 text-center text-gray-500">
              <p>&copy; {new Date().getFullYear()} ThumbCraft AI. Built with Gemini.</p>
          </div>
      </footer>
    </div>
  );
}

export default App;

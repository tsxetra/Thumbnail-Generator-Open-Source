export interface ThumbnailStyleInfo {
  id: string;
  name: string;
  description: string;
}

export const STYLES: ThumbnailStyleInfo[] = [
  {
    id: 'mrbeast',
    name: 'MrBeast',
    description: 'High energy, saturated, and bold text.',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean, minimalist, and informative.',
  },
  { id: 'gaming', name: 'Gaming', description: 'Dynamic, vibrant, and action-oriented.' },
  { id: 'vlog', name: 'Vlog', description: 'Authentic, warm, and personal.' },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple, elegant, with lots of whitespace.',
  },
  {
    id: 'tech',
    name: 'Tech Review',
    description: 'Sleek, modern, and product-focused.',
  },
  {
    id: 'documentary',
    name: 'Documentary',
    description: 'Cinematic, serious, and high-contrast.',
  },
  {
    id: 'beauty',
    name: 'Beauty & Fashion',
    description: 'Bright, glamorous, with a focus on faces.',
  },
  { id: 'kids', name: 'Kids Content', description: 'Colorful, friendly, and playful.' },
  {
    id: 'reaction',
    name: 'Reaction',
    description: 'Expressive faces, split-screen, and bold arrows.',
  },
  {
    id: 'asmr',
    name: 'ASMR',
    description: 'Soft, calming, and focused on textures.',
  },
  { id: 'news', name: 'News', description: 'Authoritative, clear, with bold headlines.' },
];

export interface UploadedImage {
  base64: string;
  mimeType: string;
}
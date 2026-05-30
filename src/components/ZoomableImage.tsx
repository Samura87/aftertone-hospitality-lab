'use client';
import { useState } from 'react';
import ImageLightbox from './ImageLightbox';

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ZoomableImage({ src, alt, className = '' }: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full group relative cursor-zoom-in"
        aria-label={`放大查看：${alt}`}
      >
        <img
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-200 group-hover:opacity-90`}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Zoom hint overlay */}
        <span className="
          absolute bottom-2 right-2
          bg-black/50 backdrop-blur-sm
          text-white/70 text-[10px] tracking-widest
          px-2 py-1 rounded
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          pointer-events-none
        ">
          點擊放大
        </span>
      </button>

      {open && (
        <ImageLightbox src={src} alt={alt} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

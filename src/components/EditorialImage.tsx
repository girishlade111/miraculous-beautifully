import { useState } from 'react';
import { cn } from '../lib/utils';

interface EditorialImageProps {
  src: string;
  alt: string;
  fallbackTitle?: string;
  className?: string;
  imgClassName?: string;
  loading?: 'eager' | 'lazy';
}

export function EditorialImage({
  src,
  alt,
  fallbackTitle,
  className,
  imgClassName,
  loading = 'eager',
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          'w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[var(--bg-card)] border border-[var(--border-subtle)]',
          className
        )}
      >
        <span className="eyebrow mb-2">Archival Plate</span>
        <span className="font-editorial text-2xl text-[var(--text-primary)]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden bg-[var(--bg-card)]', className)}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={cn('w-full h-full object-cover', imgClassName)}
      />
    </div>
  );
}

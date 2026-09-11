import { useState } from 'react'

interface PlaceImageProps {
  src?: string
  alt: string
  className?: string
}

export function PlaceImage({ src, alt, className = '' }: PlaceImageProps) {
  const [hasError, setHasError] = useState(false)
  const imageSrc = src && !hasError ? src : '/favicon.svg'

  return (
    <img
      className={className}
      src={imageSrc}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  )
}
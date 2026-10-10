import { useState } from 'react'

// عکس واقعی محصول از پوشه public/images/products می‌آید (نه از اینترنت)،
// چون سرویس‌های رایگان عکس گاهی از داخل ایران به‌کندی یا اصلاً لود نمی‌شوند.
export default function ProductImage({ product, className = '' }) {
  const [failed, setFailed] = useState(false)
  const src = `/images/products/${product.id}.jpg`

  if (failed) {
    return (
      <div className={`flex aspect-square w-full items-center justify-center bg-panel2 p-4 text-center text-sm text-muted ${className}`}>
        {product.name}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={product.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`block aspect-square w-full object-cover ${className}`}
    />
  )
}

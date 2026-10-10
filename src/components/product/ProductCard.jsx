import { Link } from 'react-router-dom'
import ProductImage from './ProductImage.jsx'
import { CATEGORIES } from '../../data/products.js'
import { formatPrice } from '../../utils/format.js'

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="group block transition-transform duration-300 hover:-translate-y-1.5">
      <div className="overflow-hidden rounded-3xl bg-panel2 shadow-none transition-shadow duration-300 group-hover:shadow-lift">
        <ProductImage product={product} className="transition-transform duration-500 group-hover:scale-105" />
      </div>
      <p className="mt-3.5 text-xs text-muted/80">{CATEGORIES[product.category]}</p>
      <h3 className="mt-1.5 text-sm sm:text-base font-semibold leading-relaxed text-cream">{product.name}</h3>
      <p className="mt-2 text-sm sm:text-base font-bold text-cream">{formatPrice(product.price)}</p>
    </Link>
  )
}

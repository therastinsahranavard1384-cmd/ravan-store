import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../data/products.js'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-panel">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-extrabold text-cream" style={{ fontStretch: '125%' }}>Ravan<span className="text-gold">.</span></p>
          <p className="mt-3 max-w-xs text-sm text-muted">پوشاک و تجهیزات ورزشی برای کسانی که هر روز حرکت می‌کنند.</p>
        </div>
        <div>
          <p className="font-bold text-cream">دسته‌بندی‌ها</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {Object.entries(CATEGORIES).map(([k, v]) => (
              <li key={k}><Link className="transition-colors hover:text-gold" to={`/products?category=${k}`}>{v}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-bold text-cream">پشتیبانی</p>
          <p className="mt-3 text-sm text-muted">شنبه تا پنجشنبه، ۹ تا ۱۸</p>
          <p className="text-sm text-muted">support@ravan.example</p>
        </div>
      </div>
      <p className="border-t border-line py-4 text-center text-xs text-muted/70">© Ravan. نمونه طراحی، تمام محصولات و قیمت‌ها فرضی هستند.</p>
    </footer>
  )
}

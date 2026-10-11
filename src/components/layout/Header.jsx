import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { num } from '../../utils/format.js'

export default function Header() {
  const { count } = useCart()
  const { user } = useAuth()
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-noir/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="font-display text-2xl font-extrabold text-cream" style={{ fontStretch: '125%' }}>
          Ravan<span className="text-gold">.</span>
        </Link>
        <nav className="hidden gap-1 md:flex" aria-label="ناوبری اصلی">
          <Link to="/" className="rounded-full px-4 py-2 text-sm text-cream/80 transition-colors hover:text-gold">خانه</Link>
          <Link to="/products" className="rounded-full px-4 py-2 text-sm text-cream/80 transition-colors hover:text-gold">محصولات</Link>
          <Link to="/about" className="rounded-full px-4 py-2 text-sm text-cream/80 transition-colors hover:text-gold">درباره ما</Link>
          <Link to="/account" className="rounded-full px-4 py-2 text-sm text-cream/80 transition-colors hover:text-gold">
            {user ? user.username : 'ورود / ثبت‌نام'}
          </Link>
        </nav>
        <Link
          to="/cart"
          className="hidden items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-bold text-noir transition-all duration-200 hover:-translate-y-0.5 hover:bg-goldSoft md:inline-flex"
        >
          <span>سبد خرید</span>
          {count > 0 && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-noir px-1.5 text-xs font-black text-gold">
              {num(count)}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
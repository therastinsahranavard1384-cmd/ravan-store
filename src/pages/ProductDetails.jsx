import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts.js'
import { useCart } from '../context/CartContext.jsx'
import { CATEGORIES } from '../data/products.js'
import ProductImage from '../components/product/ProductImage.jsx'
import ProductGrid from '../components/product/ProductGrid.jsx'
import SizeSelector from '../components/product/SizeSelector.jsx'
import QuantityControl from '../components/product/QuantityControl.jsx'
import Button from '../components/ui/Button.jsx'
import { GridSkeleton, ErrorState, EmptyState } from '../components/ui/States.jsx'
import { formatPrice } from '../utils/format.js'

const ADDED = 'به سبد خرید اضافه شد.'

export default function ProductDetails() {
  const { id } = useParams()
  const { data, loading, error, reload } = useProducts()
  const { add } = useCart()
  const [size, setSize] = useState(null)
  const [qty, setQty] = useState(1)
  const [msg, setMsg] = useState('')
  const [justAdded, setJustAdded] = useState(false)

  if (loading) return <div className="mx-auto max-w-6xl px-4 py-10"><GridSkeleton count={4} /></div>
  if (error) return <div className="px-4 py-16"><ErrorState message={error} onRetry={reload} /></div>
  const p = data.find((x) => String(x.id) === id)
  if (!p) return <EmptyState title="این محصول وجود ندارد" text="ممکن است حذف شده یا آدرس اشتباه باشد." to="/products" action="بازگشت به محصولات" />

  const related = data.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4)
  const submit = () => {
    if (!size) {
      setMsg('ابتدا سایز را انتخاب کنید.')
      const el = document.getElementById('size-section')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    add(p, size, qty)
    setMsg(ADDED)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 900)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12 pb-32 md:pb-12">
      <nav className="mb-6 text-sm text-muted" aria-label="مسیر صفحه">
        <Link to="/products" className="transition-colors hover:text-gold">محصولات</Link> / {CATEGORIES[p.category]}
      </nav>
      <div className="grid gap-8 sm:gap-12 md:grid-cols-2 md:items-start">
        <div className="overflow-hidden rounded-3xl bg-panel2"><ProductImage product={p} /></div>
        <div>
          <h1 className="t-title text-cream">{p.name}</h1>
          <p className="mt-3 text-2xl font-bold text-cream sm:text-3xl">{formatPrice(p.price)}</p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{p.desc}</p>
          
          <div id="size-section" className="mt-8 scroll-mt-28 border-t border-line/60 pt-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold text-cream">سایز</span>
              {size && <span className="text-xs text-gold">سایز انتخابی: {size}</span>}
            </div>
            <SizeSelector sizes={p.sizes} value={size} onChange={(s) => { setSize(s); setMsg('') }} />
          </div>

          <div className="mt-6 border-t border-line/60 pt-6">
            <p className="mb-3 text-sm font-bold text-cream">تعداد</p>
            <QuantityControl value={qty} onInc={() => setQty(qty + 1)} onDec={() => setQty(qty - 1)} />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="accent" onClick={submit} className={justAdded ? 'animate-bump' : ''}>
              {justAdded ? 'اضافه شد ✓' : 'افزودن به سبد خرید'}
            </Button>
            {msg === ADDED && <Link to="/cart" className="text-sm font-bold text-gold transition-opacity hover:opacity-70">مشاهده سبد</Link>}
          </div>
          <p role="status" className={`mt-3 text-sm ${msg === ADDED ? 'text-muted' : 'text-red-400'}`}>{msg}</p>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="t-heading mb-6 text-cream">محصولات مشابه</h2>
          <ProductGrid products={related} />
        </section>
      )}

      {/* نوار چسبان خرید مخصوص موبایل */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-noir/95 px-4 py-3 backdrop-blur md:hidden shadow-lift"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.75rem)' }}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="block text-[11px] text-muted">
              {size ? `سایز: ${size}` : 'سایز را انتخاب کنید'}
            </span>
            <span className="text-base font-bold text-cream">
              {formatPrice(p.price)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {msg === ADDED && (
              <Link to="/cart" className="rounded-full border border-gold/40 px-3 py-2 text-xs font-bold text-gold">
                مشاهده سبد
              </Link>
            )}
            <Button
              variant="accent"
              onClick={submit}
              className={`px-5 py-2.5 text-xs font-bold ${justAdded ? 'animate-bump' : ''}`}
            >
              {justAdded ? 'اضافه شد ✓' : 'افزودن به سبد'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

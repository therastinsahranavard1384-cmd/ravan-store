import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts.js'
import { CATEGORIES } from '../data/products.js'
import ProductGrid from '../components/product/ProductGrid.jsx'
import { GridSkeleton, ErrorState, EmptyState } from '../components/ui/States.jsx'
import { num } from '../utils/format.js'

const SORTS = { new: 'جدیدترین', cheap: 'ارزان‌ترین', expensive: 'گران‌ترین' }

export default function Products() {
  const [sp, setSp] = useSearchParams()
  const q = sp.get('q') || ''
  const cat = sp.get('category') || 'all'
  const sort = sp.get('sort') || 'new'
  const { data, loading, error, reload } = useProducts()

  const set = (k, v) => {
    const n = new URLSearchParams(sp)
    if (v && v !== 'all' && !(k === 'sort' && v === 'new')) n.set(k, v)
    else n.delete(k)
    setSp(n, { replace: true })
  }

  const list = useMemo(() => {
    if (!data) return []
    const term = q.trim().toLowerCase()
    const r = data.filter((p) => (cat === 'all' || p.category === cat) && p.name.toLowerCase().includes(term))
    if (sort === 'cheap') r.sort((a, b) => a.price - b.price)
    else if (sort === 'expensive') r.sort((a, b) => b.price - a.price)
    else r.sort((a, b) => b.id - a.id)
    return r
  }, [data, q, cat, sort])

  const chip = (active) =>
    `rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 ${active ? 'border-gold bg-gold text-noir' : 'border-line bg-transparent text-muted hover:border-gold hover:text-cream'
    }`

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="t-title text-cream">محصولات</h1>
      <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-line pb-6">
        <input value={q} onChange={(e) => set('q', e.target.value)} placeholder="جستجوی نام محصول" aria-label="جستجوی محصول"
          className="min-w-[180px] flex-1 rounded-full border border-line bg-transparent px-4 py-2 text-sm text-cream placeholder:text-muted outline-none transition-colors focus-visible:border-gold" />
        <select value={sort} onChange={(e) => set('sort', e.target.value)} aria-label="مرتب‌سازی"
          className="rounded-full border border-line bg-transparent px-4 py-2 text-sm text-muted">
          {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <div className="flex flex-wrap gap-2">
          <button className={chip(cat === 'all')} onClick={() => set('category', 'all')}>همه</button>
          {Object.entries(CATEGORIES).map(([k, v]) => (
            <button key={k} className={chip(cat === k)} onClick={() => set('category', k)}>{v}</button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {loading && <GridSkeleton />}
        {error && <ErrorState message={error} onRetry={reload} />}
        {data && (list.length ? (
          <>
            <p className="mb-4 text-sm text-muted">{num(list.length)} محصول</p>
            <ProductGrid products={list} />
          </>
        ) : (
          <EmptyState title="محصولی پیدا نشد" text="عبارت جستجو یا دسته‌بندی را تغییر دهید." to="/products" action="پاک‌کردن فیلترها" />
        ))}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts.js'
import { CATEGORIES } from '../data/products.js'
import ProductGrid from '../components/product/ProductGrid.jsx'
import ProductImage from '../components/product/ProductImage.jsx'
import { formatPrice } from '../utils/format.js'
import { GridSkeleton, ErrorState } from '../components/ui/States.jsx'
import Button from '../components/ui/Button.jsx'
import { Button as MovingBorderButton } from '@/components/ui/moving-border'

function SearchPanel() {
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const [c, setC] = useState('all')
  const submit = (e) => {
    e.preventDefault()
    const p = new URLSearchParams()
    if (q.trim()) p.set('q', q.trim())
    if (c !== 'all') p.set('category', c)
    nav(`/products?${p}`)
  }

  return (
    <form
      onSubmit={submit}
      className="mt-6 flex flex-col gap-2 rounded-2xl border border-line bg-panel/80 p-2 backdrop-blur sm:flex-row sm:items-center focus-within:border-gold/60 transition-colors"
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="جستجوی سریع در محصولات..."
        aria-label="جستجوی محصول"
        className="flex-1 bg-transparent px-3 py-2 text-sm text-cream placeholder:text-muted outline-none"
      />
      <div className="flex items-center gap-2">
        <select
          value={c}
          onChange={(e) => setC(e.target.value)}
          aria-label="دسته‌بندی"
          className="rounded-xl border border-line bg-noir/80 px-3 py-2 text-xs text-cream outline-none focus-visible:border-gold"
        >
          <option value="all">همه دسته‌ها</option>
          {Object.entries(CATEGORIES).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-xl bg-gold px-4 py-2 text-xs font-bold text-noir transition-colors hover:bg-goldSoft"
        >
          جستجو
        </button>
      </div>
    </form>
  )
}

function HeroImage() {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className="flex aspect-[10/9] w-full items-center justify-center bg-gradient-to-br from-panel to-panel2 text-muted">
        عکس هیرو را در public/images/hero.jpg قرار دهید
      </div>
    )
  }
  return (
    <img
      src="/images/hero.jpg"
      alt="ورزشکار در حال تمرین"
      onError={() => setFailed(true)}
      className="aspect-[10/9] w-full object-cover"
    />
  )
}

export default function Home() {
  const { data, loading, error, reload } = useProducts()

  return (
    <>
      <section className="mx-auto flex flex-col-reverse gap-10 px-4 py-8 sm:py-12 sm:gap-12 md:grid md:max-w-6xl md:grid-cols-[1fr_1.1fr] md:items-center md:gap-14 md:py-20">
        <div className="animate-fadeUp">
          <h1 className="t-display text-cream">حرکت کن، روان بمان.</h1>
          <p className="mt-5 max-w-md text-base sm:text-lg leading-relaxed text-muted">
            لباس و کفشی که واقعاً دووم می‌آورد — برای دویدن‌های هرروزه‌ات، نه فقط عکس یادگاری. سایزت را انتخاب کن، همین امروز بپوش.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MovingBorderButton
              as={Link}
              to="/products"
              containerClassName="h-12 w-48 shadow-lg shadow-gold/10"
              borderRadius="9999px"
              duration={3200}
            >
              <span className="flex items-center gap-2">
                <span>مشاهده محصولات</span>
                <span className="text-gold">←</span>
              </span>
            </MovingBorderButton>
            <Button to="/about" variant="ghost">
              داستان ما
            </Button>
          </div>
          <SearchPanel />
        </div>
        <div className="overflow-hidden rounded-3xl border border-line">
          <HeroImage />
        </div>
      </section>

      <section className="mx-auto my-10 max-w-6xl px-4 sm:my-14 md:my-16">
        <div className="grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-4">
          {Object.entries(CATEGORIES).map(([k, v]) => (
            <Link
              key={k}
              to={`/products?category=${k}`}
              className="group flex flex-col justify-between rounded-3xl border border-line bg-panel p-5 transition-all duration-200 hover:-translate-y-1 hover:border-gold hover:bg-gold/5"
            >
              <span className="text-xs text-muted">دسته‌بندی</span>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-cream transition-colors group-hover:text-gold">{v}</span>
                <span className="text-xs text-gold opacity-0 transition-opacity duration-200 group-hover:opacity-100">←</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:mt-24">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="t-heading text-cream">پرفروش‌ها</h2>
          <Link to="/products" className="text-sm font-bold text-cream underline-offset-4 transition-colors hover:text-gold hover:underline">همه محصولات</Link>
        </div>
        {loading && <GridSkeleton count={4} />}
        {error && <ErrorState message={error} onRetry={reload} />}
        {data && (
          <>
            <Link
              to={`/products/${data[0].id}`}
              className="group grid gap-6 rounded-3xl border border-line bg-panel p-6 transition-colors duration-200 hover:border-gold md:grid-cols-2 md:items-center md:p-8"
            >
              <div className="overflow-hidden rounded-2xl">
                <ProductImage product={data[0]} className="transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div>
                <p className="text-xs text-muted">محصول منتخب</p>
                <h3 className="t-heading mt-2 text-cream">{data[0].name}</h3>
                <p className="mt-2 max-w-sm text-sm text-muted">{data[0].desc}</p>
                <p className="mt-4 text-xl font-bold text-cream">{formatPrice(data[0].price)}</p>
              </div>
            </Link>
            <div className="mt-6">
              <ProductGrid products={data.slice(1, 4)} />
            </div>
          </>
        )}
      </section>
    </>
  )
}

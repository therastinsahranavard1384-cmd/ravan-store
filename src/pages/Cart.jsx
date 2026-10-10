import { useCart } from '../context/CartContext.jsx'
import ProductImage from '../components/product/ProductImage.jsx'
import QuantityControl from '../components/product/QuantityControl.jsx'
import Button from '../components/ui/Button.jsx'
import { EmptyState } from '../components/ui/States.jsx'
import { formatPrice, num } from '../utils/format.js'

export default function Cart() {
  const { items, subtotal, shipping, total, freeFrom, inc, dec, remove } = useCart()
  if (!items.length)
    return <EmptyState title="سبد خرید خالی است" text="محصولی انتخاب کنید تا اینجا نمایش داده شود." to="/products" action="مشاهده محصولات" />

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="t-title text-cream">سبد خرید</h1>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-line rounded-3xl border border-line bg-panel">
          {items.map((i) => (
            <li key={i.key} className="flex gap-4 p-4">
              <div className="w-24 shrink-0 overflow-hidden rounded-2xl bg-panel2"><ProductImage product={i} /></div>
              <div className="flex-1">
                <p className="font-semibold text-cream">{i.name}</p>
                <p className="text-sm text-muted">سایز: {i.size}</p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <QuantityControl value={i.qty} onInc={() => inc(i.key)} onDec={() => dec(i.key)} />
                  <p className="font-bold text-cream">{formatPrice(i.price * i.qty)}</p>
                </div>
                <button onClick={() => remove(i.key)} className="mt-2 text-sm text-red-400 transition-opacity hover:opacity-70">حذف از سبد</button>
              </div>
            </li>
          ))}
        </ul>
        <aside className="rounded-3xl border border-goldSoft/30 bg-gradient-to-b from-goldSoft/15 to-panel p-6 text-cream lg:sticky lg:top-24">
          <h2 className="text-lg font-bold">خلاصه سفارش</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted">جمع محصولات</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">هزینه ارسال</dt><dd>{shipping ? formatPrice(shipping) : 'رایگان'}</dd></div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-bold"><dt>مبلغ نهایی</dt><dd className="text-gold">{formatPrice(total)}</dd></div>
          </dl>
          {shipping > 0 && <p className="mt-3 text-xs text-muted">با خرید بالای {num(freeFrom)} تومان، ارسال رایگان است.</p>}
          <Button variant="accent" className="mt-5 w-full">ادامه و پرداخت</Button>
        </aside>
      </div>
    </div>
  )
}

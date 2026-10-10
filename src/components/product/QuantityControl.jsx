import { num } from '../../utils/format.js'

export default function QuantityControl({ value, onInc, onDec, min = 1 }) {
  const btn = 'h-9 w-9 rounded-full border border-line bg-transparent text-lg font-bold text-cream transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:text-gold disabled:opacity-40 disabled:hover:translate-y-0'
  return (
    <div className="inline-flex items-center gap-3">
      <button className={btn} onClick={onDec} aria-label="کاهش تعداد" disabled={value <= min}>−</button>
      <span className="w-6 text-center font-bold text-cream" aria-live="polite">{num(value)}</span>
      <button className={btn} onClick={onInc} aria-label="افزایش تعداد" disabled={value >= 10}>+</button>
    </div>
  )
}

export default function SizeSelector({ sizes, value, onChange }) {
  return (
    <div role="radiogroup" aria-label="انتخاب سایز" className="flex flex-wrap gap-2">
      {sizes.map((s) => (
        <button
          key={s} type="button" role="radio" aria-checked={value === s} onClick={() => onChange(s)}
          className={`min-w-14 rounded-full border px-4 py-2 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 ${
            value === s ? 'border-gold bg-gold text-noir' : 'border-line bg-transparent text-cream hover:border-gold'
          }`}
        >{s}</button>
      ))}
    </div>
  )
}

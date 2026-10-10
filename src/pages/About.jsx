import Button from '../components/ui/Button.jsx'

const values = [
  ['ساخته‌شده برای دووم', 'قبل از عرضه، هر محصول ماه‌ها زیر فشار تمرین واقعی امتحان می‌شود، نه فقط یک بار.'],
  ['سایز درست از همون اول', 'جدول سایز شفاف داریم، و اگه اشتباه بود، تا ۷ روز راحت عوضش می‌کنیم.'],
  ['می‌رسه دستت، سریع', 'تهران ۲۴ ساعته، بقیه شهرها ۲ تا ۴ روز کاری.'],
]

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="t-title max-w-2xl text-cream">
        روان از یک قانون ساده شروع شد: چیزی که هرروز می‌پوشی، باید دووم بیاره.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted">
        نه برای یک عکس، نه برای یک بار مصرف. لباس و تجهیزاتی انتخاب می‌کنیم که توی باشگاه، توی دویدن روزمره و توی طبیعت واقعاً جواب می‌دهند.
      </p>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {values.map(([t, d]) => (
          <div key={t} className="rounded-3xl border border-line bg-panel p-6 transition-all duration-200 hover:-translate-y-1 hover:border-gold">
            <h2 className="font-bold text-cream">{t}</h2>
            <p className="mt-2 text-sm text-muted">{d}</p>
          </div>
        ))}
      </div>
      <Button variant="accent" to="/products" className="mt-10">مشاهده محصولات</Button>
    </div>
  )
}

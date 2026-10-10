import Button from './Button.jsx'

export function GridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4" aria-busy="true" aria-label="در حال بارگذاری">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square rounded-3xl bg-panel2" />
          <div className="mt-3 h-4 w-3/4 rounded bg-panel2" />
          <div className="mt-2 h-3 w-1/3 rounded bg-panel2" />
        </div>
      ))}
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div role="alert" className="mx-auto max-w-md rounded-3xl border border-line bg-panel p-8 text-center">
      <p className="text-lg font-bold text-cream">محصولات بارگذاری نشد</p>
      <p className="mt-2 text-sm text-muted">{message} اتصال اینترنت را بررسی کنید و دوباره تلاش کنید.</p>
      <Button variant="accent" className="mt-5" onClick={onRetry}>تلاش دوباره</Button>
    </div>
  )
}

export function EmptyState({ title, text, to, action }) {
  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <p className="text-lg font-bold text-cream">{title}</p>
      <p className="mt-2 text-sm text-muted">{text}</p>
      {to && <Button variant="accent" to={to} className="mt-5">{action}</Button>}
    </div>
  )
}

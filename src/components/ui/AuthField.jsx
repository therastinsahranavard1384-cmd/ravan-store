const paths = {
  user: <><circle cx="12" cy="8" r="4" /><path d="M4.5 20a7.5 7.5 0 0 1 15 0" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  phone: <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5L16 13l4 1.5v3a2 2 0 0 1-2 2A14 14 0 0 1 4.5 6a2 2 0 0 1 2-2Z" />,
  pin: <><path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
}

export default function AuthField({ icon, label, error, ...props }) {
  return (
    <div>
      <label className="relative block">
        <span className="sr-only">{label}</span>
        <svg
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round"
          className="pointer-events-none absolute start-5 top-1/2 h-5 w-5 -translate-y-1/2 text-noir/60"
          aria-hidden="true"
        >
          {paths[icon]}
        </svg>
        <input
          {...props}
          placeholder={label}
          aria-invalid={!!error}
          className="h-14 w-full rounded-full bg-sandLight pe-5 ps-14 text-sm text-noir transition-shadow placeholder:text-noir/50 focus-visible:outline-noir disabled:opacity-60"
        />
      </label>
      {error && <p role="alert" className="mt-1.5 px-5 text-xs font-semibold text-red-900">{error}</p>}
    </div>
  )
}
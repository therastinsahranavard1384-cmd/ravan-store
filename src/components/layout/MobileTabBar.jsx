import { NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { num } from '../../utils/format.js'
import { useAuth } from  '../../context/AuthContext.jsx'

const icons = {
  home: (
    <path d="M4 11.5 12 4l8 7.5M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9" />
  ),
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  bag: (
    <>
      <path d="M6 8h12l-1 12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5M12 8v.1" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
}

function Icon({ name, active }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}
      strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      {icons[name]}
    </svg>
  )
}

export default function MobileTabBar() {
  const { count } = useCart()
  const { user } = useAuth()
  const tabs = [
    { to: '/', label: 'خانه', icon: 'home', end: true },
    { to: '/products', label: 'محصولات', icon: 'grid' },
    { to: '/cart', label: 'سبد', icon: 'bag', badge: count },
    { to: '/about', label: 'درباره ما', icon: 'info' },
    { to: '/account', label: user ? 'حساب' : 'ورود', icon: 'user' },
  ]
  
  return (
    <nav
      aria-label="ناوبری اصلی موبایل"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-noir/95 backdrop-blur md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex h-16 items-stretch justify-around">
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.end}
            className={({ isActive }) =>
              `relative flex flex-1 flex-col items-center justify-center gap-1 text-[11px] transition-colors ${isActive ? 'text-gold' : 'text-muted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="relative">
                  <Icon name={t.icon} active={isActive} />
                  {!!t.badge && (
                    <span className="absolute -left-2 -top-1.5 min-w-[16px] rounded-full bg-gold px-1 text-center text-[9px] font-bold leading-4 text-noir">
                      {num(t.badge)}
                    </span>
                  )}
                </span>
                {t.label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
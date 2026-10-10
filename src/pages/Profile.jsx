import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { formatPrice } from '../utils/format.js'
import Button from '../components/ui/Button.jsx'

export default function Profile() {
  const nav = useNavigate()
  const { user, isLoggedIn, logout, updateProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState('')

  if (!isLoggedIn) { nav('/login', { replace: true }); return null }

  const handleLogout = () => {
    logout()
    nav('/')
  }

  const startEdit = () => {
    setEditName(user.name)
    setEditing(true)
  }

  const saveEdit = () => {
    if (editName.trim()) updateProfile({ name: editName.trim() })
    setEditing(false)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      {/* هدر پروفایل */}
      <div className="overflow-hidden rounded-[2rem] border border-goldSoft/20 bg-gradient-to-b from-panel2 via-panel to-noir p-8 shadow-lift">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-6">
          {/* آواتار */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-gradient-to-br from-gold/20 to-gold/5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-9 w-9 text-gold">
              <circle cx="12" cy="8" r="4" /><path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
            </svg>
          </div>

          {/* اطلاعات کاربر */}
          <div className="flex-1 text-center sm:text-right">
            {editing ? (
              <div className="flex items-center gap-2">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 rounded-xl border border-gold/40 bg-panel2 px-3 py-2 text-sm text-cream outline-none focus:border-gold"
                  autoFocus
                />
                <button onClick={saveEdit} className="rounded-xl bg-gold px-3 py-2 text-xs font-bold text-noir transition-colors hover:bg-goldSoft">
                  ذخیره
                </button>
                <button onClick={() => setEditing(false)} className="text-xs text-muted transition-colors hover:text-cream">
                  لغو
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <h1 className="font-display text-xl font-extrabold text-cream">{user.name}</h1>
                <button onClick={startEdit} className="text-muted transition-colors hover:text-gold" aria-label="ویرایش نام">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M17 3l4 4L7 21H3v-4L17 3z" />
                  </svg>
                </button>
              </div>
            )}
            <p className="mt-1 text-sm text-muted">{user.email}</p>
            <p className="mt-1 text-xs text-muted/70">عضویت از {user.joinDate}</p>
          </div>

          {/* دکمه خروج */}
          <button
            onClick={handleLogout}
            className="shrink-0 rounded-full border border-line px-4 py-2 text-xs font-bold text-muted transition-all hover:-translate-y-0.5 hover:border-red-400 hover:text-red-400"
          >
            خروج از حساب
          </button>
        </div>
      </div>

      {/* تاریخچه سفارش‌ها */}
      <section className="mt-8">
        <h2 className="mb-4 font-display text-xl font-bold text-cream">سفارش‌های اخیر</h2>
        {user.orders && user.orders.length > 0 ? (
          <div className="space-y-3">
            {user.orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-panel p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/30"
              >
                <div>
                  <p className="text-sm font-bold text-cream">سفارش #{order.id}</p>
                  <p className="mt-1 text-xs text-muted">{order.date}</p>
                </div>
                <div className="text-left">
                  <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold ${
                    order.status === 'تحویل داده شد'
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-gold/15 text-gold'
                  }`}>
                    {order.status}
                  </span>
                  <p className="mt-1 text-sm font-bold text-cream">{formatPrice(order.total)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-line bg-panel p-8 text-center">
            <p className="text-sm text-muted">هنوز سفارشی ثبت نشده است.</p>
            <Button to="/products" variant="accent" className="mt-4">مشاهده محصولات</Button>
          </div>
        )}
      </section>

      {/* لینک‌های سریع */}
      <section className="mt-8 grid grid-cols-2 gap-3">
        <Link
          to="/cart"
          className="flex items-center gap-3 rounded-2xl border border-line bg-panel p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6 text-gold">
            <path d="M6 8h12l-1 12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" />
          </svg>
          <span className="text-sm font-bold text-cream">سبد خرید</span>
        </Link>
        <Link
          to="/products"
          className="flex items-center gap-3 rounded-2xl border border-line bg-panel p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6 text-gold">
            <rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" />
            <rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" />
          </svg>
          <span className="text-sm font-bold text-cream">محصولات</span>
        </Link>
      </section>
    </div>
  )
}

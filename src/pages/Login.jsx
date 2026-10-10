import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Button from '../components/ui/Button.jsx'

export default function Login() {
  const nav = useNavigate()
  const { login, isLoggedIn } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  if (isLoggedIn) { nav('/profile', { replace: true }); return null }

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const result = login(form.email, form.password)
    if (result.success) nav('/profile')
    else setError(result.error)
  }

  const field = 'w-full rounded-2xl border border-goldSoft/30 bg-panel2/80 px-4 py-3.5 pr-11 text-sm text-cream placeholder:text-muted outline-none transition-all focus:border-gold focus:bg-panel2'

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center px-4 py-10">
      <div className="w-full overflow-hidden rounded-[2rem] border border-goldSoft/20 bg-gradient-to-b from-panel2 via-panel to-noir p-8 shadow-lift">
        <h1 className="text-center font-display text-2xl font-extrabold text-cream">ورود</h1>
        <p className="mt-2 text-center text-sm text-muted">به حساب کاربری خود وارد شوید</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {/* ایمیل */}
          <div className="relative">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="absolute right-3.5 top-3.5 h-5 w-5 text-muted">
              <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
            </svg>
            <input type="email" value={form.email} onChange={set('email')} placeholder="ایمیل" aria-label="ایمیل" className={field} />
          </div>

          {/* رمز عبور */}
          <div className="relative">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="absolute right-3.5 top-3.5 h-5 w-5 text-muted">
              <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <input type="password" value={form.password} onChange={set('password')} placeholder="رمز عبور" aria-label="رمز عبور" className={field} />
          </div>

          {/* خطا */}
          {error && <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-2 text-center text-xs text-red-400">{error}</p>}

          {/* دکمه ورود */}
          <Button type="submit" variant="accent" className="w-full !py-3.5 text-base shadow-lg shadow-gold/15">
            ورود به حساب
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          حساب ندارید؟{' '}
          <Link to="/register" className="font-bold text-gold transition-opacity hover:opacity-70">ثبت‌نام</Link>
        </p>
      </div>
    </div>
  )
}

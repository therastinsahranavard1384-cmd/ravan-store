import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Button from '../components/ui/Button.jsx'

export default function Register() {
  const nav = useNavigate()
  const { register, isLoggedIn } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')

  if (isLoggedIn) { nav('/profile', { replace: true }); return null }

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return setError('نام کاربری را وارد کنید.')
    if (!form.email.trim()) return setError('ایمیل را وارد کنید.')
    if (form.password.length < 4) return setError('رمز عبور حداقل ۴ کاراکتر باشد.')
    if (form.password !== form.confirm) return setError('رمز عبور و تکرار آن یکسان نیستند.')
    if (!agreed) return setError('لطفاً قوانین را بپذیرید.')
    setError('')
    register(form.name, form.email, form.password)
    nav('/profile')
  }

  const field = 'w-full rounded-2xl border border-goldSoft/30 bg-panel2/80 px-4 py-3.5 pr-11 text-sm text-cream placeholder:text-muted outline-none transition-all focus:border-gold focus:bg-panel2'

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center px-4 py-10">
      <div className="w-full overflow-hidden rounded-[2rem] border border-goldSoft/20 bg-gradient-to-b from-panel2 via-panel to-noir p-8 shadow-lift">
        <h1 className="text-center font-display text-2xl font-extrabold text-cream">ثبت‌نام</h1>
        <p className="mt-2 text-center text-sm text-muted">حساب کاربری خود را بسازید</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {/* نام کاربری */}
          <div className="relative">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="absolute right-3.5 top-3.5 h-5 w-5 text-muted">
              <circle cx="12" cy="8" r="4" /><path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
            </svg>
            <input value={form.name} onChange={set('name')} placeholder="نام کاربری" aria-label="نام کاربری" className={field} />
          </div>

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

          {/* تکرار رمز عبور */}
          <div className="relative">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="absolute right-3.5 top-3.5 h-5 w-5 text-muted">
              <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <input type="password" value={form.confirm} onChange={set('confirm')} placeholder="تکرار رمز عبور" aria-label="تکرار رمز عبور" className={field} />
          </div>

          {/* پذیرش قوانین */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="h-4 w-4 appearance-none rounded border border-goldSoft/40 bg-panel2 checked:bg-gold checked:border-gold transition-colors cursor-pointer"
            />
            <span className="text-xs text-muted">قوانین و مقررات فروشگاه را می‌پذیرم.</span>
          </label>

          {/* خطا */}
          {error && <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-2 text-center text-xs text-red-400">{error}</p>}

          {/* دکمه ثبت‌نام */}
          <Button type="submit" variant="accent" className="w-full !py-3.5 text-base shadow-lg shadow-gold/15">
            ثبت‌نام
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          قبلاً ثبت‌نام کرده‌اید؟{' '}
          <Link to="/login" className="font-bold text-gold transition-opacity hover:opacity-70">ورود</Link>
        </p>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import AuthField from '../components/ui/AuthField.jsx'
import Button from '../components/ui/Button.jsx'
import { formatPrice, num } from '../utils/format.js'

const cardCls = 'rounded-[2.25rem] bg-sand text-noir shadow-lift'

/* ---------- ورود / ثبت‌نام ---------- */
function AuthCard() {
  const { login, register } = useAuth()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '', agree: false })
  const [errors, setErrors] = useState({})
  const isRegister = mode === 'register'

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  function validate() {
    const e = {}
    if (isRegister && form.username.trim().length < 3) e.username = 'نام کاربری باید حداقل ۳ حرف باشد.'
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = 'ایمیل معتبر وارد کنید.'
    if (form.password.length < 6) e.password = 'رمز عبور باید حداقل ۶ کاراکتر باشد.'
    if (isRegister && form.confirm !== form.password) e.confirm = 'تکرار رمز عبور مطابقت ندارد.'
    if (isRegister && !form.agree) e.agree = 'برای ادامه باید با قوانین موافقت کنید.'
    return e
  }

  function submit(ev) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    const res = isRegister ? register(form) : login(form)
    if (res.error) setErrors({ form: res.error })
  }

  function switchMode() {
    setMode(isRegister ? 'login' : 'register')
    setErrors({})
  }

  return (
    <div className="flex justify-center px-4 py-12">
      <form onSubmit={submit} noValidate className={`${cardCls} w-full max-w-sm space-y-4 p-7 sm:p-9`}>
        <h1 className="t-title pb-2 text-center text-noir">{isRegister ? 'ثبت‌نام' : 'ورود'}</h1>

        {errors.form && (
          <p role="alert" className="rounded-2xl bg-red-900/10 px-4 py-2 text-center text-sm font-semibold text-red-900">
            {errors.form}
          </p>
        )}

        {isRegister && (
          <AuthField icon="user" label="نام کاربری" value={form.username} onChange={set('username')} error={errors.username} autoComplete="username" />
        )}
        <AuthField icon="mail" type="email" label="ایمیل" value={form.email} onChange={set('email')} error={errors.email} autoComplete="email" />
        <AuthField icon="lock" type="password" label="رمز عبور" value={form.password} onChange={set('password')} error={errors.password} autoComplete={isRegister ? 'new-password' : 'current-password'} />
        {isRegister && (
          <AuthField icon="lock" type="password" label="تکرار رمز عبور" value={form.confirm} onChange={set('confirm')} error={errors.confirm} autoComplete="new-password" />
        )}

        {isRegister && (
          <div>
            <label className="flex cursor-pointer items-start gap-2.5 px-1 text-xs leading-6">
              <input
                type="checkbox" checked={form.agree} onChange={set('agree')}
                className="mt-1 h-4 w-4 shrink-0 appearance-none rounded-full border-2 border-noir/60 checked:border-noir checked:bg-noir"
              />
              <span>با قوانین و پردازش اطلاعات شخصی موافقم</span>
            </label>
            {errors.agree && <p role="alert" className="mt-1 px-1 text-xs font-semibold text-red-900">{errors.agree}</p>}
          </div>
        )}

        <Button type="submit" variant="accent" className="mt-2 w-full !py-4 !text-base">
          {isRegister ? 'ثبت‌نام' : 'ورود'}
        </Button>

        <p className="text-center text-sm">
          {isRegister ? 'حساب داری؟' : 'حساب نداری؟'}{' '}
          <button type="button" onClick={switchMode} className="font-bold underline underline-offset-4 transition-opacity hover:opacity-70">
            {isRegister ? 'وارد شو' : 'ثبت‌نام کن'}
          </button>
        </p>
      </form>
    </div>
  )
}

/* ---------- ویرایش پروفایل ---------- */
function ProfileForm() {
  const { user, update } = useAuth()
  const [form, setForm] = useState({ username: user.username, phone: user.phone || '', address: user.address || '' })
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

  const set = (k) => (e) => {
    setSaved(false)
    setForm((f) => ({ ...f, [k]: e.target.value }))
  }

  function submit(ev) {
    ev.preventDefault()
    const er = {}
    if (form.username.trim().length < 3) er.username = 'نام کاربری باید حداقل ۳ حرف باشد.'
    if (form.phone && !/^09\d{9}$/.test(form.phone)) er.phone = 'شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد.'
    setErrors(er)
    if (Object.keys(er).length) return
    update({ ...form, username: form.username.trim() })
    setSaved(true)
  }

  return (
    <form onSubmit={submit} noValidate>
      <h2 className="t-heading">اطلاعات حساب</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <AuthField icon="user" label="نام کاربری" value={form.username} onChange={set('username')} error={errors.username} />
        <AuthField icon="mail" label="ایمیل" value={user.email} disabled readOnly />
        <AuthField icon="phone" type="tel" label="شماره موبایل (مثلاً 09123456789)" value={form.phone} onChange={set('phone')} error={errors.phone} />
        <AuthField icon="pin" label="آدرس" value={form.address} onChange={set('address')} />
      </div>
      <div className="mt-6 flex items-center gap-4">
        <Button type="submit" variant="accent" className="!px-8">ذخیره تغییرات</Button>
        {saved && <p role="status" className="text-sm font-semibold">تغییرات ذخیره شد ✓</p>}
      </div>
    </form>
  )
}

/* ---------- سفارش‌ها (داده‌ی نمونه) ---------- */
const orders = [
  { id: 10482, date: '۱۴۰۵/۰۶/۲۸', status: 'در حال پردازش', items: 2, total: 4350000 },
  { id: 10317, date: '۱۴۰۵/۰۵/۱۵', status: 'ارسال شده', items: 1, total: 1890000 },
  { id: 10094, date: '۱۴۰۵/۰۴/۰۲', status: 'تحویل شده', items: 3, total: 6120000 },
]

function Orders() {
  return (
    <div>
      <h2 className="t-heading">سفارش‌های من</h2>
      <ul className="mt-6 space-y-3">
        {orders.map((o) => (
          <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-sandLight p-5">
            <div>
              <p className="font-bold">سفارش #{num(o.id)}</p>
              <p className="mt-1 text-xs text-noir/60">{o.date} · {num(o.items)} کالا</p>
            </div>
            <span className="rounded-full bg-noir px-3 py-1 text-xs font-bold text-cream">{o.status}</span>
            <p className="w-full text-sm font-bold sm:w-auto">{formatPrice(o.total)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- داشبورد ---------- */
function Dashboard() {
  const { user, logout } = useAuth()
  const [tab, setTab] = useState('profile')

  const tabCls = (active) =>
    `w-full rounded-full px-5 py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 ${
      active ? 'bg-noir text-cream' : 'bg-sandLight/70 text-noir hover:bg-sandLight'
    }`

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="t-title text-cream">حساب کاربری</h1>
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[320px_1fr]">
        <aside className={`${cardCls} p-7 lg:sticky lg:top-24`}>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-sandLight font-display text-2xl font-black">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate font-bold">{user.username}</p>
              <p className="truncate text-xs text-noir/70" dir="ltr">{user.email}</p>
            </div>
          </div>
          <nav className="mt-6 space-y-2" aria-label="منوی حساب کاربری">
            <button onClick={() => setTab('profile')} className={tabCls(tab === 'profile')}>اطلاعات حساب</button>
            <button onClick={() => setTab('orders')} className={tabCls(tab === 'orders')}>سفارش‌های من</button>
            <button
              onClick={logout}
              className="w-full rounded-full border border-noir/30 px-5 py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:border-noir"
            >
              خروج از حساب
            </button>
          </nav>
        </aside>

        <section className={`${cardCls} p-7 sm:p-9`}>
          {tab === 'profile' ? <ProfileForm /> : <Orders />}
        </section>
      </div>
    </div>
  )
}

export default function Account() {
  const { user } = useAuth()
  return user ? <Dashboard /> : <AuthCard />
}
import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const USERS_KEY = 'ravan-users'
const SESSION_KEY = 'ravan-session'

const read = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback } catch { return fallback }
}
const write = (k, v) => {
  try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* ignore */ }
}
const publicUser = ({ password, ...u }) => u // رمز هیچ‌وقت وارد state نمی‌شود

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const email = read(SESSION_KEY, null)
    const found = read(USERS_KEY, []).find((u) => u.email === email)
    return found ? publicUser(found) : null
  })

  const value = useMemo(() => ({
    user,
    register({ username, email, password }) {
      const users = read(USERS_KEY, [])
      const mail = email.trim().toLowerCase()
      if (users.some((u) => u.email === mail)) return { error: 'این ایمیل قبلاً ثبت شده است.' }
      const u = { username: username.trim(), email: mail, password, phone: '', address: '' }
      write(USERS_KEY, [...users, u])
      write(SESSION_KEY, mail)
      setUser(publicUser(u))
      return {}
    },
    login({ email, password }) {
      const mail = email.trim().toLowerCase()
      const u = read(USERS_KEY, []).find((x) => x.email === mail && x.password === password)
      if (!u) return { error: 'ایمیل یا رمز عبور اشتباه است.' }
      write(SESSION_KEY, mail)
      setUser(publicUser(u))
      return {}
    },
    logout() {
      write(SESSION_KEY, null)
      setUser(null)
    },
    update(patch) {
      const users = read(USERS_KEY, []).map((u) => (u.email === user.email ? { ...u, ...patch } : u))
      write(USERS_KEY, users)
      setUser((u) => ({ ...u, ...patch }))
    },
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
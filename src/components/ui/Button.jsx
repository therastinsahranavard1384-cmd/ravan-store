import { Link } from 'react-router-dom'

const styles = {
  primary: 'bg-cream text-noir hover:bg-gold hover:-translate-y-0.5',
  accent: 'bg-gold text-noir hover:bg-goldSoft hover:-translate-y-0.5',
  ghost: 'border border-line bg-transparent text-cream hover:border-gold hover:text-gold hover:-translate-y-0.5',
}

export default function Button({ to, variant = 'primary', className = '', ...props }) {
  const cls = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 ${styles[variant]} ${className}`
  return to ? <Link to={to} className={cls} {...props} /> : <button className={cls} {...props} />
}

import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'ravan-cart'
const FREE_SHIPPING_FROM = 3000000
const SHIPPING_FEE = 150000

function reducer(state, a) {
  switch (a.type) {
    case 'add': {
      const key = `${a.item.id}-${a.size}`
      const found = state.find((i) => i.key === key)
      return found
        ? state.map((i) => (i.key === key ? { ...i, qty: Math.min(i.qty + a.qty, 10) } : i))
        : [...state, { ...a.item, key, size: a.size, qty: a.qty }]
    }
    case 'inc': return state.map((i) => (i.key === a.key ? { ...i, qty: Math.min(i.qty + 1, 10) } : i))
    case 'dec': return state.map((i) => (i.key === a.key ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0)
    case 'remove': return state.filter((i) => i.key !== a.key)
    default: return state
  }
}

function init() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] } catch { return [] }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], init)
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch { /* ignore */ }
  }, [items])

  const value = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE
    return {
      items, subtotal, shipping, total: subtotal + shipping, freeFrom: FREE_SHIPPING_FROM,
      count: items.reduce((s, i) => s + i.qty, 0),
      add: (item, size, qty = 1) => dispatch({ type: 'add', item, size, qty }),
      inc: (key) => dispatch({ type: 'inc', key }),
      dec: (key) => dispatch({ type: 'dec', key }),
      remove: (key) => dispatch({ type: 'remove', key }),
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)

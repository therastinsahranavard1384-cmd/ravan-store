import { useCallback, useEffect, useState } from 'react'
import { fetchProducts } from '../services/api.js'

export function useProducts() {
  const [state, setState] = useState({ data: null, loading: true, error: null })
  const load = useCallback(() => {
    setState({ data: null, loading: true, error: null })
    fetchProducts()
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((e) => setState({ data: null, loading: false, error: e.message }))
  }, [])
  useEffect(load, [load])
  return { ...state, reload: load }
}

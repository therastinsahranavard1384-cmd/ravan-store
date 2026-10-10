import { useEffect } from 'react'
import Lenis from 'lenis'

// اسکرول نرم و روان، شبیه سایت‌های جدید. اگر کاربر حرکت کم را ترجیح دهد، غیرفعال می‌شود.
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const lenis = new Lenis({ duration: 0.8, smoothWheel: true, touchMultiplier: 1.2, wheelMultiplier: 1 })
    let frame
    function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(frame); lenis.destroy() }
  }, [])
}

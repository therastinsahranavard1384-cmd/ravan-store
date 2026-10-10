import { useEffect } from 'react'
import { Outlet, useLocation, useMatch } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import MobileTabBar from './MobileTabBar.jsx'
import { useSmoothScroll } from '../../hooks/useSmoothScroll.js'

export default function Layout() {
  const { pathname } = useLocation()
  const isProductDetails = useMatch('/products/:id')
  useSmoothScroll()
  useEffect(() => {  
    window.scrollTo(0, 0) 
  }, [pathname])
  return (
    <div className="flex min-h-screen flex-col bg-noir">
      <Header />
      <main className="flex-1 pb-16 md:pb-0"><Outlet /></main>
      <Footer />
      {!isProductDetails && <MobileTabBar />}
    </div>
  )
}
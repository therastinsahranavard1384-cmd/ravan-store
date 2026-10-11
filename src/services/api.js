import { products } from '../data/products.js'

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

// Mock API. برای دیدن حالت خطا (فقط در حالت توسعه)، آدرس را با ?error=1 باز کنید.
export async function fetchProducts() {
  await wait(700)
  if (import.meta.env.DEV && new URLSearchParams(window.location.search).has('error')) {
    throw new Error('دریافت اطلاعات محصولات ناموفق بود.')
  }
  return products
}
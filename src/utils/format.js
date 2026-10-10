const nf = new Intl.NumberFormat('fa-IR')
export const num = (n) => nf.format(n)
export const formatPrice = (n) => `${nf.format(n)} تومان`

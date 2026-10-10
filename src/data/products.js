export const CATEGORIES = { running: 'دویدن', gym: 'باشگاه', outdoor: 'طبیعت‌گردی', accessories: 'لوازم جانبی' }
const CL = ['S', 'M', 'L', 'XL']
const SH = ['40', '41', '42', '43', '44']
const ONE = ['یک‌سایز']

export const products = [
  { id: 1, name: 'تی‌شرت دویدن Stride Air', category: 'running', photoTag: 'running,tshirt', price: 890000, sizes: CL, desc: 'پارچه‌ای که بعد از ده‌ها بار شست‌وشو هم شکلش را از دست نمی‌دهد. توری سبک، خشک‌شدن سریع، برای دویدن‌های هرروزه‌ات.' },
  { id: 2, name: 'شلوارک Sprint Pro', category: 'running', photoTag: 'running,shorts', price: 1150000, sizes: CL, desc: 'دوخت تقویت‌شده روی نقاطی که زودتر از بقیه پاره می‌شوند. جیب زیپ‌دار برای کلید و کارت، بدون اینکه حین دویدن تکان بخورد.' },
  { id: 3, name: 'کفش دویدن Pace Zero', category: 'running', photoTag: 'running,sneakers', price: 4200000, sizes: SH, desc: 'زیره‌ای که کیلومترها را بدون فرسایش زودهنگام تحمل می‌کند. برای آسفالت و تردمیل، روز از پی روز.' },
  { id: 4, name: 'هودی Court Fleece', category: 'gym', photoTag: 'hoodie,gym', price: 2350000, sizes: CL, desc: 'پارچه ضخیمی که پس از یک فصل استفاده هم پرز نمی‌زند. برای گرم‌کردن قبل از تمرین و راحتی بعدش.' },
  { id: 5, name: 'ساپورت Flex Tight', category: 'gym', photoTag: 'leggings,fitness', price: 1490000, sizes: CL, desc: 'کشسانی که با هر حرکت شکل بدنت را می‌گیرد، نه اینکه بعد از چند بار پوشیدن شل شود. کمر پهن که سر نمی‌خورد.' },
  { id: 6, name: 'کفش تمرین Iron Trainer', category: 'gym', photoTag: 'training,shoes', price: 3600000, sizes: SH, desc: 'کفی که زیر وزنه هم ثابت می‌ماند. برای تمرین‌های ترکیبی که به یک کفش قابل‌اعتماد نیاز دارند.' },
  { id: 7, name: 'بادگیر Ridge Shell', category: 'outdoor', photoTag: 'windbreaker,jacket', price: 3100000, sizes: CL, desc: 'در برابر باد و بارش سبک مقاوم است و در جیب خودش جمع می‌شود. همیشه توی کوله‌ات جا می‌گیرد، هر وقت لازم شد.' },
  { id: 8, name: 'شلوار Trail Cargo', category: 'outdoor', photoTag: 'cargo,pants', price: 2250000, sizes: CL, desc: 'پارچه‌ای که روی سنگ و بوته خط نمی‌افتد. جیب‌های کارگو برای وسایلی که همیشه همراهت هستند.' },
  { id: 9, name: 'کفش کوهنوردی Summit Grip', category: 'outdoor', photoTag: 'hiking,boots', price: 5200000, sizes: SH, desc: 'آج عمیقی که روی مسیرهای سنگی سر نمی‌خورد. ساق مقاوم که از مچ پایت در برابر پیچ‌خوردگی محافظت می‌کند.' },
  { id: 10, name: 'قمقمه Flow 750', category: 'accessories', photoTag: 'water,bottle', price: 480000, sizes: ONE, desc: 'درِ ضدنشتی که واقعاً نشت نمی‌کند، حتی توی کوله‌ای که وارونه می‌شود. ۷۵۰ میلی‌لیتر، برای یک روز کامل.' },
  { id: 11, name: 'شیکر Mix 600', category: 'accessories', photoTag: 'shaker,bottle', price: 350000, sizes: ONE, desc: 'توری داخلی که پروتئین را واقعاً حل می‌کند، نه اینکه ته شیشه بماند. ۶۰۰ میلی‌لیتر، هرروز قابل‌شست‌وشو.' },
  { id: 12, name: 'قمقمه Alpine 1L', category: 'accessories', photoTag: 'thermos,bottle', price: 720000, sizes: ONE, desc: 'استیل دوجداره‌ای که بعد از یک سال استفاده هنوز مثل روز اول خنک نگه می‌دارد. برای کوهنوردی‌های طولانی.' },
]

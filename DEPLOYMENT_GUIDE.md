
# راهنمای ساخت و انتشار نسخه وب اپلیکیشن

## مراحل ساخت نسخه وب

### 1. ساخت فایل‌های وب
برای ساخت نسخه وب اپلیکیشن، دستور زیر را اجرا کنید:

```bash
npm run build:web
```

این دستور:
- فایل‌های وب را در پوشه `dist` ایجاد می‌کند
- Service Worker برای کارکرد آفلاین تولید می‌کند
- تمام فایل‌ها را برای انتشار آماده می‌کند

### 2. تست محلی
برای تست نسخه وب در محیط محلی:

```bash
npm run web
```

## روش‌های انتشار

### 1. Netlify (پیشنهادی)

#### مرحله 1: ثبت نام در Netlify
- به [netlify.com](https://netlify.com) بروید
- ثبت نام کنید یا وارد شوید

#### مرحله 2: انتشار از طریق Drag & Drop
1. دستور `npm run build:web` را اجرا کنید
2. پوشه `dist` را فشرده کنید (zip)
3. به داشبورد Netlify بروید
4. فایل zip را در قسمت "Deploy" بکشید و رها کنید
5. لینک سایت شما آماده است!

#### مرحله 3: تنظیم دامنه سفارشی (اختیاری)
- در تنظیمات سایت، می‌توانید دامنه سفارشی اضافه کنید
- مثال: `rajaei-realestate.netlify.app`

### 2. Vercel

#### مرحله 1: نصب Vercel CLI
```bash
npm install -g vercel
```

#### مرحله 2: انتشار
```bash
npm run build:web
cd dist
vercel --prod
```

### 3. GitHub Pages

#### مرحله 1: آپلود کد در GitHub
1. کد را در یک repository در GitHub قرار دهید
2. دستور `npm run build:web` را اجرا کنید

#### مرحله 2: تنظیم GitHub Pages
1. به تنظیمات repository بروید
2. در قسمت Pages، source را روی "GitHub Actions" قرار دهید
3. فایل workflow زیر را در `.github/workflows/deploy.yml` ایجاد کنید:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build for web
      run: npm run build:web
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## تنظیمات مهم برای وب

### 1. SEO و متاتگ‌ها
فایل `web/index.html` شامل:
- متاتگ‌های SEO مناسب برای املاک
- پشتیبانی از زبان فارسی (RTL)
- Open Graph برای اشتراک‌گذاری در شبکه‌های اجتماعی

### 2. فونت فارسی
- فونت Vazirmatn از Google Fonts استفاده می‌شود
- پشتیبانی کامل از RTL

### 3. Service Worker
- کش کردن تصاویر و فایل‌ها
- کارکرد آفلاین
- بهبود سرعت بارگذاری

## نکات مهم

### 1. نقشه‌ها
- `react-native-maps` در وب پشتیبانی نمی‌شود
- در صورت نیاز، از Google Maps API استفاده کنید

### 2. بهینه‌سازی تصاویر
- تصاویر از Unsplash به صورت خودکار کش می‌شوند
- برای تصاویر محلی، از فرمت WebP استفاده کنید

### 3. واکنش‌گرا بودن
- طراحی برای موبایل، تبلت و دسکتاپ
- استفاده از Flexbox برای چیدمان

## لینک‌های مفید

- [مستندات Expo Web](https://docs.expo.dev/workflow/web/)
- [راهنمای Netlify](https://docs.netlify.com/)
- [راهنمای Vercel](https://vercel.com/docs)
- [راهنمای GitHub Pages](https://pages.github.com/)

## پشتیبانی

در صورت بروز مشکل:
1. لاگ‌های خطا را بررسی کنید
2. مطمئن شوید تمام dependencies نصب شده‌اند
3. نسخه Node.js حداقل 16 باشد

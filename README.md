# منصة آن للدعاية والإعلان - نموذج أولي مع GitHub Pages

هذا المستودع يحتوي على:

- صفحة هبوط ثابتة (Static Landing Page) تعمل مباشرة على GitHub Pages من ملف `index.html` في الجذر.
- مجلد `client/` يحتوي على نموذج أولي لتطبيق React + Vite يمكن تشغيله محليًا.
- مجلد `server/` يحتوي على نموذج أولي لخادم Node.js + Express.

## تشغيل صفحة الهبوط على GitHub Pages

1. ارفع هذا المجلد بالكامل إلى مستودع GitHub باسم: `an-ads-platform`.
2. تأكد أن ملف `index.html` موجود في الجذر.
3. من إعدادات المستودع (Settings) ثم Pages:
   - اختر المصدر: الفرع `main`.
   - المجلد: `/ (root)`.
4. سيعمل الموقع على الرابط:
   `https://USERNAME.github.io/an-ads-platform/`

> ملاحظة: استبدل `USERNAME` باسم حسابك في GitHub.

## تشغيل نموذج React محليًا (اختياري)

```bash
cd client
npm install
npm run dev
```

ثم افتح المتصفح على:
`http://localhost:5173`

## تشغيل الخادم (اختياري)

```bash
cd server
npm install
npm start
```

الخادم يعمل على:
`http://localhost:4000`

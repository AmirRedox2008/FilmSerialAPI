# فیلم‌لند

API کامل فیلم و سریال با Nodejs

## امکانات

- احراز هویت JWT با نقش ادمین و کاربر عادی
- CRUD کامل فیلم و سریال از طریق پنل مدیریت
- مدیریت ژانر، فصل و قسمت برای سریال‌ها
- جستجو در متن، فیلتر ژانر، مرتب‌سازی و صفحه‌بندی
- امتیازدهی ۱ تا ۱۰ با محاسبه میانگین و تعداد رأی
- ثبت نظر برای هر عنوان (یک نظر برای هر کاربر)
- لیست علاقه‌مندی اختصاصی هر کاربر

##فریمورک ها 

- بک‌اند: Node.js، Express، Prisma، SQLite، JWT، bcrypt
- فرانت‌اند: Vue 3، Vue Router، Axios، Vite

## ساختار پروژه

```
filmland/
├── server.js              نقطه شروع سرور
├── prisma/
│   ├── schema.prisma      مدل‌های دیتابیس
│   ├── seed.js            داده اولیه
│   └── data.js            داده‌های فیلم و سریال
├── src/
│   ├── routes/            مسیرهای API
│   ├── controllers/       منطق هر بخش
│   ├── middleware/        احراز هویت و دسترسی ادمین
│   └── db.js              اتصال دیتابیس
└── client/                اپلیکیشن Vue
```

## اجرای پروژه

بک‌اند:

```bash
npm install
npx prisma db push
npm run seed
npm start
```

فرانت‌اند (حالت توسعه):

```bash
cd client
npm install
npm run dev
```

برای نسخه نهایی فرانت‌اند دستور `npm run build` در پوشه client اجرا شود؛ خود Express خروجی build را روی همان پورت سرو می‌کند.

## حساب‌های تستی

| نقش | ایمیل | رمز |
|-----|-------|-----|
| ادمین | admin@filmland.ir | admin1234 |
| کاربر | ali@filmland.ir | ali12345 |
| کاربر | sara@filmland.ir | sara12345 |

## API های اصلی

| متد | مسیر | توضیح |
|-----|------|-------|
| POST | /api/auth/register | ثبت‌نام |
| POST | /api/auth/login | ورود |
| GET | /api/titles | فهرست عنوان‌ها با فیلتر و صفحه‌بندی |
| GET | /api/titles/:slug | جزئیات کامل یک عنوان |
| POST | /api/titles/:id/rate | ثبت امتیاز |
| GET/POST | /api/titles/:id/reviews | نظرات |
| GET/POST/DELETE | /api/favorites | لیست علاقه‌مندی |
| GET/POST | /api/genres | ژانرها |
| POST/PUT/DELETE | /api/titles | مدیریت (فقط ادمین) |



## تصاویر 
<img width="1920" height="2104" alt="Screenshot 2026-10-26 at 04-36-39 فیلم_لند مرجع فیلم و سریال" src="https://github.com/user-attachments/assets/9e5301bc-3c38-4ece-a5ea-9aae7d754f66" />


<img width="1920" height="1969" alt="Screenshot 2026-10-26 at 04-34-59 فیلم_لند مرجع فیلم و سریال" src="https://github.com/user-attachments/assets/3431530d-4528-4cd5-8163-cdd169deaddd" />


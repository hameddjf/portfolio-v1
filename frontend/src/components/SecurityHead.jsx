// src/components/SecurityHead.jsx

import React from 'react';
import { Helmet } from 'react-helmet-async';

function SecurityHead() {
  return (
    <Helmet>
      {/* 1. X-Content-Type-Options: جلوگیری از حدس زدن نوع فایل توسط مرورگر */}
      <meta http-equiv="X-Content-Type-Options" content="nosniff" />

      {/* 2. X-Frame-Options: جلوگیری از باز شدن سایت شما در iframe دیگران (ضد Clickjacking) */}
      <meta http-equiv="X-Frame-Options" content="DENY" />

      {/* 3. X-XSS-Protection: فعال‌سازی فیلتر ضد اسکریپت مرورگر */}
      <meta http-equiv="X-XSS-Protection" content="1; mode=block" />

      {/* 4. Referrer-Policy: عدم ارسال اطلاعات حساس در لینک‌های خروجی */}
      <meta name="referrer" content="strict-origin-when-cross-origin" />

      {/* 5. Content Security Policy (CSP): مهم‌ترین لایه دفاعی
          این خط می‌گوید: فقط اسکریپت‌ها، استایل‌ها و عکس‌های خودِ سایت (self) یا دامنه‌های امن مجاز هستند.
          (توجه: اگر از CDN برای عکس‌ها استفاده می‌کنید، باید دامنه‌هایشان را اینجا اضافه کنید)
      */}
      <meta
        http-equiv="Content-Security-Policy"
        content="
          default-src 'self'; 
          img-src 'self' data: https:; 
          script-src 'self' 'unsafe-inline'; 
          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
          font-src 'self' https://fonts.gstatic.com data:;
          connect-src 'self' https://api.emailjs.com; 
        "
      />
    </Helmet>
  );
}

export default SecurityHead;
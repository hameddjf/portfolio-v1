// src/components/SeoHead.jsx

import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * کامپوننت SeoHead: مدیریت تمامی تگ‌های سئو و متاتگ‌های شبکه‌های اجتماعی
 *
 * @param {string} title عنوان صفحه (مهم‌ترین فاکتور سئو)
 * @param {string} description توضیحات متا (مهم برای نرخ کلیک)
 * @param {string} canonicalUrl آدرس استاندارد صفحه (جلوگیری از محتوای تکراری)
 * @param {string} ogImage آدرس تصویر برای شبکه‌های اجتماعی (Open Graph)
 */
function SeoHead({
  title,
  description,
  canonicalUrl,
  ogImage
}) {
  const defaultTitle = "آژانس توسعه دهنده فول استک | برنامه‌نویسی جنگو و ری‌اکت";
  const defaultDescription = "تیم متخصص در ساخت اپلیکیشن‌های مقیاس‌پذیر با استفاده از Django و React. امنیت، سئو و پرفورمنس بالا تخصص ماست.";
  const baseUrl = "https://your-agency-website.com"; // 👈 این را با آدرس سایت خود جایگزین کنید

  // تنظیم آدرس استاندارد
  const finalCanonicalUrl = canonicalUrl || baseUrl;
  const finalTitle = title ? `${title} | آژانس توسعه` : defaultTitle;
  const finalDescription = description || defaultDescription;

  // تنظیم تصویر پیش‌فرض Open Graph (مثلاً لوگوی تیم)
  const finalOgImage = ogImage || `${baseUrl}/images/agency-logo.jpg`;

  return (
    <Helmet>
      {/* 1. متاتگ‌های پایه سئو */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* 2. تگ‌های شبکه‌های اجتماعی (Open Graph - فیسبوک، لینکدین، تلگرام) */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={finalOgImage} />

      {/* 3. تگ‌های توییتر */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />

      {/* 4. زبان محتوا و جهت‌دهی (برای سئو منطقه‌ای) */}
      <html lang="fa" dir="rtl" />
      {/* نکته: اگر زبان انگلیسی شد، باید این تگ را در همان کامپوننت header یا یک useEffect در App.jsx عوض کنیم */}
    </Helmet>
  );
}

export default SeoHead;
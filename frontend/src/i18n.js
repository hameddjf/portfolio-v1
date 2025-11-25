// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend"; // برای بارگذاری فایل‌های JSON
import LanguageDetector from "i18next-browser-languagedetector"; // برای تشخیص زبان مرورگر

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // زبان پشتیبان: اگر زبان اصلی کاربر پیدا نشد، از 'fa' استفاده شود
    fallbackLng: "fa",
    // دیباگ مود (می‌توانید بعداً آن را false کنید)
    debug: false,
    // تعیین فضای نام پیش‌فرض (که همان فایل translation.json است)
    ns: ["translation"],
    defaultNS: "translation",

    // تنظیمات Backend برای لود فایل‌ها از پوشه public
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // تنظیمات تشخیص زبان
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },

    // تنظیم برای React
    react: {
      useSuspense: false, // چون از Suspense استفاده نمی‌کنیم
    },
  });

export default i18n;
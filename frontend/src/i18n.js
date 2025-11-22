// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// این فایل‌ها را در مرحله بعد ایجاد خواهیم کرد
import translation_fa from '../public/locales/fa/translation.json';
import translation_en from '../public/locales/en/translation.json';

const resources = {
  fa: {
    translation: translation_fa
  },
  en: {
    translation: translation_en
  }
};

i18n
  .use(initReactI18next) // اتصال به React
  .init({
    resources,
    lng: 'fa', // زبان پیش‌فرض
    fallbackLng: 'en', // زبان جایگزین در صورت خطا
    interpolation: {
      escapeValue: false // برای React: از تزریق XSS جلوگیری می‌کند
    },
    // i18n را به حالت 'ready' یا 'loading' تنظیم می‌کند
    react: {
      useSuspense: false // فعلاً از Suspense استفاده نمی‌کنیم
    }
  });

export default i18n;
// src/main.jsx (نسخه کامل و اصلاح شده)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './global.css'

// 1. 👇 این خط حیاتی را اضافه کنید 👇
// این دستور، i18next را قبل از رندر شدن برنامه، راه‌اندازی می‌کند.
import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
// src/services/api.js
import axios from 'axios';

// آدرس پایه بک‌اند جنگو
const API_URL = 'http://127.0.0.1:8000/api';

// ساخت یک نمونه از Axios با تنظیمات پیش‌فرض
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
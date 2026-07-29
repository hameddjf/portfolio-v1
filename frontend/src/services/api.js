import axios from 'axios';

// آدرس پایه (در حالت لوکال)
const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



// 👇 تابع جدید برای دریافت پروژه‌ها
export const getProjects = async () => {
  try {
    const response = await api.get('/projects/');
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};
export const getSkills = async () => {
  try {
    const response = await api.get('/skils/');
    return response.data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
};
export default api;
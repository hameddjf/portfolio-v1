// src/components/FadeInOnScroll.jsx

import React, { useState, useEffect, useRef } from 'react';

function FadeInOnScroll({ children, className }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // بررسی می‌کنیم که آیا عنصر در محدوده دید (ViewPort) قرار گرفته است یا خیر
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // مهم: پس از اولین نمایش، مشاهده را متوقف می‌کنیم تا برای همیشه در حالت isVisible بماند
          observer.unobserve(domRef.current);
        }
      });
    });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      // پاکسازی IntersectionObserver هنگام حذف کامپوننت
      observer.disconnect();
    };
  }, []);

  // استایل‌های درون خطی برای اعمال انیمیشن
  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',

    // 👇 تغییر: سرعت اجرای انیمیشن را به 0.6 ثانیه کاهش دادیم (سریعتر)
    transitionDuration: '0.4s',
    transitionDelay: '0.01s', // تأخیر پایه برای شروع انیمیشن
    transitionTimingFunction: 'ease-out',
    transitionProperty: 'opacity, transform',
  };

  return (
    <div
      ref={domRef}
      className={className || ''}
      style={style}
    >
      {children}
    </div>
  );
}

export default FadeInOnScroll;
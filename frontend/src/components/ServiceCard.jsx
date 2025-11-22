// src/components/ServiceCard.jsx (بازسازی شده با CSS Modules)

import React from 'react';
import styles from './ServiceCard.module.css';

function ServiceCard({ service }) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        {/* ما در اینجا از آیکون‌های متنی ساده استفاده می‌کنیم. در آینده می‌توانید Font Awesome یا SVG واقعی اضافه کنید. */}
        {service.icon}
      </div>
      <h3 className={styles.title}>{service.title}</h3>
      <p className={styles.description}>{service.description}</p>
    </div>
  );
}

export default ServiceCard;
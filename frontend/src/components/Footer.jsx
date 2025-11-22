// src/components/Footer.jsx (بازسازی شده با CSS Modules)

import React from 'react';
import styles from './Footer.module.css';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyrightText}>
          &copy; {currentYear} <span><strong className="el el-italic"> {t('footer.copyright')}</strong> </span>
        </p>

        {/* بخش شبکه‌های اجتماعی */}
        <div className={styles.socialLinks}>
          <a href="https://github.com/[YourUsername]" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/[YourUsername]" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://twitter.com/[YourUsername]" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>

      </div>
    </footer >
  );
}
{/* <div className="container">
        <p className={styles.copyrightText}></p> */}
export default Footer;

// src/components/Header.jsx (نسخه شخصی)

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun, faMoon, faBars, faTimes, faGlobe, faFilePdf
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ThemeContext';
import styles from './Header.module.css';

function Header() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fa' ? 'en' : 'fa';
    i18n.changeLanguage(newLang);
    document.body.dir = newLang === 'fa' ? 'rtl' : 'ltr';
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>

        <div className={styles.logo}>
          <a href="#home">{t('header.title')}</a>
        </div>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            {/* لینک‌ها همیشه ثابت هستند */}
            <li><a href="#about" onClick={() => setIsMenuOpen(false)}>{t('header.nav.about')}</a></li>
            <li><a href="#services" onClick={() => setIsMenuOpen(false)}>{t('header.nav.services')}</a></li>
            <li><a href="#code-showcase" onClick={() => setIsMenuOpen(false)}>معماری کد</a></li>
            <li><a href="#projects" onClick={() => setIsMenuOpen(false)}>{t('header.nav.projects')}</a></li>
            <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>{t('header.nav.contact')}</a></li>
          </ul>
        </nav>

        <div className={styles.controls}>
          {/* دکمه PDF همیشه فعال است */}
          <button
            className={`${styles.controlBtn} ${styles.pdfBtn}`}
            onClick={handlePrint}
            title="دانلود رزومه PDF"
          >
            <FontAwesomeIcon icon={faFilePdf} />
            <span className={styles.pdfText}>PDF</span>
          </button>

          <button className={styles.controlBtn} onClick={toggleLanguage}>
            <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
              {i18n.language === 'fa' ? 'EN' : 'FA'}
            </span>
          </button>

          <button className={styles.controlBtn} onClick={toggleTheme}>
            <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
          </button>

          <button className={styles.hamburger} onClick={toggleMenu}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
        </div>

      </div>
    </header>
  );
}

export default Header;
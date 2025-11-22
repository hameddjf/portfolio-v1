// src/components/About.jsx (کامل، با i18n)

import React from 'react';
import styles from './About.module.css';
import FadeInOnScroll from './FadeInOnScroll';
import { useTranslation } from 'react-i18next'; // 1. وارد کردن هوک

function About() {
  const { t } = useTranslation(); // 2. استفاده از هوک
  const statsList = t('about.stats', { returnObjects: true }); // 3. دریافت آرایه آمار

  return (
    <section id="about" className={styles.aboutSection}>
      <div className="container">

        <FadeInOnScroll>
          <h2 className={styles.sectionTitle}>{t('about.title')}</h2>
        </FadeInOnScroll>

        <div className={styles.aboutContent}>

          <FadeInOnScroll>
            <div className={styles.imageColumn}>
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="محیط کاری توسعه‌دهنده"
                className={styles.aboutImage}
              />
            </div>
          </FadeInOnScroll>

          <div className={styles.textColumn}>

            <FadeInOnScroll>
              <h3 className={styles.subtitle}>{t('about.subtitle')}</h3>
            </FadeInOnScroll>

            <FadeInOnScroll>
              <p className={styles.description}>{t('about.desc1')}</p>
            </FadeInOnScroll>

            <FadeInOnScroll>
              <p className={styles.description}>{t('about.desc2')}</p>
            </FadeInOnScroll>

            <div className={styles.statsGrid}>
              {statsList.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <span className={styles.statNumber}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
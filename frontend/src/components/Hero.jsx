// src/components/Hero.jsx (کاملاً دوزبانه با انیمیشن تایپ داینامیک)

import React from 'react';
import styles from './Hero.module.css';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from 'react-i18next'; // 1. وارد کردن هوک

function Hero() {
  const { t, i18n } = useTranslation(); // 2. استفاده از هوک

  // 3. دریافت آرایه متن‌های تایپی از فایل ترجمه
  // نکته مهم: key={i18n.language} باعث می‌شود وقتی زبان عوض شد، انیمیشن ریست شود و با زبان جدید تایپ کند
  const typingSequence = t('hero.typing', { returnObjects: true });

  // ساختن دنباله برای TypeAnimation (متن -> صبر -> متن -> صبر)
  const sequenceWithDelays = typingSequence.flatMap(str => [str, 2000]);

  return (
    <section id="home" className={styles.heroSection}>
      {/* پس‌زمینه (توسط AnimatedBackground مدیریت می‌شود) */}

      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroContent}>

          <div className={styles.textColumn}>
            <p className={styles.introText}>{t('hero.greeting')}</p>

            <h1 className={styles.mainTitle}>
              {t('hero.title')}{' '}
              <span className={styles.typeWrapper}>
                <TypeAnimation
                  key={i18n.language} // 👈 کلید حیاتی برای تغییر زبان انیمیشن
                  sequence={sequenceWithDelays}
                  wrapper="span"
                  speed={50}
                  className={styles.typingAnimation}
                  repeat={Infinity}
                />
              </span>
            </h1>

            <p className={styles.description}>
              {t('hero.description')}
            </p>

            <div className={styles.actionButtons}>
              <a href="#projects" className={`${styles.btn} ${styles.btnPrimary}`}>
                {t('hero.ctaProjects')}
              </a>
              <a href="#contact" className={`${styles.btn} ${styles.btnSecondary}`}>
                {t('hero.ctaContact')}
              </a>
            </div>
          </div>

          <div className={styles.imageColumn}>
            <div className={styles.avatarContainer}>
              <img src="https://xsgames.co/randomusers/avatar.php?g=male" alt="Avatar" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
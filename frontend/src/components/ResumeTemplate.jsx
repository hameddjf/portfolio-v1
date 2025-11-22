// src/components/ResumeTemplate.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ResumeTemplate.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGlobe, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function ResumeTemplate({ memberData }) {
  const { t } = useTranslation();
  const projects = t('projects.list', { returnObjects: true });
  const services = t('services.list', { returnObjects: true });
  const aboutStats = t('about.stats', { returnObjects: true });

  // اگر داده عضو موجود نبود (برای جلوگیری از کرش)
  if (!memberData) return null;

  return (
    <div className={styles.resumePage} id="printable-resume">

      {/* ستون سمت چپ (سایدبار) */}
      <aside className={styles.sidebar}>
        <div className={styles.profileImgContainer}>
          <img src={memberData.image} alt={memberData.name} className={styles.profileImg} />
        </div>

        <div className={styles.contactSection}>
          <h3 className={styles.sidebarTitle}>تماس</h3>
          <div className={styles.contactItem}>
            <FontAwesomeIcon icon={faEnvelope} /> <span>{memberData.socials?.email || 'email@example.com'}</span>
          </div>
          <div className={styles.contactItem}>
            <FontAwesomeIcon icon={faGlobe} /> <span>www.yourwebsite.com</span>
          </div>
          <div className={styles.contactItem}>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> <span>Tehran, Iran</span>
          </div>
        </div>

        <div className={styles.skillSection}>
          <h3 className={styles.sidebarTitle}>مهارت‌های کلیدی</h3>
          <ul className={styles.skillList}>
            {services.map((s, i) => (
              <li key={i}>{s.title}</li>
            ))}
          </ul>
        </div>

        <div className={styles.socialSection}>
          <h3 className={styles.sidebarTitle}>شبکه‌های اجتماعی</h3>
          <div className={styles.contactItem}>
            <FontAwesomeIcon icon={faGithub} /> <span>github.com/username</span>
          </div>
          <div className={styles.contactItem}>
            <FontAwesomeIcon icon={faLinkedin} /> <span>linkedin.com/in/user</span>
          </div>
        </div>
      </aside>

      {/* ستون سمت راست (بدنه اصلی) */}
      <main className={styles.mainContent}>

        <header className={styles.header}>
          <h1 className={styles.name}>{memberData.name}</h1>
          <h2 className={styles.role}>{memberData.role}</h2>
          <p className={styles.bio}>{memberData.bio}</p>
        </header>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>آمار حرفه‌ای</h3>
          <div className={styles.statsGrid}>
            {aboutStats.map((stat, i) => (
              <div key={i} className={styles.statItem}>
                <strong>{stat.value}</strong> <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>پروژه‌های برجسته</h3>
          <div className={styles.projectsList}>
            {projects.slice(0, 3).map((proj, i) => (
              <div key={i} className={styles.projectItem}>
                <div className={styles.projectHeader}>
                  <h4>{proj.title}</h4>
                </div>
                <p className={styles.projectDesc}>{proj.shortDescription}</p>
                <div className={styles.techTags}>
                  {proj.technologies.slice(0, 5).join(' • ')}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>درباره من</h3>
          <p className={styles.longBio}>
            {t('about.desc1')} {t('about.desc2')}
          </p>
        </section>

      </main>
    </div>
  );
}

export default ResumeTemplate;
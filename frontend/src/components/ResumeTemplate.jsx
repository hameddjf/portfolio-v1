// src/components/ResumeTemplate.jsx (نسخه اصلاح شده)

import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ResumeTemplate.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGlobe, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function ResumeTemplate({ memberData }) {
  const { t } = useTranslation();
  // خواندن داده‌ها از فایل ترجمه
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
            <FontAwesomeIcon icon={faEnvelope} /> <span>{memberData.email}</span>
          </div>
          {memberData.phone && (
            <div className={styles.contactItem}>
              <FontAwesomeIcon icon={faPhone} /> <span>{memberData.phone}</span>
            </div>
          )}
          <div className={styles.contactItem}>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> <span>{memberData.location}</span>
          </div>
          <div className={styles.contactItem}>
            <FontAwesomeIcon icon={faGlobe} /> <span>{memberData.website}</span>
          </div>
        </div>

        {/* بخش خدمات */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>خدمات</h3>
          <div className={styles.servicesList}>
            {/* 👈 FIX: چک می‌کنیم که services یک آرایه باشد */}
            {Array.isArray(services) && services.map((service, index) => (
              <div key={index} className={styles.serviceItem}>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* بخش شبکه‌های اجتماعی */}
        <div className={styles.socialSection}>
          <a href={memberData.github} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} /> Github
          </a>
          <a href={memberData.linkedin} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
          </a>
        </div>
      </aside>

      {/* ستون سمت راست (محتوای اصلی) */}
      <main className={styles.mainContent}>
        {/* هدر */}
        <header className={styles.header}>
          <h1 className={styles.name}>{memberData.name}</h1>
          <h2 className={styles.title}>{memberData.title}</h2>
          <p className={styles.bio}>{memberData.bio}</p>
        </header>

        {/* آمار */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>آمار حرفه‌ای</h3>
          <div className={styles.statsGrid}>
            {/* 👈 FIX: چک می‌کنیم که aboutStats یک آرایه باشد */}
            {Array.isArray(aboutStats) && aboutStats.map((stat, i) => (
              <div key={i} className={styles.statItem}>
                <strong>{stat.value}</strong> <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* پروژه‌ها */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>پروژه‌های برجسته</h3>
          <div className={styles.projectsList}>
            {/* 👈 FIX: چک می‌کنیم که projects یک آرایه باشد */}
            {Array.isArray(projects) && projects.slice(0, 3).map((proj, i) => (
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

        {/* درباره من */}
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
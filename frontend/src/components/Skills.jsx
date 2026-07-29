// src/components/Skills.jsx (فیکس نهایی نمایش مهارت‌ها)

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faServer, faCode, faCloud, faCheckCircle, faDatabase, faTerminal, faLayerGroup
} from '@fortawesome/free-solid-svg-icons';
import styles from './Skills.module.css';
import FadeInOnScroll from './FadeInOnScroll';
import { getSkills } from '../services/api'; // 👈 ایمپورت تابع

// نگاشت نام آیکون (از دیتابیس) به کامپوننت واقعی Font Awesome
// نکته: نام‌های آیکون در جنگو باید با کلیدهای این آبجکت تطابق داشته باشند (مثلاً 'faServer' و نه 'قثل')
const iconMap = {
  "faServer": faServer,
  "faCode": faCode,
  "faCloud": faCloud,
  "faDatabase": faDatabase,
  "faTerminal": faTerminal,
  "faLayerGroup": faLayerGroup
};

function Skills() {
  const { t } = useTranslation();
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // دریافت داده‌ها از جنگو (به محض لود شدن کامپوننت)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSkills();
        // چک نهایی برای اطمینان از اینکه داده یک آرایه است
        setSkillsData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("❌ Failed to load skills data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading Skills...</div>;

  // اگر دیتایی نباشد، چیزی نمایش داده نمی‌شود (بدون کرش)
  if (skillsData.length === 0 && !loading) return null;

  return (
    <section id="skills" className={styles.skillsSection}>
      <div className="container">
        <FadeInOnScroll>
          <h2 className={styles.sectionTitle}>{t('skills.title')}</h2>
          <p className={styles.subtitle}>{t('skills.subtitle')}</p>
        </FadeInOnScroll>

        <div className={styles.bentoGrid}>
          {skillsData.map((category, index) => (
            <FadeInOnScroll key={category.id} style={{ transitionDelay: `${index * 0.1}s` }}>
              {/* نام فیلد در JSON شما 'color_code' بود */}
              <div className={styles.bentoCard} style={{ borderTopColor: category.color_code }}>

                <div className={styles.cardHeader}>
                  <div
                    className={styles.iconBox}
                    style={{ backgroundColor: `${category.color_code}20`, color: category.color_code }}
                  >
                    {/* 👇 استفاده از نام آیکون از دیتابیس یا faCode به عنوان فال‌بک */}
                    <FontAwesomeIcon icon={iconMap[category.icon_name] || faCode} />
                  </div>
                  <h3>{category.title}</h3>
                </div>

                <div className={styles.skillTags}>
                  {/* 👇 نام آرایه در JSON شما 'items' بود. نام هر مهارت 'name' است. */}
                  {category.items && category.items.map(skill => (
                    <span key={skill.name} className={styles.tag}>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={styles.tagIcon}
                        style={{ color: category.color_code }}
                      />
                      {skill.name}
                    </span>
                  ))}
                </div>

              </div>
            </FadeInOnScroll>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;
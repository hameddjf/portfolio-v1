// src/components/Services.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faCode, faCloud, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// ... (import brand icons like before) ...
import styles from './Services.module.css';
import FadeInOnScroll from './FadeInOnScroll';

const skillsData = [
  {
    id: 'backend',
    title: 'Backend & Architecture',
    icon: faServer,
    color: '#FFD43B', // Python Yellow
    items: ["Python", "Django", "FastAPI", "PostgreSQL", "Redis", "Celery", "WebSockets", "GraphQL"]
  },
  {
    id: 'frontend',
    title: 'Frontend & UI',
    icon: faCode,
    color: '#61DAFB', // React Blue
    items: ["React.js", "JavaScript (ES6+)", "Next.js", "Redux", "Tailwind CSS", "Framer Motion"]
  },
  {
    id: 'devops',
    title: 'DevOps & Tools',
    icon: faCloud,
    color: '#2496ED', // Docker Blue
    items: ["Docker", "Kubernetes", "Git & GitHub", "CI/CD Pipelines", "Nginx", "Linux", "AWS"]
  }
];

function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className={styles.skillsSection}>
      <div className="container">
        <FadeInOnScroll>
          <h2 className={styles.sectionTitle}>تخصص‌های فنی</h2>
          <p className={styles.subtitle}>جعبه ابزار کامل برای توسعه محصول از صفر تا صد</p>
        </FadeInOnScroll>

        {/* شبکه بنتو: همه مهارت‌ها در یک نگاه */}
        <div className={styles.bentoGrid}>
          {skillsData.map((category, index) => (
            <FadeInOnScroll key={category.id} style={{ transitionDelay: `${index * 0.1}s` }}>
              <div className={styles.bentoCard} style={{ borderTopColor: category.color }}>

                <div className={styles.cardHeader}>
                  <div className={styles.iconBox} style={{ backgroundColor: `${category.color}20`, color: category.color }}>
                    <FontAwesomeIcon icon={category.icon} />
                  </div>
                  <h3>{category.title}</h3>
                </div>

                <div className={styles.skillTags}>
                  {category.items.map(skill => (
                    <span key={skill} className={styles.tag}>
                      <FontAwesomeIcon icon={faCheckCircle} className={styles.tagIcon} style={{ color: category.color }} />
                      {skill}
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

export default Services;
// src/components/Projects.jsx (کامل، با i18n و معماری "معرکه")

import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import styles from './Projects.module.css';
import FadeInOnScroll from './FadeInOnScroll';
import { useTranslation } from 'react-i18next';

// 1. وارد کردن همه‌ی آیکون‌های مورد نیاز
import {
  faServer,
  faGraduationCap,
  faMoneyBillTransfer,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';

// 2. مپ کردن نام آیکون (از JSON) به آبجکت آیکون (روش سنیور)
const iconMap = {
  "faServer": faServer,
  "faGraduationCap": faGraduationCap,
  "faMoneyBillTransfer": faMoneyBillTransfer,
  "faChartLine": faChartLine
};

function Projects() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);

  // 3. خواندن لیست پروژه‌ها مستقیماً از فایل JSON ترجمه
  // returnObjects: true به i18n می‌گوید که یک آرایه کامل را برگرداند
  const projectsList = t('projects.list', { returnObjects: true });

  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className="container">
        <FadeInOnScroll>
          <h2 className={styles.sectionTitle}>
            {t('projects.title')}
          </h2>
        </FadeInOnScroll>

        <div className={styles.projectsGrid}>
          {/* 4. مپ کردن روی لیست پروژه‌های ترجمه شده */}
          {projectsList.map((project, index) => (
            <FadeInOnScroll
              key={project.id}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <ProjectCard
                // 5. ارسال پروژه به همراه آیکون مپ شده
                project={{
                  ...project,
                  icon: iconMap[project.iconName] // تبدیل نام به آبجکت آیکون
                }}
                onOpenModal={handleOpenModal}
              />
            </FadeInOnScroll>
          ))}
        </div>
      </div>

      {/* 6. مودال اکنون باید پروژه کامل را (که شامل longDescription است) دریافت کند
           و همچنین باید دوزبانه شود.
      */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}

export default Projects;
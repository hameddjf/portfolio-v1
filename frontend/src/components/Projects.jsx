// src/components/Projects.jsx (نسخه اصلاح شده برای عکس و استایل)

import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import styles from './Projects.module.css';
import FadeInOnScroll from './FadeInOnScroll';
import { useTranslation } from 'react-i18next';
import { getProjects } from '../services/api';
import { faServer, faCode, faMobileAlt, faDatabase, faLaptopCode } from '@fortawesome/free-solid-svg-icons';

// 1. آدرس سرور جنگو (برای چسباندن به عکس‌ها)
const API_DOMAIN = 'http://127.0.0.1:8000';

const iconMap = {
  "faServer": faServer,
  "faCode": faCode,
  "faMobileAlt": faMobileAlt,
  "faDatabase": faDatabase
};

// 2. لیستی از گرادینت‌های زیبا برای کارت‌ها (چون در دیتابیس ذخیره نکردیم)
const GRADIENTS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #0077B6 0%, #00A693 100%)",
  "linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)",
  "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
];

function Projects() {
  const { t, i18n } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProjects();
      setProjectsList(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleOpenModal = (project) => setSelectedProject(project);
  const handleCloseModal = () => setSelectedProject(null);

  const getContent = (project, field) => {
    const langSuffix = i18n.language === 'fa' ? '_fa' : '_en';
    return project[`${field}${langSuffix}`] || project[`${field}_en`]; // Fallback to English
  };

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className="container">
        <FadeInOnScroll>
          <h2 className={styles.sectionTitle}>{t('projects.title')}</h2>
        </FadeInOnScroll>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2rem' }}>
            در حال دریافت پروژه‌ها از سرور...
          </div>
        ) : (
          <div className={styles.projectsGrid}>
            {projectsList.map((project, index) => {
              let imageUrl = null;

              if (project.image) {
                // اصلاح هوشمند: اگر خودش http داشت، دست نزن. اگر نداشت، دامین رو بچسبون.
                // همچنین چک می‌کنیم که اسلش اضافی ایجاد نشود.
                const hasHttp = project.image.startsWith('http');
                if (hasHttp) {
                  imageUrl = project.image;
                } else {
                  // حذف اسلش ابتدایی اگر وجود داشته باشد تا آدرس تمیز شود
                  const cleanPath = project.image.startsWith('/') ? project.image.slice(1) : project.image;
                  imageUrl = `${API_DOMAIN}/${cleanPath}`;
                }
              }

              // 4. انتخاب گرادینت بر اساس ایندکس (چرخشی)
              const cardGradient = GRADIENTS[index % GRADIENTS.length];

              return (
                <FadeInOnScroll key={project.id} style={{ transitionDelay: `${index * 0.1}s` }}>
                  <ProjectCard
                    project={{
                      ...project,
                      id: project.id,
                      title: getContent(project, 'title'),
                      shortDescription: getContent(project, 'short_desc'),
                      longDescription: getContent(project, 'long_desc'),
                      // لیست تکنولوژی‌ها (از متد get_tech_list در سریالایزر می‌آید)
                      technologies: project.tech_list || [],

                      // 👈 فیکس عکس:
                      image: imageUrl,

                      // 👈 فیکس استایل: اضافه کردن گرادینت و آیکون پیش‌فرض
                      gradient: cardGradient,
                      icon: faLaptopCode, // یک آیکون پیش‌فرض شیک
                    }}
                    onOpenModal={handleOpenModal}
                  />
                </FadeInOnScroll>
              );
            })}
          </div>
        )}
      </div>

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
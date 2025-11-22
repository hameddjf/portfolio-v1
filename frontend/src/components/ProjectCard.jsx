// src/components/ProjectCard.jsx (کامل، با i18n)

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './ProjectCard.module.css';
import { useTranslation } from 'react-i18next'; // 1. وارد کردن هوک

function ProjectCard({ project, onOpenModal }) {
  const { t } = useTranslation(); // 2. استفاده از هوک

  return (
    <div className={styles.projectCard}>
      <div
        className={styles.cardHeader}
        style={{ background: project.gradient }}
      >
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon icon={project.icon} className={styles.projectIcon} />
        </div>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDescription}>{project.shortDescription}</p>

        <div className={styles.techStack}>
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span key={index} className={styles.techBadge}>
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className={styles.techBadge}>+{project.technologies.length - 4}</span>
          )}
        </div>

        <div className={styles.cardActions}>
          <button
            className={styles.btnDetails}
            onClick={() => onOpenModal(project)}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            {t('projects.cta_details')} {/* 3. ترجمه متن دکمه */}
          </button>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnLink}
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
              {t('projects.cta_link')} {/* 4. ترجمه متن لینک */}
            </a>
          )}
        </div>
      </div>

      <div className={styles.cardShine}></div>
    </div>
  );
}

export default ProjectCard;
// src/components/ProjectCard.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faInfoCircle, faCode } from '@fortawesome/free-solid-svg-icons';
import styles from './ProjectCard.module.css';
import { useTranslation } from 'react-i18next';

function ProjectCard({ project, onOpenModal }) {
  const { t } = useTranslation();

  return (
    <div className={styles.projectCard}>

      {/* کانتینر عکس با ارتفاع ثابت */}
      <div className={styles.imageContainer}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className={styles.projectImage}
            // اگر عکس لود نشد، این تابع اجرا میشه و عکس رو مخفی میکنه تا زشت نشه
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex'; // نمایش آیکون جایگزین
            }}
          />
        ) : null}

        {/* لایه گرادینت روی عکس */}
        <div className={styles.overlay}></div>

        {/* آیکون جایگزین (اگر عکس نبود یا لود نشد) */}
        {!project.image && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(45deg, #1e293b, #0f172a)'
          }}>
            <FontAwesomeIcon icon={faCode} style={{ fontSize: '3rem', color: '#334155' }} />
          </div>
        )}
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDescription}>{project.shortDescription}</p>

        <div className={styles.techStack}>
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span key={index} className={styles.techBadge}>
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className={styles.techBadge}>+{project.technologies.length - 3}</span>
          )}
        </div>

        <div className={styles.cardActions}>
          <button
            className={styles.btnDetails}
            onClick={() => onOpenModal(project)}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            {t('projects.cta_details')}
          </button>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnLink}
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
              {t('projects.cta_link')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
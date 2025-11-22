// src/components/ProjectModal.jsx (کامل، با i18n و React Portals)

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'; // 1. وارد کردن پورتال
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './ProjectModal.module.css';
import { useTranslation } from 'react-i18next'; // 2. وارد کردن هوک

const modalRoot = document.getElementById('modal-root');

function ProjectModal({ project, onClose }) {
  const { t } = useTranslation(); // 3. استفاده از هوک

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const modalContent = (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div
          className={styles.modalHeader}
          style={{ background: project.gradient }}
        >
          <div className={styles.modalIconWrapper}>
            <FontAwesomeIcon icon={project.icon} className={styles.modalIcon} />
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          <h2 className={styles.modalTitle}>{project.title}</h2>
          <p className={styles.modalDescription}>{project.longDescription}</p>

          <div className={styles.techSection}>
            <h3 className={styles.sectionTitle}>
              {t('projects.modal.tech_title')} {/* 4. ترجمه عنوان بخش */}
            </h3>
            <div className={styles.techGrid}>
              {project.technologies.map((tech, index) => (
                <div key={index} className={styles.techItem}>
                  <span className={styles.techDot}></span>
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {project.link && (
            <div className={styles.modalFooter}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLink}
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                {t('projects.modal.link_title')} {/* 5. ترجمه لینک نهایی */}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // 6. استفاده از پورتال برای رندر مودال
  return ReactDOM.createPortal(modalContent, modalRoot);
}

export default ProjectModal;
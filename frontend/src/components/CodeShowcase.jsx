// src/components/CodeShowcase.jsx

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';
import { faReact, faPython } from '@fortawesome/free-brands-svg-icons';
import styles from './CodeShowcase.module.css';
import FadeInOnScroll from './FadeInOnScroll';
import { useTranslation } from 'react-i18next'; // هوک ترجمه

function CodeShowcase() {
  const { t } = useTranslation(); // 1. دریافت تابع ترجمه
  const [copiedId, setCopiedId] = useState(null);

  // 2. تعریف داده‌ها در داخل کامپوننت (چون به t نیاز داریم)
  const codeSnippets = [
    {
      id: 'frontend',
      title: t('codeShowcase.snippets.frontend.title'), // استفاده از ترجمه
      icon: faReact,
      language: 'jsx',
      color: '#61DAFB',
      description: t('codeShowcase.snippets.frontend.desc'), // استفاده از ترجمه
      code: `const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      className={styles.card}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className={styles.glassEffect}>
        <h3>{project.title}</h3>
        <TechStack list={project.techs} />
      </div>
    </motion.div>
  );
};`
    },
    {
      id: 'backend',
      title: t('codeShowcase.snippets.backend.title'),
      icon: faPython,
      language: 'python',
      color: '#FFD43B',
      description: t('codeShowcase.snippets.backend.desc'),
      code: `class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.select_related('category')
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        project = self.get_object()
        project.likes += 1
        project.save()
        return Response({'status': 'liked'})`
    },
    {
      id: 'database',
      title: t('codeShowcase.snippets.database.title'),
      icon: faDatabase,
      language: 'python',
      color: '#336791',
      description: t('codeShowcase.snippets.database.desc'),
      code: `class Project(models.Model):
    title = models.CharField(db_index=True)
    slug = models.SlugField(unique=True)
    tech_stack = ArrayField(models.CharField(max_length=50))
    
    class Meta:
        ordering = ['-created_at']
        indexes = [models.Index(fields=['slug'])]`
    }
  ];

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="code-showcase" className={styles.showcaseSection}>
      <div className="container">
        <FadeInOnScroll>
          <h2 className={styles.sectionTitle}>{t('codeShowcase.title')}</h2>
          <p className={styles.subtitle}>{t('codeShowcase.subtitle')}</p>
        </FadeInOnScroll>

        <div className={styles.staggeredContainer}>
          {codeSnippets.map((snippet, index) => (
            <FadeInOnScroll key={snippet.id} className={styles.scrollWrapper}>
              <div className={`${styles.codeBlock} ${index % 2 === 0 ? styles.left : styles.right}`}>

                <div className={styles.descriptionBox}>
                  <div className={styles.iconCircle} style={{ color: snippet.color, borderColor: snippet.color }}>
                    <FontAwesomeIcon icon={snippet.icon} />
                  </div>
                  <h3>{snippet.title}</h3>
                  <p>{snippet.description}</p>
                </div>

                <div className={styles.codeWindow}>
                  <div className={styles.windowHeader}>
                    <div className={styles.dots}>
                      <span className={styles.dotRed}></span>
                      <span className={styles.dotYellow}></span>
                      <span className={styles.dotGreen}></span>
                    </div>
                    <span className={styles.filename}>{snippet.title}</span>
                    <button
                      className={styles.copyBtn}
                      onClick={() => handleCopy(snippet.code, snippet.id)}
                    >
                      <FontAwesomeIcon icon={copiedId === snippet.id ? faCheck : faCopy} />
                    </button>
                  </div>

                  <div className={styles.codeBody}>
                    <SyntaxHighlighter
                      language={snippet.language}
                      style={atomDark}
                      customStyle={{ background: 'transparent', fontSize: '0.85rem', margin: 0 }}
                      showLineNumbers={true}
                    >
                      {snippet.code}
                    </SyntaxHighlighter>
                  </div>
                </div>

              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CodeShowcase;
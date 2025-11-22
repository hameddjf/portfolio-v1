// src/components/ContactForm.jsx (نسخه متصل به بک‌اند)

import React, { useState } from 'react';
import styles from './ContactForm.module.css';
import FadeInOnScroll from './FadeInOnScroll';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEnvelope, faMapMarkerAlt, faSpinner, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import api from '../services/api'; // 👈 وارد کردن سرویس API

function ContactForm() {
  const { t } = useTranslation();

  // 1. مدیریت وضعیت فرم (State)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'پیام از پورتفولیو', // مقدار پیش‌فرض
    message: ''
  });

  // 2. مدیریت وضعیت ارسال (Loading, Success, Error)
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // تابع تغییر ورودی‌ها
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // تابع ارسال فرم به جنگو
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // 👇 ارسال واقعی به آدرس: http://127.0.0.1:8000/api/contact/
      const response = await api.post('/contact/', formData);

      if (response.status === 201) {
        setStatus('success');
        setFeedbackMsg('پیام شما با موفقیت ارسال شد! به زودی پاسخ می‌دهم.');
        setFormData({ name: '', email: '', subject: 'پیام از پورتفولیو', message: '' }); // پاک کردن فرم
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus('error');
      setFeedbackMsg('متاسفانه خطایی رخ داد. لطفا دوباره تلاش کنید یا مستقیم ایمیل بزنید.');
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="container">

        <FadeInOnScroll>
          <h2 className={styles.sectionTitle}>{t('contact.title')}</h2>
          <p className={styles.subtitle}>{t('contact.subtitle')}</p>
        </FadeInOnScroll>

        <div className={styles.contentWrapper}>

          {/* کارت اطلاعات (بدون تغییر) */}
          <FadeInOnScroll className={styles.infoColumn}>
            <div className={styles.infoCard}>
              <h3>{t('contact.info.title')}</h3>
              <p>{t('contact.info.desc')}</p>
              <div className={styles.infoItem}>
                <div className={styles.iconCircle}><FontAwesomeIcon icon={faEnvelope} /></div>
                <div>
                  <span className={styles.label}>ایمیل</span>
                  <a href="mailto:hamed@example.com" className={styles.value}>hamed@example.com</a>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.iconCircle}><FontAwesomeIcon icon={faMapMarkerAlt} /></div>
                <div>
                  <span className={styles.label}>{t('contact.info.locationLabel')}</span>
                  <span className={styles.value}>{t('contact.info.locationValue')}</span>
                </div>
              </div>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialBtn}><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="#" className={styles.socialBtn}><FontAwesomeIcon icon={faGithub} /></a>
              </div>
              <div className={styles.decorationCircle}></div>
            </div>
          </FadeInOnScroll>

          {/* فرم تماس (متصل به API) */}
          <FadeInOnScroll className={styles.formColumn} style={{ transitionDelay: '0.2s' }}>
            <form className={styles.contactForm} onSubmit={handleSubmit}>

              {/* نمایش پیام موفقیت یا خطا */}
              {status === 'success' && (
                <div className={styles.alertSuccess}>
                  <FontAwesomeIcon icon={faCheckCircle} /> {feedbackMsg}
                </div>
              )}
              {status === 'error' && (
                <div className={styles.alertError}>
                  <FontAwesomeIcon icon={faExclamationCircle} /> {feedbackMsg}
                </div>
              )}

              <div className={styles.inputGroup}>
                <input
                  type="text" id="name" name="name" required placeholder=" "
                  value={formData.name} onChange={handleChange}
                  disabled={status === 'loading'}
                />
                <label htmlFor="name">{t('contact.form.name')}</label>
                <div className={styles.underline}></div>
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="email" id="email" name="email" required placeholder=" "
                  value={formData.email} onChange={handleChange}
                  disabled={status === 'loading'}
                />
                <label htmlFor="email">{t('contact.form.email')}</label>
                <div className={styles.underline}></div>
              </div>

              <div className={styles.inputGroup}>
                <textarea
                  id="message" name="message" rows="4" required placeholder=" "
                  value={formData.message} onChange={handleChange}
                  disabled={status === 'loading'}
                ></textarea>
                <label htmlFor="message">{t('contact.form.message')}</label>
                <div className={styles.underline}></div>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <span>در حال ارسال...</span>
                    <FontAwesomeIcon icon={faSpinner} spin />
                  </>
                ) : (
                  <>
                    <span>{t('contact.form.submit')}</span>
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </>
                )}
              </button>

            </form>
          </FadeInOnScroll>

        </div>
      </div>
    </section>
  );
}

export default ContactForm;
import React, { useState } from 'react';
import styles from './ContactForm.module.css';
import FadeInOnScroll from './FadeInOnScroll';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEnvelope, faMapMarkerAlt, faSpinner, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import api from '../services/api';

function ContactForm() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',  // ✅ خالی باشد تا بکند مقدار پیش‌فرض بدهد
    message: ''
  });

  const [status, setStatus] = useState('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setFeedbackMsg('');

    try {
      console.log('📤 در حال ارسال داده:', formData);

      const response = await api.post('/contact/', formData);

      console.log('✅ پاسخ دریافت شد:', response.data);

      if (response.data.success) {
        setStatus('success');
        setFeedbackMsg(response.data.message || 'پیام شما با موفقیت ارسال شد!');

        // پاک کردن فرم
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        // بعد از 5 ثانیه پیام موفقیت را پاک کن
        setTimeout(() => {
          setStatus('idle');
          setFeedbackMsg('');
        }, 5000);
      }
    } catch (error) {
      console.error("❌ خطا در ارسال:", error);
      console.error("جزئیات خطا:", error.response?.data);

      setStatus('error');

      // نمایش پیام خطا
      if (error.response?.data?.error) {
        setFeedbackMsg(error.response.data.error);
      } else if (error.response?.data?.errors) {
        const errorMessages = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join(' | ');
        setFeedbackMsg(errorMessages);
      } else if (error.response?.data?.message) {
        setFeedbackMsg(error.response.data.message);
      } else {
        setFeedbackMsg('خطا در اتصال به سرور. لطفاً دوباره تلاش کنید.');
      }

      // بعد از 7 ثانیه پیام خطا را پاک کن
      setTimeout(() => {
        setStatus('idle');
        setFeedbackMsg('');
      }, 7000);
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
          <FadeInOnScroll className={styles.infoColumn}>
            <div className={styles.infoCard}>
              <h3>{t('contact.info.title')}</h3>
              <p>{t('contact.info.desc')}</p>
              <div className={styles.infoItem}>
                <div className={styles.iconCircle}><FontAwesomeIcon icon={faEnvelope} /></div>
                <div>
                  <span className={styles.label}>{t('contact.info.emailLabel')}</span>
                  <a href="mailto:hameddjf106@gmail.com" className={styles.value}>hameddjf106@gmail.com</a>
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
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
              <div className={styles.decorationCircle}></div>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll className={styles.formColumn} style={{ transitionDelay: '0.2s' }}>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
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
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  autoComplete="name"
                />
                <label htmlFor="name">{t('contact.form.name')}</label>
                <div className={styles.underline}></div>
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  autoComplete="email"
                />
                <label htmlFor="email">{t('contact.form.email')}</label>
                <div className={styles.underline}></div>
              </div>

              <div className={styles.inputGroup}>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  placeholder=" "
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                ></textarea>
                <label htmlFor="message">{t('contact.form.message')}</label>
                <div className={styles.underline}></div>
              </div>

              <button type="submit" className={styles.submitButton} disabled={status === 'loading'}>
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
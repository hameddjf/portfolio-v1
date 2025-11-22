// src/components/AnimatedBackground.jsx (نسخه جدید با CSS گرادیانت متحرک)

import React from 'react';
import styles from './AnimatedBackground.module.css';

const AnimatedBackground = () => {
  return (
    <div className={styles.gradientBackground}>
      <div className={styles.gradientLayer}></div>
      <div className={styles.waveLayer}></div>
      <div className={styles.particlesLayer}></div>
      <div className={styles.spotlightLayer}></div>
      <div className={styles.stripesLayer}></div>
      <div className={styles.glassOrbs}>
        <div className={`${styles.orb} ${styles.orb1}`}></div>
        <div className={`${styles.orb} ${styles.orb2}`}></div>
        <div className={`${styles.orb} ${styles.orb3}`}></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
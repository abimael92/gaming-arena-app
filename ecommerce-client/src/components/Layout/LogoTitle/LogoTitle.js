import React, { useState, useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import Link from 'next/link';
import styles from './LogoTitle.module.scss';

const SIZES = {
  BIG: 320,
  MEDIUM: 160,
  SMALL: 80,
};

const LogoTitle = ({ size = 'MEDIUM' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const imgGame = SIZES[size] || SIZES.MEDIUM;
  const imgGaming = Math.floor(imgGame * 0.7);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Link href="/" legacyBehavior>
      <div
        className={`${styles.logoTitle} ${isLoaded ? styles.loaded : ''} ${isHovered ? styles.hovered : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.logoBackground}>
          <div className={styles.glowEffect}></div>
          <div className={styles.particles}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={styles.particle}
              ></div>
            ))}
          </div>

          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <div className={styles.iconContainer}>
                <Image
                  src="/images/gamingCtrl.png"
                  alt="Game Controller"
                  width={64}  // Increased from 48
                  height={64} // Increased from 48
                  className={styles.controllerIcon}
                  style={{ objectFit: 'contain' }}
                />
                <div className={styles.pulseRing}></div>
              </div>

              <div className={styles.titleContainer}>
                <Image
                  src="/images/gaming_title.png"
                  alt="Gaming"
                  width={260}  // Increased from 120
                  height={80}  // Increased from 28
                  className={styles.titleText}
                  style={{ objectFit: 'contain' }}
                />
                <div className={styles.underline}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LogoTitle;
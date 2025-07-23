import React from 'react';
import { Image } from 'semantic-ui-react';
import Link from 'next/link';
import styles from './LogoTitle.module.scss';

const SIZES = {
  BIG: 320,
  MEDIUM: 160,
  SMALL: 80,
};

const LogoTitle = ({ size }) => {
  const imgGame = SIZES[size] || SIZES.MEDIUM; // Default to MEDIUM if size is invalid
  const imgGaming = Math.floor(imgGame * 0.7);

  return (
    <Link href="/">
      <div className={styles.logoTitle}>

        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/gamingCtrl.png"
              alt="Game"
              height={40}
              width={40}
              style={{ objectFit: 'contain' }}
            />
            <Image
              src="/images/gaming_title.png"
              alt="Gaming"
              height={24}
              style={{ marginLeft: '8px', objectFit: 'contain' }}
            />

          </div>
        </div >
      </div>
    </Link >
  );
};

export default LogoTitle;

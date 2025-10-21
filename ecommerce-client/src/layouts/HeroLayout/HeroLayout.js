import Link from 'next/link';
import { Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';

import LogoTitle from '@/components/Layout/LogoTitle';
import styles from './HeroLayout.module.scss';

export function HeroLayout(props) {
  const { children } = props;
  const router = useRouter();

  return (
    <div className={styles.hero}>


      <div className={styles.topBar}>
        <LogoTitle size="MEDIUM" />
        {router.pathname !== '/' && (
          <Link href="/" className={styles.closeButton}>
            <Icon name="close" />
          </Link>
        )}
      </div>

      {/* <div className={styles.container}> */}


      <div className={styles.content}>
        <div className={styles.blockLeft}>
          {children}
        </div>

        <div className={styles.blockRight} />
      </div>
      {/* </div> */}
    </div >


  );
}
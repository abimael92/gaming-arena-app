import { Button } from 'semantic-ui-react';
import Link from 'next/link';
import { HeroLayout } from '@/layouts';
import { Seo } from '@/components/Shared';
import { useState, useEffect } from 'react';
import styles from './landing-guest.module.scss';

export default function LandingGuestPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: '🎮',
      title: 'Latest Games',
      description: 'Access newest releases and trending titles'
    },
    {
      icon: '🏆',
      title: 'Achievements',
      description: 'Track your progress and earn rewards'
    },
    {
      icon: '👥',
      title: 'Community',
      description: 'Connect with fellow gamers worldwide'
    },
    {
      icon: '💎',
      title: 'Premium Content',
      description: 'Exclusive access to special features'
    }
  ];

  return (
    <>
      <Seo
        title="Ultimate Gaming Platform | Next-Gen Gaming Experience"
        description="Join the ultimate gaming community. Explore latest games, connect with players, and unlock achievements. Your gaming journey starts here!"
      />

      <HeroLayout>
        <div className={styles.homeContainer}>
          {/* Animated Background Elements */}
          <div className={styles.animatedBackground}>
            <div className={styles.floatingShape}></div>
            <div className={styles.floatingShape}></div>
            <div className={styles.floatingShape}></div>
          </div>

          <div className={`${styles.homeHeaderWrapper} ${isVisible ? styles.visible : ''}`}>
            <h1 className={styles.homeHeader}>
              Welcome to the Ultimate{' '}
              <span className={styles.gradientText}>Gaming Experience</span>!
            </h1>
            <div className={styles.subtitle}>
              Where Every Player Becomes a Legend
            </div>
          </div>

          <div className={`${styles.homeInfo} ${isVisible ? styles.visible : ''}`}>
            <p className={styles.description}>
              Dive into our massive collection of the latest and greatest video games.
              From epic adventures to competitive battles, discover worlds that match
              your passion and skills.
            </p>

            {/* Features Grid */}
            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={styles.featureCard}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Interactive CTA Section */}
            <div className={styles.ctaSection}>
              <div className={styles.actions}>
                <Button size="huge" className={styles.tryOutButton}>
                  <Link href="join/sign-in" legacyBehavior>
                    <a>
                      Start Your Journey
                      <span>→</span>
                    </a>
                  </Link>
                </Button>

                <Button size="large" basic className={styles.secondaryButton}>
                  <Link href="/games" legacyBehavior>
                    <a>Explore Games</a>
                  </Link>
                </Button>
              </div>

              {/* Stats Counter */}
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>50K+</div>
                  <div className={styles.statLabel}>Active Gamers</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>1000+</div>
                  <div className={styles.statLabel}>Games</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>24/7</div>
                  <div className={styles.statLabel}>Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeroLayout>
    </>
  );
}
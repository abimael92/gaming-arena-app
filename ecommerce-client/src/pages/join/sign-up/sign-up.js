import Link from 'next/link';
import { JoinLayout } from '@/layouts';
import { RegisterForm } from '@/components/Auth';
import { Seo } from '@/components/Shared';
import styles from './sign-up.module.scss';
import { ArrowLeft, Crown, GamepadIcon, Gift, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SignUpPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const benefits = [
    { icon: Crown, title: "Exclusive Deals", description: "Member-only discounts & early access" },
    { icon: GamepadIcon, title: "Game Library", description: "Track your collection & wishlist" },
    { icon: Gift, title: "Rewards Program", description: "Earn points with every purchase" },
    { icon: Users, title: "Community Access", description: "Join tournaments & events" }
  ];

  return (
    <>
      <Seo title="Join Gaming Arena - Create Your Account" />

      <JoinLayout>
        <div className={`${styles.signUp} ${isVisible ? styles.visible : ''}`}>
          {/* Header Section */}
          <div className={styles.header}>
            <h1>Join the Arena!</h1>
            <p>Create your account and level up your gaming experience</p>
          </div>

          {/* Enhanced Benefits Grid */}
          <div className={styles.benefits}>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={styles.benefitItem}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={styles.iconContainer}>
                  <benefit.icon className={styles.icon} />
                  <div className={styles.iconGlow} />
                </div>
                <div className={styles.content}>
                  <h4>{benefit.title}</h4>
                  <p>{benefit.description}</p>
                </div>
                <div className={styles.hoverEffect} />
              </div>
            ))}
          </div>

          {/* Registration Form */}
          <RegisterForm />

          {/* Actions Section */}
          <div className={styles.actions}>
            <Link href="/join/sign-in" className={styles.backLink}>
              <ArrowLeft size={16} />
              Back to Sign In
            </Link>

            <div className={styles.signInPrompt}>
              <span>Already have an account?</span>
              <Link href="/join/sign-in" className={styles.primaryLink}>
                Sign In Now
              </Link>
            </div>
          </div>
        </div>
      </JoinLayout>
    </>
  );
}
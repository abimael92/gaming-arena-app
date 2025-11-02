import Link from 'next/link';
import { Container, Image, Button, Icon } from 'semantic-ui-react';
import LogoTitle from '@/components/Layout/LogoTitle';
import { useState, useEffect } from 'react';
import styles from './Footer.module.scss';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const socialLinks = [
    { name: 'facebook', href: 'https://www.facebook.com/', color: 'facebook' },
    { name: 'twitter', href: 'https://twitter.com/', color: 'twitter' },
    { name: 'linkedin', href: 'https://www.linkedin.com/', color: 'linkedin' },
    { name: 'youtube', href: 'https://www.youtube.com/', color: 'youtube' }
  ];

  const footerLinks = [
    { label: 'Terms and Conditions', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'FAQs', href: '#' }
  ];

  return (
    <div className={`${styles.footer} ${isVisible ? styles.visible : ''}`}>
      <Container>
        <div className={styles.columns}>
          <div className={styles.brand}>
            <LogoTitle size="SMALL" />
            <p className={styles.tagline}>
              Your ultimate gaming destination
            </p>
          </div>

          <div className={styles.links}>
            <h4>Quick Links</h4>
            <ul>
              {footerLinks.map((link, index) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={styles.link}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.social}>
            <h4>Follow Us</h4>
            <div className={styles.socialButtons}>
              {socialLinks.map((social, index) => (
                <Button
                  key={social.name}
                  as="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  circular
                  color={social.color}
                  className={styles.socialButton}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon name={social.name} className={styles.icon} />
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          <span>Copyright © {currentYear} Gaming Arena - All rights reserved</span>
        </div>
      </Container>
    </div>
  );
}
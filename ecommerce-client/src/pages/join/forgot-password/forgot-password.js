import Link from 'next/link'
import { JoinLayout } from '@/layouts'
import { ResetPasswordForm } from '@/components/Auth/ForgotPasswordForm'
import { Seo } from '@/components/Shared'
import styles from './forgot-password.module.scss'
import { Key, ArrowLeft, Mail, Shield, Zap, GamepadIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ForgotPasswordPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      <Seo title="Reset Your Password - Gaming Arena" />

      <JoinLayout>
        <div className={`${styles.forgotPassword} ${isVisible ? styles.visible : ''}`}>

          {/* Animated Background */}
          <div className={styles.animatedBackground}>
            <div className={styles.floatingShape}></div>
            <div className={styles.floatingShape}></div>
            <div className={styles.floatingShape}></div>
          </div>

          {/* Header Section */}
          <div className={`${styles.headerWrapper} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.iconContainer}>
              <Image
                className={styles.mainIcon}
                src='/images/logo.png'
                alt="Gaming Arena Logo"
                width={80}
                height={80}
              />
              {/* <Key className={styles.mainIcon} /> */}
              <div className={styles.iconGlow} />
            </div>
            <h1 className={styles.homeHeader}>
              <span className={styles.gradientText}>Reset Password</span>
            </h1>
            <p className={styles.subtitle}>Enter your email to reclaim your gaming throne</p>
          </div>

          {/* Security Features */}
          <div className={styles.securityFeatures}>
            <div className={styles.feature}>
              <Shield className={styles.featureIcon} />
              <span>Secure password reset</span>
            </div>
            <div className={styles.feature}>
              <Zap className={styles.featureIcon} />
              <span>Instant reset link</span>
            </div>
            <div className={styles.feature}>
              <Mail className={styles.featureIcon} />
              <span>Link expires in 1 hour</span>
            </div>
          </div>


          {/* Reset Form */}
          <div className={styles.formContainer}>
            <ResetPasswordForm />
          </div>

          {/* Help Text */}
          <div className={styles.helpText}>
            <Mail className={styles.helpIcon} />
            <p>Check your spam folder if you don't see our email within minutes</p>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <Link href="/join/sign-in" className={styles.backLink}>
              <ArrowLeft size={16} />
              Back to Sign In
            </Link>
          </div>
        </div>
      </JoinLayout>
    </>
  )
}
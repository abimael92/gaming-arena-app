import Link from 'next/link'
import { JoinLayout } from '@/layouts'
import { LoginForm } from '@/components/Auth'
import { Seo } from '@/components/Shared'
import styles from './sign-in.module.scss'
import { ArrowRight, Shield, Zap } from 'lucide-react'

export default function SignInPage() {
  return (
    <>
      <Seo title="Welcome Back - Sign In" />

      <JoinLayout>
        <div className={styles.signIn}>
          {/* Header Section */}
          <div className={styles.header}>
            <h1>Welcome Back!</h1>
            <p>Sign in to access your personalized gaming experience</p>
          </div>


          {/* Login Form */}
          <LoginForm />

          {/* Actions Section */}
          <div className={styles.actions}>
            <div className={styles.signUpPrompt}>
              <span>New to Gaming Arena?</span>
              <Link href="/join/sign-up" className={styles.link}>
                Create an account <ArrowRight size={16} />
              </Link>
            </div>

            <div className={styles.forgotPassword}>
              <Link href="/join/forgot-password" className={styles.secondaryLink}>
                Forgot your password?
              </Link>
            </div>


            {/* Benefits List */}
            <div className={styles.benefits}>
              <div className={styles.benefitItem}>
                <Zap className={styles.icon} />
                <span>Fast checkout & order tracking</span>
              </div>
              <div className={styles.benefitItem}>
                <Shield className={styles.icon} />
                <span>Secure payment & data protection</span>
              </div>
            </div>


          </div>
        </div>
      </JoinLayout>
    </>
  )
}
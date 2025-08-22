import Link from 'next/link'
import { JoinLayout } from '@/layouts'
import { ResetPasswordForm } from '@/components/Auth'
import { Seo } from '@/components/Shared'
import styles from './reset-password.module.scss'

export default function SignInPage() {
  return (
    <>
      <Seo title="ResetPassword" />

      <JoinLayout>
        <div className={styles.resetPassword}>
          <h3> Reset Password</h3>
          <ResetPasswordForm />


        </div>
      </JoinLayout>
    </>
  )
}

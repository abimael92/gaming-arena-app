import { Form, Message } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { Auth } from '@/api';
import { useState } from 'react';
import styles from './ResetPasswordForm.module.scss';

const authCtrl = new Auth();

export default function ResetPasswordForm() {
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: { email: '' },
    initialStatus: { error: null },
    onSubmit: async ({ email }) => {
      try {
        await authCtrl.forgotPassword(email);
        setSuccess(true);
        formik.setStatus({ error: null });
      } catch (error) {
        console.error(error);
        const errorMessage =
          error?.response?.data?.error?.message ||
          'Invalid password';

        formik.setSubmitting(false);
        formik.setStatus({ loginError: errorMessage });
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className={styles.resetPasswordForm}>
      {/* Global error message */}
      {formik.status?.error && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{formik.status.error}</p>
        </Message>
      )}

      {/* Success message */}
      {success && (
        <Message positive>
          <Message.Header>Success</Message.Header>
          <p>Reset email sent! Check your inbox.</p>
        </Message>
      )}

      <Form.Input
        name="email"
        type="email"
        placeholder="Your email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={
          formik.status?.error
            ? { content: formik.status.error, pointing: 'below' }
            : null
        }
      />

      <Form.Button
        type="submit"
        fluid
        primary
        loading={formik.isSubmitting}
        disabled={formik.isSubmitting}
      >
        Send Reset Link
      </Form.Button>
    </Form>
  );
}

import { Form, Button } from 'semantic-ui-react'; // Import Button separately
import { useFormik } from 'formik';
import { User } from '@/api';
import { useAuth } from '@/hooks';
import { initialValues, validationSchema } from './ChangePasswordForm.form';
import styles from './ChangePasswordForm.module.scss';

const userCtrl = new User();

export function ChangePasswordForm({ onCancel }) {
  const { user, logout } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userCtrl.updateMe(user.id, { password: formValue.password });
        logout();
      } catch (error) {
        throw error;
      }
    },
  });

  const handleCancel = () => {
    formik.handleReset();
    if (onCancel) onCancel();
  };

  return (
    <Form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.formHeader}>
        <h4>Change Password</h4>
      </div>

      <Form.Input
        type="password"
        name="password"
        placeholder="New password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <Form.Input
        type="password"
        name="repeatPassword"
        placeholder="Repeat password"
        value={formik.values.repeatPassword}
        onChange={formik.handleChange}
        error={formik.errors.repeatPassword}
      />


      <div className={styles.actionButtons}>
        <Form.Button type="submit" loading={formik.isSubmitting} primary>
          Update Password
        </Form.Button>
        <Button
          type="button"
          onClick={handleCancel}
          className={styles.cancelButton}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
}
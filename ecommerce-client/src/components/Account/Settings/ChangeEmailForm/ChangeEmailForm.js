import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { User } from '@/api';
import { useAuth } from '@/hooks';
import { initialValues, validationSchema } from './ChangeEmailForm.form';
import styles from './ChangeEmailForm.module.scss';

const userCtrl = new User();

export function ChangeEmailForm({ onCancel }) {
  const { user, updateUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userCtrl.updateMe(user.id, { email: formValue.email });
        updateUser('email', formValue.email);
        formik.handleReset();
        if (onCancel) onCancel();
      } catch (error) {
        console.error(error);
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
        <h4>Change E-mail address</h4>
      </div>

      <Form.Input
        name="email"
        placeholder="New E-mail address"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="repeatEmail"
        placeholder="Repeat E-mail address"
        value={formik.values.repeatEmail}
        onChange={formik.handleChange}
        error={formik.errors.repeatEmail}
      />

      <div className={styles.actionButtons}>
        <Form.Button type="submit" loading={formik.isSubmitting} primary>
          Update Email
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
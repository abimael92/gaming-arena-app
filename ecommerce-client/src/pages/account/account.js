import { useState } from 'react';
import { Tab, Button, Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { BasicLayout } from '@/layouts';
import { useAuth } from '@/hooks';
import {
  Info,
  Settings,
  Address,
  Wishlist,
  Game,
  User,
  Orders,
} from '@/components/Account';
import { Separator, Seo } from '@/components/Shared';
import 'semantic-ui-css/semantic.min.css';
import styles from './account.module.scss';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [reload, setReload] = useState(false);
  const [activeEdit, setActiveEdit] = useState(null);

  if (!user) {
    router.push('/');
    return null;
  }

  const onReload = () => setReload((prevState) => !prevState);
  const handleEditClick = (type) => setActiveEdit(type);
  const handleCancelEdit = () => setActiveEdit(null);


  const panes = [
    {
      menuItem: 'My Orders',
      render: () => (
        <Tab.Pane attached={false} style={{ fontSize: 'x-large' }}>
          <Orders />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Wishlist',
      render: () => (
        <Tab.Pane attached={false} style={{ fontSize: 'x-large' }}>
          <Wishlist />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Addresses',
      render: () => (
        <Tab.Pane attached={false} style={{ fontSize: 'x-large' }}>
          <Address.AddAddress onReload={onReload} />
          <Address.ListAddresses reload={reload} onReload={onReload} />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 20, icon: 'settings', content: 'Settings' },
      render: () => (
        <Tab.Pane attached={false} style={{ fontSize: 'x-large' }}>
          <Settings.ChangeNameForm />
          <Separator height={30} />
          <div className={styles.containerForms}>
            <div className={styles.settingsSection}>
              <h3>Email Settings</h3>
              {activeEdit === 'email' ? (
                <div>
                  <Settings.ChangeEmailForm onCancel={handleCancelEdit} />
                </div>
              ) : (
                <div className={styles.settingRow}>
                  <span>Current email: <strong>{user.email}</strong></span>
                  <Button
                    primary
                    onClick={() => handleEditClick('email')}
                  >
                    Change Email
                  </Button>
                </div>
              )}
            </div>
            <div className={styles.settingsSection}>
              <h3>Password Settings</h3>
              {activeEdit === 'password' ? (
                <div>
                  <Settings.ChangePasswordForm onCancel={handleCancelEdit} />
                </div>
              ) : (
                <div className={styles.settingRow}>
                  <span>Password: ********</span>
                  <Button
                    primary
                    onClick={() => handleEditClick('password')}
                  >
                    Change Password
                  </Button>
                </div>
              )}
            </div>
          </div>
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 21,
        icon: 'log out',
        content: '',
        onClick: logout,
      },
    },
  ];

  // Conditionally add tabs for admin
  if (user.admin) {
    panes.splice(3, 0, {
      menuItem: 'Games',
      render: () => (
        <Tab.Pane attached={false} style={{ fontSize: 'x-large' }}>
          <Game.AddGame onReload={onReload} />
          <Game.ListGames reload={reload} onReload={onReload} />
          <Separator height={80} />
        </Tab.Pane>
      ),
    });
    panes.splice(3, 0, {
      menuItem: 'Users',
      render: () => (
        <Tab.Pane attached={false} style={{ fontSize: 'x-large' }}>
          {/* Render user-related components */}
          <User.AddUser onReload={onReload} />
          {/* Example: <UsersComponent /> */}
          <User.ListUsers reload={reload} onReload={onReload} />
          <Separator height={80} />
        </Tab.Pane>
      ),
    });
  }

  return (
    <>
      <Seo title="My Account" />

      <BasicLayout isContainer relative>
        <Info />

        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes}
          className={styles.tabs}
        ></Tab>
      </BasicLayout>
    </>
  );
}

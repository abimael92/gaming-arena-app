import { Container } from "semantic-ui-react";
import classNames from "classnames";
import { TopBar, Footer } from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./BasicLayout.module.scss";

export function BasicLayout(props) {
  const {
    children,
    isOpenSearch = false,
    isContainer = false,
    relative = false,
    fullWidth = false,
    noFooter = false,
    noPadding = false,
    className = "",
    headerProps = {},
  } = props;

  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Add route-based classes for page-specific styling
  const routeClass = router.pathname.replace(/\//g, '-');

  return (
    <div className={classNames(
      styles.layoutWrapper,
      className,
      routeClass,
      {
        [styles.relative]: relative,
        [styles.mounted]: mounted
      }
    )}>
      <TopBar isOpenSearch={isOpenSearch} {...headerProps} />

      <main
        className={classNames(styles.mainContent, {
          [styles.noPadding]: noPadding,
          [styles.fullWidth]: fullWidth,
        })}
        role="main"
        aria-label="Main content"
      >
        {isContainer ? (
          <Container>
            <div className={styles.contentWrapper}>
              {children}
            </div>
          </Container>
        ) : fullWidth ? (
          <div className={styles.fullWidthContent}>
            {children}
          </div>
        ) : (
          <Container fluid>
            <div className={styles.contentWrapper}>
              {children}
            </div>
          </Container>
        )}
      </main>

      {!noFooter && <Footer />}

      {/* Portal for modals and notifications */}
      <div id="modal-root" />
      <div id="notification-root" />
    </div>
  );
}

// Additional layout variations
export function CenteredLayout(props) {
  return (
    <BasicLayout {...props}>
      <div className={styles.centeredContent}>
        {props.children}
      </div>
    </BasicLayout>
  );
}

export function SidebarLayout(props) {
  const { sidebar, children, sidebarLeft = true, ...layoutProps } = props;

  return (
    <BasicLayout {...layoutProps}>
      <div className={classNames(styles.sidebarLayout, {
        [styles.sidebarRight]: !sidebarLeft
      })}>
        <aside className={styles.sidebar} aria-label="Sidebar">
          {sidebar}
        </aside>
        <main className={styles.main} aria-label="Main content">
          {children}
        </main>
      </div>
    </BasicLayout>
  );
}
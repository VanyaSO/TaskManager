import { Header } from "antd/lib/layout/layout";
import styles from "./MainLayout.module.scss";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className={styles.root}>{children}</main>
    </>
  );
}

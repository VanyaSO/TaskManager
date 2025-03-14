import styles from "./Dashboard.module.scss";
import { MainLayout } from "../../widgets/MainLayout/MainLayout.tsx";

export function Dashboard() {
  return (
    <MainLayout>
      <div className={styles.root}>Dashboard</div>
    </MainLayout>
  );
}

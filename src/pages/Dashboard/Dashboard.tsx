import styles from "./Dashboard.module.scss";
import { MainLayout } from "../../widgets/MainLayout/MainLayout.tsx";
import { SearchBar } from "../../components/SearchBar/SearchBar.tsx";

export function Dashboard() {
  return (
    <MainLayout>
      <div className={styles.root}>Dashboard</div>
      <SearchBar />
    </MainLayout>
  );
}

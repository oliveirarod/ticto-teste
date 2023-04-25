import styles from '@/styles/dashboard.module.scss';
import Cards from "./Cards";
import Table from "./Table";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Cards />
      <Table />
    </div>
  );
};

export default Dashboard;

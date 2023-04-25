import Cards from "@/components/Dashboard/Cards";
import Table from "@/components/Dashboard/Table";

import styles from '@/styles/dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Cards />
      <Table />
    </div>
  );
};

export default Dashboard;

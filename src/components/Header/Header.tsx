import Image from "next/image";

import styles from "@/styles/header.module.scss";
import logo from "../../../public/logo.svg";

interface HeaderProps {
  openNewTransactionModal: () => void;
}

const Header = ({ openNewTransactionModal }: HeaderProps) => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={logo} alt="Ticto logo" />

        <div>
          <button className={styles.button1} type="button" onClick={openNewTransactionModal}>
            NOVA TRANSAÇÃO
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

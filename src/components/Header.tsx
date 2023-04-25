import logo from "@/assets/logo.svg";
import styles from "@/styles/header.module.scss";

interface HeaderProps {
  openNewTransactionModal: () => void;
}

const Header = ({ openNewTransactionModal }: HeaderProps) => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src={logo.src} alt="Ticto logo" />

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

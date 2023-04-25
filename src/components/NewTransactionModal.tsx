import { FormEvent, useState } from "react";

// Libraries
import { NumericFormat } from "react-number-format";
import Modal from "react-modal";

// Styles
import incomeImg from "@/assets/icon-income.svg";
import outcomeImg from "@/assets/icon-outcome.svg";
import closeImg from "@/assets/icon-close.svg";
import styles from "@/styles/new-transaction-modal.module.scss";

// Hooks
import { useTransactions } from "../hooks/useTransactions";

Modal.setAppElement("body");

interface ModalProps {
  isNewTransactionModalOpen: boolean;
  closeNewTransactionModal: () => void;
}

const NewTransactionModal = ({
  isNewTransactionModalOpen,
  closeNewTransactionModal,
}: ModalProps) => {
  const { createTransaction } = useTransactions();
  const [type, setType] = useState("deposit");

  const [formValues, setFormValues] = useState({
    name: "",
    amount: 0,
    category: "",
  });

  const clearInputs = () => {
    setFormValues({
      name: "",
      amount: 0,
      category: "",
    });

    setType("deposit");
  };

  const handleCloseModal = () => {
    closeNewTransactionModal();
    clearInputs();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createNewTransaction = async (e: FormEvent) => {
    e.preventDefault();

    await createTransaction({ ...formValues, type });

    handleCloseModal();
  };

  return (
    <Modal
      isOpen={isNewTransactionModalOpen}
      onRequestClose={handleCloseModal}
      overlayClassName={styles.reactModalOverlay}
      className={styles.reactModalContent}
    >
      <button
        type="button"
        onClick={handleCloseModal}
        className={styles.reactModalClose}
      >
        <img src={closeImg.src} alt="Fechar Modal" />
      </button>

      <form className={styles.transactionForm} onSubmit={createNewTransaction}>
        <h2 className={styles.h2}>Cadastar Transação</h2>

        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formValues.name}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <NumericFormat
          onValueChange={(values) => {
            setFormValues((prev) => ({
              ...prev,
              amount: values.floatValue || 0,
            }));
          }}
          placeholder="Preço"
          decimalSeparator=","
          thousandSeparator="."
          prefix="R$ "
          allowNegative={false}
          decimalScale={2}
          fixedDecimalScale={false}
          inputMode="numeric"
          className={styles.input}
          required
        />

        <div className={styles.transactionType}>
          <button
            type="button"
            name="deposit"
            onClick={() => setType("deposit")}
            className={
              type === "deposit" ? styles.greenRadioBox : styles.radioBox
            }
          >
            <img className={styles.img} src={incomeImg.src} alt="Entrada" />
            <span className={styles.span}>Entrada</span>
          </button>

          <button
            type="button"
            name="withdraw"
            onClick={() => setType("withdraw")}
            className={
              type === "withdraw" ? styles.redRadioBox : styles.radioBox
            }
          >
            <img className={styles.img} src={outcomeImg.src} alt="Saida" />
            <span className={styles.span}>Saída</span>
          </button>
        </div>

        <input
          type="text"
          name="category"
          placeholder="Categoria"
          value={formValues.category}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <button className={styles.button} type="submit">
          CADASTRAR
        </button>
      </form>
    </Modal>
  );
};

export default NewTransactionModal;

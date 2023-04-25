import { FormEvent, useState } from "react";
import Image from "next/image";

import { NumericFormat } from "react-number-format";
import Modal from "react-modal";

import incomeImg from "../../../public/icons/icon-income.svg";
import outcomeImg from "../../../public/icons/icon-outcome.svg";
import closeImg from "../../../public/icons/icon-close.svg";
import styles from "@/styles/new-transaction-modal.module.scss";

import { useTransactions } from "@/hooks/useTransactions";

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
        <Image src={closeImg} alt="Fechar Modal" />
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
            aria-label="Entrada"
            onClick={() => setType("deposit")}
            className={
              type === "deposit" ? styles.greenRadioBox : styles.radioBox
            }
          >
            <Image className={styles.img} src={incomeImg} alt="Entrada" />
            <span className={styles.span}>Entrada</span>
          </button>

          <button
            type="button"
            name="withdraw"
            aria-label="Saída"
            onClick={() => setType("withdraw")}
            className={
              type === "withdraw" ? styles.redRadioBox : styles.radioBox
            }
          >
            <Image className={styles.img} src={outcomeImg} alt="Saida" />
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

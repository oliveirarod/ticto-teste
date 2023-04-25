import { useEffect, useState } from "react";
import Image from "next/image";

import { useTransactions } from "@/hooks/useTransactions";
import { Transaction } from "@/interfaces/Transaction";

import depositIcon from "../../../public/icons/icon-deposit.svg";
import withdrawIcon from "../../../public/icons/icon-withdraw.svg";
import styles from "@/styles/cards.module.scss";

interface Card {
  title: string;
  img: string;
  value: number;
}

interface CardValues {
  deposits: number;
  withdraws: number;
  total: number;
}

const Card = ({ title, img, value }: Card) => {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));

  return (
    <div key={title} className={styles.card}>
      <div className={styles.cardHeader}>
        <span>{title}</span>

        {img && <Image src={img} alt={`Ícone de ${title}`} />}
      </div>

      <div className={styles.cardValue}>
        <span>{formattedValue}</span>
      </div>
    </div>
  );
};

const Cards = () => {
  const [cardsValue, setCardsValue] = useState<Card[]>([
    { title: "Entradas", img: depositIcon, value: 0 },
    { title: "Saídas", img: withdrawIcon, value: 0 },
    { title: "Saldo Total", img: "", value: 0 },
  ]);

  const { transactions } = useTransactions();

  const calculateCardValues = () => {
    return transactions.reduce(
      (acc: CardValues, transaction: Transaction) => {
        if (transaction.type === "deposit") {
          const { deposits, total } = acc;

          return {
            deposits: deposits + transaction.amount,
            withdraws: acc.withdraws,
            total: total + transaction.amount,
          };
        } else {
          const { withdraws, total } = acc;

          return {
            deposits: acc.deposits,
            withdraws: withdraws + transaction.amount,
            total: total - transaction.amount,
          };
        }
      },
      { deposits: 0, withdraws: 0, total: 0 }
    );
  };

  const updateCardsValue = (updatedCard: Card, newValue: number) => {
    setCardsValue((prevCardsValue) =>
      prevCardsValue.map((card) =>
        card.title === updatedCard.title ? { ...card, value: newValue } : card
      )
    );
  };

  useEffect(() => {
    const values = calculateCardValues();

    updateCardsValue(cardsValue[0], values.deposits);
    updateCardsValue(cardsValue[1], values.withdraws);
    updateCardsValue(cardsValue[2], values.total);
  }, [transactions]);

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cards}>
        {cardsValue.map((card: Card) => Card(card))}
      </div>
    </div>
  );
};

export default Cards;

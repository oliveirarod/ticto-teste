
import { useEffect, useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { Transaction } from "@/interfaces/Transaction";

import depositIcon from "@/assets/icon-deposit.svg";
import withdrawIcon from "@/assets/icon-withdraw.svg";
import styles from '@/styles/cards.module.scss';

interface Card {
  title: string;
  img: string;
  value: number;
}

interface CardsType {
  deposits: number;
  withdraws: number;
  total: number;
}

const Cards = () => {
  const [cardsValue, setCardsValue] = useState<Card[]>([
    {
      title: "Entradas",
      img: depositIcon.src,
      value: 0,
    },
    {
      title: "Saídas",
      img: withdrawIcon.src,
      value: 0,
    },
    {
      title: "Saldo Total",
      img: "",
      value: 0,
    },
  ]);

  const { transactions } = useTransactions();

  const handleTransactions = () => {
    return transactions.reduce(
      (acc: CardsType, transaction: Transaction) => {
        if (transaction.type === "deposit") {
          acc.deposits += transaction.amount;
          acc.total += transaction.amount;
        } else {
          acc.withdraws += transaction.amount;
          acc.total -= transaction.amount;
        }

        return acc;
      },
      { deposits: 0, withdraws: 0, total: 0 }
    );
  };

  const updateCardsValue = (handledCard: Card, newValue: number) => {
    setCardsValue((prevCardsValue) =>
      prevCardsValue.map((card) => {
        return card.title === handledCard.title
          ? { ...card, value: newValue }
          : card;
      })
    );
  };

  useEffect(() => {
    const values = handleTransactions();

    updateCardsValue(cardsValue[0], values.deposits);
    updateCardsValue(cardsValue[1], values.withdraws);
    updateCardsValue(cardsValue[2], values.total);
  }, [transactions]);

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cards}>
        {cardsValue.map((card: Card, index: number) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardHeader}>
              <span>{card.title}</span>

              {card.img && <img src={card.img} alt={"Ícone de " + card.title} />}
            </div>

            <div className={styles.cardValue}>
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(card.value))}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;

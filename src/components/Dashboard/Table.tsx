import Image from "next/image";

import styles from "@/styles/table.module.scss";
import deleteIcon from "../../../public/icons/icon-delete.svg";

import { useTransactions } from "@/hooks/useTransactions";

const Table = () => {
  const dateOptions: any = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const tableHeaders = ["Descrição", "Valor", "Categoria", "Data"];

  const { transactions, deleteTransaction } = useTransactions();

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index} className={styles.th}>
                {header}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>

        <tbody>
          {!transactions.length && (
            <tr className={styles.transactionsNotFound}>
              <td colSpan={tableHeaders.length + 1} className={styles.td}>
                Nenhum dado encontrado...
              </td>
            </tr>
          )}
          {transactions.map(
            ({ id, name, type, amount, category, createdAt }) => (
              <tr key={id} className={styles.tableTr}>
                <td className={styles.td}>{name}</td>

                <td className={`${styles.td}  ${styles[type]}`}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(amount))}
                </td>

                <td className={styles.td}>{category}</td>

                <td className={styles.td}>
                  {new Intl.DateTimeFormat("pt-BR", dateOptions)
                    .format(new Date(createdAt))
                    .replace(",", " às")
                    .replace(":", "h")}
                </td>

                <td className={styles.td}>
                  <Image
                    src={deleteIcon}
                    alt="Ícone de lixeira"
                    className={styles.deleteIcon}
                    onClick={() => deleteTransaction(id)}
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

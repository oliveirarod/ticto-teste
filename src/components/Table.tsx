// Styles
import styles from '@/styles/table.module.scss';
import deleteIcon from "@/assets/icon-delete.svg";

// Hooks
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
              <th key={index} className={styles.th}>{header}</th>
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
          {transactions.map((transaction) => (
            <tr key={transaction.id} className={styles.tableTr}>
              <td className={styles.td}>{transaction.name}</td>

              <td className={`${styles.td}  ${styles[transaction.type]}`}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(transaction.amount))}
              </td>

              <td className={styles.td}>{transaction.category}</td>

              <td className={styles.td}>
                {new Intl.DateTimeFormat("pt-BR", dateOptions)
                  .format(new Date(transaction.createdAt))
                  .replace(",", " às")
                  .replace(":", "h")}
              </td>

              <td className={styles.td}>
                <img
                  src={deleteIcon.src}
                  alt="Ícone de lixeira"
                  className={styles.deleteIcon}
                  onClick={() => deleteTransaction(transaction.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

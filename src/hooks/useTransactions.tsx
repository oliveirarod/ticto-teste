import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";

import { Transaction } from "@/interfaces/Transaction";
import TransactionService from "@/models/Transaction";

type newTransaction = Omit<Transaction, "id" | "createdAt">;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: newTransaction) => Promise<void>;
  deleteTransaction: (transactionId: string) => void;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const transactionService = new TransactionService();

  useEffect(() => {
    transactionService.get("/transactions").then((res) => setTransactions(res));
  }, []);

  const createTransaction = async (newTransaction: newTransaction) => {
    try {
      const res: Transaction = await transactionService.post("/transactions", {
        ...newTransaction,
        createdAt: new Date(),
      });

      setTransactions([...transactions, res]);
    } catch (error) {
      console.error("Erro ao criar transação: ", error);
    }
  };

  const deleteTransaction = async (transactionId: string) => {
    try {
      await transactionService.delete("/transactions", transactionId);
      const remainingTransactions = transactions.filter(
        (item) => item.id !== transactionId
      );

      setTransactions(remainingTransactions);
    } catch (error: any) {
      console.error("Erro ao deletar transação: ", error);
    }
  };

  return (
    <TransactionsContext.Provider
      value={{ transactions, createTransaction, deleteTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}

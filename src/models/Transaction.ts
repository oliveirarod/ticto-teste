import { Transaction } from "./../interfaces/Transaction";
import { v4 as uuidv4 } from "uuid";

const transactions = [
	{
		id: "1",
		name: "Curso de NextJS",
		amount: 899,
		type: "withdraw",
		category: "Educação",
		createdAt: new Date("2022-02-12 13:24:00"),
	},
	{
		id: "2",
		name: "Salário",
		amount: 7350,
		type: "deposit",
		category: "Receita Fixa",
		createdAt: new Date("2022-02-12 13:24:00"),
	},
];

class TransactionService {
  // Simulates a get request
  get = (url: string): Promise<Transaction[]> => {
    return new Promise<Transaction[]>((res, rej) => {
      res(transactions);
    });
  };

  // Simulates a post request
  post = (url: string, newData: Omit<Transaction, "id">) => {
    return new Promise<Transaction>((res) => {
      res({ ...newData, id: uuidv4() });
    });
  };

  // Simulates a delete request
  delete = (url: string, transactionId: any) => {
    return new Promise((res) => {
      res({ status: 200 });
    });
  };
}

export default TransactionService;

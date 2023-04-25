import { NextApiHandler } from "next";
import TransactionService from "@/models/Transaction";

const transactionService = new TransactionService();

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case "GET": {
      try {
        const transactions = await transactionService.get("");
        res.status(200).json(transactions);
      } catch (error) {
        res.status(500).json({ error: "Error fetching transactions" });
      }
      break;
    }
    case "POST": {
      try {
        const newTransaction = await transactionService.post("", body);
        res.status(201).json(newTransaction);
      } catch (error) {
        res.status(500).json({ error: "Error creating transaction" });
      }
      break;
    }
    case "DELETE": {
      try {
        await transactionService.delete("", id);
        res.status(200).json({ message: "Transaction deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: "Error deleting transaction" });
      }
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;

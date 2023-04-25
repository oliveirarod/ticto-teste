export interface Transaction {
  id: string;
  name: string;
  amount: number;
  type: string;
  category: string;
  createdAt: Date;
}

export interface AdminOrder {
  id: string,
  customer: string,
  amount: number;
  status:  | 'Delivered' | 'Pending' | 'Shipped';
  date: string;
}
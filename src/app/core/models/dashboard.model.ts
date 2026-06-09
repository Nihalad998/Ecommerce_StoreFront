export interface DashboardStats {
  revenue: number;
  orders: number;
  customers: number;
  products: number;
}

export interface RevenuePoint {
  month: string;
  revenue: number;
}

export interface InventoryAlert {
  id: number;
  productName: string;
  stock: number;
}
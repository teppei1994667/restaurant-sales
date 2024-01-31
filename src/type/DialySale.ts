//サーバーから取得したDialySaleデータの型
export type GetFromSeverDialySale = {
  id: number;
  sales_day: string;
  lunch_sales: number;
  dinner_sales: number;
  lunch_visitor: number;
  dinner_visitor: number;
  personnel_cost: number;
  purchase: number;
  total_sale: number;
  total_visitor: number;
};

//DialySaleを画面表示する為の型
export type DisplayDialySale = {
  id: number;
  salesDay: string;
  lunchSales: number;
  dinnerSales: number;
  lunchVisitor: number;
  dinnerVisitor: number;
  personnelCost: number;
  purchase: number;
  totalSale: number;
  totalVisitor: number;
};

//ReactHookFormでDialySaleを管理する為の型
export type FormDialySale = {
  salesDay: Date | null;
  lunchSale?: number;
  dinnerSale?: number;
  lunchVisitor?: number;
  dinnerVisitor?: number;
  personnelCost?: number;
  purchase?: number;
};

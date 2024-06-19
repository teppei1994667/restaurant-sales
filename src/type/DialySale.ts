// DialySaleの型
export type DialySale = {
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

// ReactHookFormでDialySaleを管理する為の型
export type FormDialySale = {
  salesDay: Date | null;
  lunchSale?: string;
  dinnerSale?: string;
  lunchVisitor?: string;
  dinnerVisitor?: string;
  personnelCost?: string;
  purchase?: string;
};

// SearchDialySalesをformで管理する為の型
export type SearchDialySalesType = {
  startDay: Date | null;
  endDay: Date | null;
};

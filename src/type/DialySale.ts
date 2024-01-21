export type DialySaleType = {
  id: number;
  day: string;
  lunch_sales: number;
  dinner_sales: number;
  lunch_visitor: number;
  dinner_visitor: number;
  personnel_cost: number;
  purchase: number;
  total_sale: number;
  total_visitor: number;
  total_personnel_cost: number;
};

export type ReturnDialySalesType = {
  dialySales: DialySaleType[];
};

export type DialySaleFormType = {
  day: Date | null;
  lunchSale: string;
  dinnerSale: string;
  lunchVisitor: string;
  dinnerVisitor: string;
  personnelCost: string;
  purchase: string;
};

export type DialySaleEditFormType = {
  day?: Date | null;
  lunchSale?: number;
  dinnerSale?: number;
  lunchVisitor?: number;
  dinnerVisitor?: number;
  personnelCost?: number;
  purchase?: number;
};

export type DialySaleAction = {
  type: "returnData";
  payload: {
    id: number;
    day: string;
    lunch_sales: number;
    dinner_sales: number;
    lunch_visitor: number;
    dinner_visitor: number;
    personnel_cost: number;
    purchase: number;
    total_sale: number;
    total_visitor: number;
  }[];
};

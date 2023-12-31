export type DialySaleType = {
  day: string;
  lunch_sales: number;
  dinner_sales: number;
  lunch_visitor: number;
  dinner_visitor: number;
  lunch_personnel_cost: number;
  dinner_personnel_cost: number;
  purchase: number;
  total_sale: number;
  total_visitor: number;
  total_personal_cost: number;
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
  lunchPersonnelCost: string;
  dinnerPersonnelCost: string;
  purchase: string;
};

export type DialySaleAction = {
  type: "returnData";
  payload: {
    day: string;
    lunch_sales: number;
    dinner_sales: number;
    lunch_visitor: number;
    dinner_visitor: number;
    lunch_personnel_cost: number;
    dinner_personnel_cost: number;
    purchase: number;
    total_sale: number;
    total_visitor: number;
    total_personal_cost: number;
  }[];
};

export type fetchData = {
  dialy_sales: DialySaleType[];
  total_sale: number[];
};

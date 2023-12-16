export type DialySaleType = {
  day: string;
  lunch_sales: number;
  dinner_sales: number;
  lunch_visitor: number;
  dinner_visitor: number;
  lunch_personnel_cost: number;
  dinner_personnel_cost: number;
  purchase: number;
};

export type ReturnDialySalesType = {
  dialySales: DialySaleType[];
};

export type DialySaleFormType = {
  day: Date | null;
  lunchSale: string;
  dinnerSale: string;
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
  }[];
};

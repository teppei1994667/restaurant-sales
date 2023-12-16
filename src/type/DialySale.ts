export type DialySaleType = {
  day: string;
  lunch_sales: number;
  dinner_sales: number;
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
  }[];
};

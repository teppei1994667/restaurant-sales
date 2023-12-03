export type DialySaleType = {
  day: Date;
  lunch_sales: string;
  dinner_sales: string;
};

export type DialySaleFormType = {
  day: Date | null;
  lunchSale: string;
  dinnerSale: string;
};

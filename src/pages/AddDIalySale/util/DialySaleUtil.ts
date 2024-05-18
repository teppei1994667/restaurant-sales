import { DialySale } from "@/type/DialySale";
import { useCallback } from "react";
import { TotalDialySaleModel } from "../type/model/TotalDialySaleModel";

// DialySalesの格合計値を計算
export const calculateTotalDialySales = (data: DialySale[]) => {
  const totalDailySale: TotalDialySaleModel = {
    totalLunchSale: 0,
    totalDinnerSale: 0,
    totalSale: 0,
    totalLunchVisitor: 0,
    totalDinnerVisitor: 0,
    totalVisitor: 0,
    totalPersonnelCost: 0,
    totalPurchase: 0,
  };

  data.map((datum) => {
    totalDailySale.totalLunchSale += datum.lunchSales;
    totalDailySale.totalDinnerSale += datum.dinnerSales;
    totalDailySale.totalSale += datum.totalSale;
    totalDailySale.totalLunchVisitor += datum.lunchVisitor;
    totalDailySale.totalDinnerVisitor += datum.dinnerVisitor;
    totalDailySale.totalVisitor += datum.totalVisitor;
    totalDailySale.totalPersonnelCost += datum.personnelCost;
    totalDailySale.totalPurchase += datum.purchase;
  });

  return totalDailySale;
};

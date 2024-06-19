import { DialySale } from "@/type/DialySale";
import { useCallback } from "react";
import { TotalDialySaleModel } from "../type/model/TotalDialySaleModel";

// DialySalesの格合計値を計算
export const calculateTotalDialySales = (data: DialySale[]) => {
  const totalDialySale: TotalDialySaleModel = {
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
    totalDialySale.totalLunchSale += datum.lunchSales;
    totalDialySale.totalDinnerSale += datum.dinnerSales;
    totalDialySale.totalSale += datum.totalSale;
    totalDialySale.totalLunchVisitor += datum.lunchVisitor;
    totalDialySale.totalDinnerVisitor += datum.dinnerVisitor;
    totalDialySale.totalVisitor += datum.totalVisitor;
    totalDialySale.totalPersonnelCost += datum.personnelCost;
    totalDialySale.totalPurchase += datum.purchase;
  });

  return totalDialySale;
};

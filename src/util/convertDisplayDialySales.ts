import { DialySale } from "@/type/DialySale";
import dayjs from "dayjs";

//サーバーから取得したISO8601規格のsalesDayをDialySalesでの表示形式に変換して返却する
const salesDayFormatToDisplay = (_salesDay: string): string => {
  const salesDayToDate = dayjs(_salesDay);
  return salesDayToDate.format("YYYY/MM/DD(ddd)");
};

//サーバーから取得した値を画面表示形式に変換する
export const convertDisplayDialySales = (fetchData: DialySale[]): DialySale[] => {
  const DialySales = fetchData.map((data) => {
    const convertFetchData: DialySale = {} as DialySale;
    convertFetchData.id = data.id;
    convertFetchData.salesDay = salesDayFormatToDisplay(data.salesDay);
    convertFetchData.lunchSales = data.lunchSales;
    convertFetchData.dinnerSales = data.dinnerSales;
    convertFetchData.lunchVisitor = data.lunchVisitor;
    convertFetchData.dinnerVisitor = data.dinnerVisitor;
    convertFetchData.personnelCost = data.personnelCost;
    convertFetchData.purchase = data.purchase;
    convertFetchData.totalSale = data.lunchSales + data.dinnerSales;
    convertFetchData.totalVisitor = data.lunchVisitor + data.dinnerVisitor;
    return convertFetchData;
  });
  return DialySales;
};

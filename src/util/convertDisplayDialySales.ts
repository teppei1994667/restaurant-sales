import { DisplayDialySale, GetFromSeverDialySale } from "@/type/DialySale";
import dayjs from "dayjs";

//サーバーから取得したISO8601規格のsalesDayをDialySalesでの表示形式に変換して返却する
const salesDayFormatToDisplay = (_salesDay: string): string => {
  const salesDayToDate = dayjs(_salesDay);
  return salesDayToDate.format("YYYY/MM/DD(ddd)");
};

//サーバーから取得した値を画面表示形式に変換する
export const convertDisplayDialySales = (fetchData: GetFromSeverDialySale[]): DisplayDialySale[] => {
  const displayDialySales = fetchData.map((data) => {
    const convertFetchData: DisplayDialySale = {} as DisplayDialySale;
    convertFetchData.id = data.id;
    convertFetchData.salesDay = salesDayFormatToDisplay(data.sales_day);
    convertFetchData.lunchSales = data.lunch_sales;
    convertFetchData.dinnerSales = data.dinner_sales;
    convertFetchData.lunchVisitor = data.lunch_visitor;
    convertFetchData.dinnerVisitor = data.dinner_visitor;
    convertFetchData.personnelCost = data.personnel_cost;
    convertFetchData.purchase = data.purchase;
    convertFetchData.totalSale = data.lunch_sales + data.dinner_sales;
    convertFetchData.totalVisitor = data.lunch_visitor + data.dinner_visitor;
    return convertFetchData;
  });
  return displayDialySales;
};

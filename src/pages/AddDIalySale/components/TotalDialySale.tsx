import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useContext } from "react";
import { DialySalesStateContext } from "../context/DialySalesContextProvider";

export const TotalDialySale = () => {
  const { state } = useContext(DialySalesStateContext);
  let totalLunchSale = 0;
  let totalDinnerSale = 0;
  let totalLunchVisitor = 0;
  let totalDinnerVisitor = 0;
  let totalPersonnelCost = 0;
  let totalPurchase = 0;
  state.DialySaleModels.map((dialySaleModel) => {
    totalLunchSale += dialySaleModel.lunchSales;
    totalDinnerSale += dialySaleModel.dinnerSales;
    totalLunchVisitor += dialySaleModel.lunchVisitor;
    totalDinnerVisitor += dialySaleModel.dinnerVisitor;
    totalPersonnelCost += dialySaleModel.personnelCost;
    totalPurchase += dialySaleModel.purchase;
  });

  const createData = (name: string, lunch: string | number, dinner: string | number, total: number) => {
    return { name, lunch, dinner, total };
  };

  const totalData = [
    createData("合計売上額", totalLunchSale, totalDinnerSale, totalLunchSale + totalDinnerSale),
    createData("合計来客数", totalLunchVisitor, totalDinnerVisitor, totalLunchVisitor + totalDinnerVisitor),
    createData("合計人件費", "-", "-", totalPersonnelCost),
    createData("合計仕入れ額", "-", "-", totalPurchase),
  ];

  return (
    <>
      <Paper elevation={0} className="mb-10">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell className="text-gray-500">lunch</TableCell>
                <TableCell className="text-gray-500">dinner</TableCell>
                <TableCell className="text-gray-500">total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totalData.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="text-gray-500">{item.name}</TableCell>
                  <TableCell className="text-gray-500">{item.lunch}</TableCell>
                  <TableCell className="text-gray-500">{item.dinner}</TableCell>
                  <TableCell className="text-gray-500">{item.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

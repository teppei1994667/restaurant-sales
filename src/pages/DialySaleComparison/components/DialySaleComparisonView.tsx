import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { DialySaleComparisonContext } from "../context/DIalySaleConparisonContextProvider";

export const DialySaleComparisonView = () => {
  const dialySaleComparisonContext = useContext(DialySaleComparisonContext);

  const testData = {
    day: "2023/01",
    lunchSale: 111111,
    dinnerSale: 1111111,
    totalSale: 11111111,
  };

  console.log("dialySaleComparisonContext", dialySaleComparisonContext);
  return (
    <>
      <Paper elevation={0} className="mt-10">
        <Grid container className="justify-center">
          <Grid item>
            <Typography className="text-gray-500" variant="h5">
              売り上げデータの比較
            </Typography>
          </Grid>
        </Grid>
        <TableContainer component={Paper} sx={{ width: "1599px", margin: "auto" }}>
          <Table sx={{ minWidth: "1500px" }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>ランチ売り上げ</TableCell>
                <TableCell>ディナー売り上げ</TableCell>
                <TableCell>売り上げ合計</TableCell>
                <TableCell>FLコスト</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>今年</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>去年</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>前年対比</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

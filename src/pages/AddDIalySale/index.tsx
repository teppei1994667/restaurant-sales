import { CreateDialySaleForm } from "@/components/CreateDialySaleForm";
import { DialySales } from "@/components/DialySales";
import { DialySalesContextProvider } from "@/components/DialySalesContext";
import { SelectDialySalesContextProvider } from "@/components/SelectDialySalesContext";
import { TotalDialySale } from "@/components/TotalDialySale";
import { DeleteButton } from "@/components/share/custom/DeleteButton";
import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CirclesWithBar } from "react-loader-spinner";

export const AddDialySale = () => {
  const [isLoading, setIsLoading] = useState(true);

  //レンダリング当日の年と月を文字列で取得
  const thisMonthStiring = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <DialySalesContextProvider>
        <SelectDialySalesContextProvider>
          <Paper elevation={0} className="pt-5">
            <Grid container className="justify-center">
              <Grid item>
                <Typography className="text-gray-700 font-mono" variant="h3">
                  売り上げ登録
                </Typography>
              </Grid>
            </Grid>
            <Grid container className="justify-center mt-9">
              <Grid item>
                <CreateDialySaleForm />
              </Grid>
            </Grid>
            {isLoading ? (
              <Grid container className="justify-center mt-9">
                <Grid item>
                  <CirclesWithBar
                    height="80"
                    width="80"
                    color="gray"
                    ariaLabel="three-dots-loading"
                    wrapperClass="mt-20"
                  />
                </Grid>
              </Grid>
            ) : (
              <>
                <Grid container className="justify-center mt-9">
                  <Grid item>
                    <DialySales dayParams={thisMonthStiring} />
                  </Grid>
                </Grid>
                <Grid container className="justify-center mt-9">
                  <Grid item>
                    <DeleteButton />
                  </Grid>
                </Grid>
                <Grid container className="justify-center mt-9">
                  <Grid item>
                    <TotalDialySale />
                  </Grid>
                </Grid>
              </>
            )}
          </Paper>
        </SelectDialySalesContextProvider>
      </DialySalesContextProvider>
    </>
  );
};

export default AddDialySale;

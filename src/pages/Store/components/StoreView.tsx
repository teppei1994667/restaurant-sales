import { Button, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContextProvider";
import Link from "next/link";

export const StoreView = () => {
  const storeContext = useContext(StoreContext);
  console.log("StoreView storeContext", storeContext);
  return (
    <>
      <Grid container className="justify-center mt-10">
        <Grid item>
          <Typography className="text-gray-500" variant="h4">
            {storeContext.StoreModel?.name}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="justify-center">
        <Grid item>
          <Link href={{ pathname: "AddDialySale", query: { id: storeContext.StoreModel?.id } }}>
            <Button className="text-gray-500 mt-10" variant="text" sx={{ height: "70px", width: "200px" }}>
              売り上げ登録
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

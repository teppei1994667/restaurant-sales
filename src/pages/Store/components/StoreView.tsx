import { Button, Grid, Link, Typography } from "@mui/material";

export const StoreView = () => {
  return (
    <>
      <Grid container className="justify-center mt-10">
        <Grid item>
          <Typography className="text-gray-500" variant="h4">
            店舗名
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="justify-center">
        <Grid item>
          <Link href="/AddDialySale">
            <Button className="text-gray-500 mt-10" variant="text" sx={{ height: "70px", width: "200px" }}>
              売り上げ登録
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

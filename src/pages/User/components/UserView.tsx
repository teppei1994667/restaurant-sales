import { Button, Grid, Link, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";

export const UserView = () => {
  const userContext = useContext(UserContext);
  return (
    <>
      <Grid container className="justify-center mt-10">
        <Grid item>
          <Typography className="text-gray-500" variant="h4">
            {userContext.LoginUserModel?.name}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="justify-center mt-10">
        <Grid item>
          <Typography className="text-gray-500" variant="h6">
            管理店舗一覧
          </Typography>
        </Grid>
      </Grid>
      {userContext.storeNames.map((storeName, index) => (
        <Grid container className="justify-center mt-5" key={index}>
          <Grid item>
            <Link href="/AddDialySale">
              <Button className="text-gray-500" variant="text" sx={{ height: "70px", width: "200px" }}>
                {storeName}
              </Button>
            </Link>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

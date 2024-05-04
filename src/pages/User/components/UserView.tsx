import { Button, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import Link from "next/link";

export const UserView = () => {
  const userContext = useContext(UserContext);
  return (
    <>
      <Grid container className="justify-center mt-10">
        <Grid item>
          <Typography className="text-gray-500" variant="h4">
            {userContext.UserModel?.name}
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
      {userContext.StoreModels.map((storeModel, index) => (
        <Grid container className="justify-center mt-5" key={index}>
          <Grid item>
            <Link href={{ pathname: "Store", query: { id: storeModel.id } }}>
              <Button className="text-gray-500" variant="text" sx={{ height: "70px", width: "200px" }}>
                {storeModel.name}
              </Button>
            </Link>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

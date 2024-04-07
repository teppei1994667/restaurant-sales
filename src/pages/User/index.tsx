import { Header } from "@/components/Header";
import { noPossibleAuthServerSideProps } from "@/util/authRedirect";
import { Button, Grid, Link, Typography } from "@mui/material";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = noPossibleAuthServerSideProps("users");

export const User = (props: GetServerSideProps) => {
  console.log("User props", props);
  const { name } = props;

  return (
    <>
      <Header loginStatus={true} />
      <Grid container className="justify-center mt-10">
        <Grid item>
          <Typography className="text-gray-500" variant="h4">
            {name}
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
      <Grid container className="justify-center mt-16">
        <Grid item>
          <Link href="/AddDialySale">
            <Button className="text-gray-500" variant="text" sx={{ height: "70px", width: "200px" }}>
              なお家
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default User;

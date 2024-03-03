import { Grid, Paper, Typography } from "@mui/material";

export const SignIn = () => {
  return (
    <Paper elevation={0} sx={{ height: "100vh" }}>
      <Grid container className="justify-center mt-10">
        <Grid item>
          <Typography variant="h4">ログインページです</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SignIn;

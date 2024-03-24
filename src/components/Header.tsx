import { AppBar, IconButton, Link, Toolbar, Typography, makeStyles } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Cookies from "js-cookie";
import { SignOutButton } from "./SignOutButton";

export type HeaderProps = {
  loginStatus?: boolean;
};

export const Header = (props: HeaderProps) => {
  const { loginStatus } = props;
  console.log("Header Cookies._access-token", Cookies.get("_access-token"));
  console.log("Header Cookies._client", Cookies.get("_client"));
  console.log("Header Cookies._uid", Cookies.get("_uid"));
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
          <Link className="text-inherit ml-10" href="/" sx={{ flexGrow: "1" }}>
            <Typography variant="h6">Dialy Sales</Typography>
          </Link>
          <SignOutButton visibility={loginStatus ? "visible" : "hidden"} />
        </Toolbar>
      </AppBar>
    </>
  );
};

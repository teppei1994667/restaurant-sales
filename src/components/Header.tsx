import { AppBar, Button, IconButton, Link, Theme, Toolbar, Typography, makeStyles } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export const Header = () => {
  const { isLoading, isSignedIn, setIsSignedIn } = useContext(AuthContext);

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は何も表示しない
    if (!isLoading && isSignedIn) {
      return <Button color="inherit">Sign out</Button>;
    }
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Typography variant="h6">Sample</Typography>
          </Link>
          <AuthButtons />
        </Toolbar>
      </AppBar>
    </>
  );
};

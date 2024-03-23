import { AppBar, Button, IconButton, Link, Theme, Toolbar, Typography, makeStyles } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export const Header = () => {
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
          <Button color="inherit">Sign out</Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

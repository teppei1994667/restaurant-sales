import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Cookies from "js-cookie";
import { SignOutButton } from "./SignOutButton";
import { useState } from "react";

export type HeaderProps = {
  loginStatus?: boolean;
};

export const Header = (props: HeaderProps) => {
  const { loginStatus = false } = props;

  const [isDrawerOpend, setIsDrawerOpend] = useState(false);

  const DrawerList = (
    <Box sx={{ width: 350 }} onClick={() => setIsDrawerOpend(false)}>
      <List className="mt-10">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText className="text-center text-gray-500" primary="新規ショップ作成" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  console.log("Header Cookies._access-token", Cookies.get("_access-token"));
  console.log("Header Cookies._client", Cookies.get("_client"));
  console.log("Header Cookies._uid", Cookies.get("_uid"));
  return (
    <>
      <AppBar elevation={1} position="static" color="transparent">
        <Toolbar>
          <IconButton edge="start">
            <MenuIcon onClick={() => setIsDrawerOpend(true)} />
            <Drawer anchor={"left"} open={isDrawerOpend} onClose={() => setIsDrawerOpend(false)}>
              {DrawerList}
            </Drawer>
          </IconButton>
          <Link className="no-underline ml-10" href="/" sx={{ flexGrow: "1" }}>
            <Typography className="text-gray-500" variant="h6">
              Dialy Sales
            </Typography>
          </Link>
          <SignOutButton visibility={loginStatus ? "visible" : "hidden"} />
        </Toolbar>
      </AppBar>
    </>
  );
};

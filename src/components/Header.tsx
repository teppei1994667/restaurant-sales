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
import { useCallback, useContext, useState } from "react";
import { UserContext, UserDispatch } from "@/pages/User/context/UserContextProvider";
import { UserContexActionType } from "@/pages/User/context/UserContextReducer";

export type HeaderProps = {
  loginStatus?: boolean;
};

export const Header = (props: HeaderProps) => {
  const { loginStatus = false } = props;

  const [isDrawerOpend, setIsDrawerOpend] = useState(false);
  const userDispatch = useContext(UserDispatch);

  // Drawerの開閉イベント
  const handleDrawerOpenAndClose = () => {
    setIsDrawerOpend((prev) => !prev);
  };

  // 「新規ショップ作成」押下時
  const handleListItemCreateStoreOnClick = useCallback(() => {
    userDispatch({
      type: UserContexActionType.UPDATE_CREATE_STORE_OPEN,
      payload: { isCreateStoreOpen: true },
    });
  }, [userDispatch]);

  const DrawerList = (
    <Box sx={{ width: 350 }} onClick={handleDrawerOpenAndClose}>
      <List className="mt-10">
        <ListItem disablePadding>
          <ListItemButton onClick={handleListItemCreateStoreOnClick}>
            <ListItemText className="text-center text-gray-500" primary="新規ショップ作成" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar elevation={1} position="static" color="transparent">
        <Toolbar>
          {loginStatus && (
            <IconButton edge="start">
              <MenuIcon onClick={handleDrawerOpenAndClose} />
              <Drawer anchor={"left"} open={isDrawerOpend} onClose={handleDrawerOpenAndClose}>
                {DrawerList}
              </Drawer>
            </IconButton>
          )}

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

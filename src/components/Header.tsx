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
import { SignOutButton } from "./SignOutButton";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext, UserDispatch } from "@/pages/User/context/UserContextProvider";
import { UserContexActionType } from "@/pages/User/context/UserContextReducer";

export type HeaderProps = {
  loginStatus?: boolean;
  callerPage?: string;
};

export const Header = (props: HeaderProps) => {
  const { loginStatus = false, callerPage } = props;

  const [isDrawerOpend, setIsDrawerOpend] = useState(false);
  const [drawerList, setDrawerList] = useState<JSX.Element>();
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

  // userページから呼ばれた時のリスト
  const UserPageDrawerList = (
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

  // storeページから呼ばれた時のリスト
  const StorePageDrawerList = (
    <Box sx={{ width: 350 }} onClick={handleDrawerOpenAndClose}>
      <List className="mt-10">
        <ListItem disablePadding>
          <ListItemButton onClick={handleListItemCreateStoreOnClick}>
            <ListItemText className="text-center text-gray-500" primary="店舗名" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  // Headerの呼び元ページごとにDrawerの表示内容を変更
  useEffect(() => {
    switch (callerPage) {
      case "user":
        setDrawerList(UserPageDrawerList);
        break;
      case "store":
        setDrawerList(StorePageDrawerList);
        break;
      default:
        setDrawerList(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callerPage]);

  return (
    <>
      <AppBar elevation={1} position="static" color="transparent">
        <Toolbar>
          {loginStatus && (
            <IconButton edge="start" onClick={handleDrawerOpenAndClose}>
              <MenuIcon />
              <Drawer anchor={"left"} open={isDrawerOpend} onClose={handleDrawerOpenAndClose}>
                {drawerList}
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

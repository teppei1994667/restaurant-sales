import {
  AppBar,
  Box,
  Button,
  ClickAwayListener,
  Drawer,
  Grid,
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
import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { UserDispatch } from "@/pages/User/context/UserContextProvider";
import { UserContexActionType } from "@/pages/User/context/UserContextReducer";
import { StoreContext } from "@/pages/Store/context/StoreContextProvider";
import { useRouter } from "next/router";
import { DialySalesContext } from "@/pages/AddDialySale/context/DialySalesContextProvider";
import { signOut } from "@/util/auth";
import Cookies from "js-cookie";

export type HeaderProps = {
  loginStatus?: boolean;
  callerPage?: string;
};

export const Header = (props: HeaderProps) => {
  const { loginStatus = false, callerPage } = props;

  const [isDrawerOpend, setIsDrawerOpend] = useState(false);
  const [drawerList, setDrawerList] = useState<ReactNode>();

  const userDispatch = useContext(UserDispatch);
  const storeContext = useContext(StoreContext);
  const dialySaleContext = useContext(DialySalesContext);

  const router = useRouter();

  // Drawerの開閉イベント
  const handleDrawerOpenAndClose = useCallback(() => {
    setIsDrawerOpend((prev) => !prev);
  }, []);

  // Drawerの閉じるイベント
  const handleDrawerOnClose = useCallback(() => {
    setIsDrawerOpend(false);
  }, []);

  // Userページ表示時「新規ショップ作成」押下時
  const handleListItemCreateStoreOnClick = useCallback(() => {
    userDispatch({
      type: UserContexActionType.UPDATE_CREATE_STORE_OPEN,
      payload: { isCreateStoreOpen: true },
    });
  }, [userDispatch]);

  // Storeページ、DialySaleページ表示時「店舗名」押下時
  const handleStoreNameOnClick = useCallback(
    (storeId: string) => {
      router.push({ pathname: "Store", query: { id: storeId } });
    },
    [router]
  );

  // Storeページ、DialySaleページ表示時「ユーザー名」押下時
  const handleUserNameOnClick = useCallback(() => {
    router.push({ pathname: "User" });
  }, [router]);

  // DialySaleページ表示時「店舗名」押下時
  const handleothereStoreAddDialySaleOnClick = useCallback(
    (storeId: string) => {
      router.push({ pathname: "AddDialySale", query: { id: storeId } });
    },
    [router]
  );

  // userページから呼ばれた時のリスト
  const UserPageDrawerList = (
    <Box sx={{ width: 350 }}>
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
    <Box sx={{ width: 350 }}>
      <List className="mt-10">
        <ListItem disablePadding className="mb-5">
          <ListItemText className="text-center text-gray-500" primary="◇店舗" />
        </ListItem>
        {storeContext.OtherStoreModels?.map((otherStoreModel, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleStoreNameOnClick(String(otherStoreModel.id))}>
              <ListItemText className="text-center text-gray-500" primary={otherStoreModel.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding className="mt-20">
          <ListItemText className="text-center text-gray-500 mb-5" primary="◇ユーザー" />
        </ListItem>
        <ListItem disablePadding className="">
          <ListItemButton onClick={handleUserNameOnClick}>
            <ListItemText className="text-center text-gray-500" primary={storeContext.UserModel?.name} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  // dialySaleページから呼ばれた時のリスト
  const DialySaleDrawerList = (
    <Box sx={{ width: 350 }}>
      <List className="mt-10">
        <ListItem disablePadding className="mb-5">
          <ListItemText className="text-center text-gray-500" primary="◇売上登録" />
        </ListItem>
        {dialySaleContext.OtherStoreModels?.map((otherStoreModel, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleothereStoreAddDialySaleOnClick(String(otherStoreModel.id))}>
              <ListItemText className="text-center text-gray-500" primary={otherStoreModel.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding className="mt-20">
          <ListItemText className="text-center text-gray-500 mb-5" primary="◇ストア" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleStoreNameOnClick(String(dialySaleContext.StoreModel?.id))}>
            <ListItemText className="text-center text-gray-500" primary={dialySaleContext.StoreModel?.name} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding className="mt-20">
          <ListItemText className="text-center text-gray-500 mb-5" primary="◇ユーザー" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleUserNameOnClick}>
            <ListItemText className="text-center text-gray-500" primary={dialySaleContext.UserModel?.name} />
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
      case "dialySale":
        setDrawerList(DialySaleDrawerList);
        break;
      default:
        setDrawerList(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callerPage, storeContext, dialySaleContext]);

  const handleSignOutButtonOnClick = useCallback(async () => {
    const res = await signOut();
    if (res.status === 200) {
      Cookies.remove("_access-token");
      Cookies.remove("_client");
      Cookies.remove("_uid");

      router.push("/");
    }
  }, []);

  return (
    <>
      <AppBar elevation={1} position="static" color="transparent">
        <Toolbar>
          <Grid container sx={{ height: "64px", placeItems: "center" }}>
            <Grid item>
              {loginStatus && (
                <ClickAwayListener onClickAway={handleDrawerOnClose}>
                  <IconButton edge="start" onClick={handleDrawerOpenAndClose}>
                    <MenuIcon />
                    <Drawer anchor={"left"} open={isDrawerOpend}>
                      {drawerList}
                    </Drawer>
                  </IconButton>
                </ClickAwayListener>
              )}
            </Grid>
            <Grid item sx={{ flexGrow: "1" }}>
              <Link className="no-underline ml-10 text-gray-500" href="/" variant="h6" sx={{}}>
                Dialy Sales
              </Link>
            </Grid>
            <Grid item sx={{}}>
              <Button
                onClick={handleSignOutButtonOnClick}
                sx={{ visibility: loginStatus ? "visible" : "hidden", color: "#666699", textAlign: "right" }}
              >
                ログアウト
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

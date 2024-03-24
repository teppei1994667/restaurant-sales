import { signOut } from "@/util/auth";
import { Button } from "@mui/material";
import { useCallback } from "react";
import Cookies from "js-cookie";
import router from "next/router";

export type SignOutButtonProps = {
  visibility: string;
};

export const SignOutButton = (props: SignOutButtonProps) => {
  const { visibility } = props;
  const handleSignOutButtonOnClick = useCallback(async () => {
    const res = await signOut();
    console.log("サインアウト実行 res", res);
    if (res.status === 200) {
      console.log("サインアウト成功");
      Cookies.remove("_access-token");
      Cookies.remove("_client");
      Cookies.remove("_uid");

      router.push("/");
    }
  }, []);

  return (
    <>
      <Button
        color="inherit"
        onClick={handleSignOutButtonOnClick}
        sx={{ visibility: visibility, textTransform: "none" }}
      >
        Sign out
      </Button>
    </>
  );
};

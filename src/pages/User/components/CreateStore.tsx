import { ControlledNumberTextField } from "@/components/share/form/ControlledNumberTextField";
import { ControlledTextField } from "@/components/share/form/ControlledTextField";
import { createStoreForm } from "@/type/Store";
import { Button, Dialog, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import { useCallback, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { UserContext, UserDispatch } from "../context/UserContextProvider";
import { UserContexActionType } from "../context/UserContextReducer";
import { storeAxios } from "@/util/convertAxios";

export const CreateStoreDialog = () => {
  const form = useForm<createStoreForm>({ mode: "onSubmit", reValidateMode: "onChange" });

  const userContext = useContext(UserContext);
  const userDispatch = useContext(UserDispatch);

  // 閉じるボタン押下
  const handleCloseOnClick = useCallback(() => {
    userDispatch({
      type: UserContexActionType.UPDATE_CREATE_STORE_OPEN,
      payload: { isCreateStoreOpen: false },
    });
  }, [userDispatch]);

  // 保存ボタン 押下
  const handleHozonOnClick = useCallback(async () => {
    const createStoreParams = {
      userId: userContext.LoginUserModel?.id,
      name: form.getValues("name"),
      address: form.getValues("address"),
      phoneNumber: form.getValues("phoneNumber"),
      floorSpace: form.getValues("floorSpace"),
      seatingCapacity: form.getValues("seatingCapacity"),
    };
    console.log("handleHozonOnClick.createStoreParams", createStoreParams);
    try {
      // apiを呼び出してstoreを作成する
      await storeAxios.post("/", createStoreParams);

      // form内入力値の削除
      form.reset();

      // ダイアログを閉じる
      userDispatch({
        type: UserContexActionType.UPDATE_CREATE_STORE_OPEN,
        payload: { isCreateStoreOpen: false },
      });

      //storeの作成に成功したら画面を更新する
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  }, [form, userContext.LoginUserModel?.id, userDispatch]);

  return (
    <FormProvider {...form}>
      <Dialog open={userContext.isCreateStoreOpen} fullWidth maxWidth="md">
        <DialogTitle>
          <Grid container>
            <Grid item sx={{ width: "25%" }}></Grid>
            <Grid item sx={{ width: "50%", textAlign: "center" }}>
              <Typography variant="h5" className="text-gray-500">
                新規店舗登録
              </Typography>
            </Grid>
            <Grid item sx={{ width: "25%" }}>
              <Button variant="text" className="text-gray-500" onClick={handleCloseOnClick} sx={{ float: "right" }}>
                ×
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container className="justify-center">
            <Grid item className="w-96 mt-3">
              <ControlledTextField
                rules={{ required: { value: true, message: "必須入力です" } }}
                name="name"
                label="店舗名"
                fullWidth
                helperText={form.formState.errors.name?.message}
              />
            </Grid>
          </Grid>
          <Grid container className="justify-center">
            <Grid item className="w-96 mt-8">
              <ControlledTextField
                rules={{ required: { value: true, message: "必須入力です" } }}
                name="address"
                label="住所"
                fullWidth
                helperText={form.formState.errors.address?.message}
              />
            </Grid>
          </Grid>
          <Grid container className="justify-center">
            <Grid item className="w-96 mt-8">
              <ControlledTextField
                rules={{ required: { value: true, message: "必須入力です" } }}
                name="phoneNumber"
                label="電話番号"
                fullWidth
                helperText={form.formState.errors.phoneNumber?.message}
              />
            </Grid>
          </Grid>
          <Grid container className="justify-center">
            <Grid item className="w-96 mt-8">
              <ControlledNumberTextField
                rules={{ required: { value: true, message: "必須入力です" } }}
                name="floorSpace"
                label="床面積"
                fullWidth
                helperText={form.formState.errors.floorSpace?.message}
              />
            </Grid>
          </Grid>
          <Grid container className="justify-center">
            <Grid item className="w-96 mt-8">
              <ControlledNumberTextField
                rules={{ required: { value: true, message: "必須入力です" } }}
                name="seatingCapacity"
                label="席数"
                fullWidth
                helperText={form.formState.errors.seatingCapacity?.message}
              />
            </Grid>
          </Grid>
          <Grid container className="justify-center mb-8">
            <Grid item className="mt-8">
              <Button className="text-gray-500" variant="text" onClick={form.handleSubmit(handleHozonOnClick)}>
                保存
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};

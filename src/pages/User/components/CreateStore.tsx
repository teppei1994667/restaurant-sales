import { ControlledNumberTextField } from "@/components/share/form/ControlledNumberTextField";
import { ControlledTextField } from "@/components/share/form/ControlledTextField";
import { createStoreForm } from "@/type/Store";
import { Button, Dialog, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const CreateStoreDialog = () => {
  const [isCreateStoreDialogOpen, setIsCreateStoreDialogOpen] = useState(true);

  const form = useForm<createStoreForm>({ mode: "onSubmit", reValidateMode: "onChange" });

  // 閉じるボタン押下
  const handleTojiruOnClick = useCallback(() => {
    setIsCreateStoreDialogOpen(false);
  }, []);

  return (
    <FormProvider {...form}>
      <Dialog open={isCreateStoreDialogOpen} fullWidth maxWidth="md">
        <DialogTitle>
          <Grid container className="justify-center">
            <Grid item>
              <Typography variant="h5" className="text-gray-500">
                新規店舗登録
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container className="justify-center">
            <Grid item className="w-96 mt-3">
              <ControlledTextField
                rules={{ required: { value: true, message: "必須入力です" } }}
                name="name"
                label="ユーザー名"
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
              <Button className="text-gray-500" variant="text">
                保存
              </Button>
            </Grid>
            <Grid item className="mt-8 ml-8">
              <Button className="text-gray-500" variant="text" onClick={handleTojiruOnClick}>
                閉じる
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};

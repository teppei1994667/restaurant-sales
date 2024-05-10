import { Button, Grid, Typography } from "@mui/material";
import { ControlledDatePicker } from "../../../components/share/form/ControlledDatePicker";
import { FormProvider, useForm } from "react-hook-form";
import { DialySale, SearchDialySales } from "@/type/DialySale";
import { LOCAL_DIALYSALES_ADDRESS } from "@/constants/serverAdress";
import { useContext } from "react";
import { DialySalesDispatch } from "@/pages/AddDialySale/context/DialySalesContextProvider";
import { convertDisplayDialySales } from "@/util/convertDisplayDialySales";
import dayjs from "dayjs";
import { convertAxios } from "@/util/convertAxios";
import { DialySaleContextActionType } from "../context/DIalySalesContextReducer";

export const SearchDailySales = () => {
  const dialySalesDspatch = useContext(DialySalesDispatch);
  //検索の入力をformで管理
  const searchDialySalesForm = useForm<SearchDialySales>({
    defaultValues: {
      startDay: null,
      endDay: null,
    },
  });

  const handleSearchDialySalesOnClick = async () => {
    //APIから指定した期間のDialySale一覧を取得する
    try {
      const res = await convertAxios.get<DialySale[]>(LOCAL_DIALYSALES_ADDRESS, {
        //サーバーから取得するDialySaleの期間をparamsに設定
        params: {
          startDay: dayjs(searchDialySalesForm.getValues("startDay")).format("YYYY-MM-DD"),
          endDay: dayjs(searchDialySalesForm.getValues("endDay")).format("YYYY-MM-DD"),
        },
      });
      dialySalesDspatch({
        type: DialySaleContextActionType.SAVE_DIALY_SALE_INFORMATION,
        payload: { dialySaleModels: res.data },
      });
      //dialySaleの取得に成功したらformの値をリセット
      searchDialySalesForm.reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <FormProvider {...searchDialySalesForm}>
        <Grid container spacing={0.75} alignItems="center">
          <Grid item>
            <ControlledDatePicker
              name="startDay"
              label="開始日"
              helperText={searchDialySalesForm.formState.errors.startDay?.message}
            />
          </Grid>
          <Grid item>
            <Typography>〜</Typography>
          </Grid>
          <Grid item>
            <ControlledDatePicker
              name="endDay"
              label="終了日"
              helperText={searchDialySalesForm.formState.errors.endDay?.message}
            />
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              className="ml-5"
              onClick={searchDialySalesForm.handleSubmit(handleSearchDialySalesOnClick)}
            >
              表示
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};

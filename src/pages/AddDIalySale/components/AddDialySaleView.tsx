import { CreateDialySale } from "@/pages/AddDialySale/components/CreateDialySale";
import { DialySales } from "@/pages/AddDialySale/components/DialySales";
import { EditDialog } from "@/pages/AddDialySale/components/EditDialog";
import { SearchDailySales } from "@/pages/AddDialySale/components/SearchDailySales";
import { DialySale } from "@/type/DialySale";
import { Button, Grid, Paper, Snackbar, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useContext } from "react";
import { CirclesWithBar } from "react-loader-spinner";
import { DialySalesContext } from "../context/DialySalesContextProvider";

export type AddDialySaleViewProps = {
  isLoading: boolean;
  isEditDialogOpen: boolean;
  isSearchDialySalesDispalay: boolean;
  rowSelectionModelValue?: DialySale;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleKikanShiteiOnClick: () => void;
  handleEditBtnOnClick: () => void;
  handleDeleteOnClick: () => void;
  handleSnackBarOnClose: () => void;
};

export const AddDialySaleView = (props: AddDialySaleViewProps) => {
  const {
    isLoading,
    isEditDialogOpen,
    isSearchDialySalesDispalay,
    rowSelectionModelValue,
    setIsEditDialogOpen,
    handleKikanShiteiOnClick,
    handleEditBtnOnClick,
    handleDeleteOnClick,
    handleSnackBarOnClose,
  } = props;

  const dialySaleContext = useContext(DialySalesContext);

  return (
    <>
      <Paper elevation={0} className="mt-5">
        <Grid container className="justify-center">
          <Grid item>
            <Typography className="text-gray-500" variant="h5">
              {dialySaleContext.StoreModel?.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container className="justify-center">
          <Grid item>
            <Typography className="text-gray-500" variant="h5">
              売り上げ登録
            </Typography>
          </Grid>
        </Grid>
        <Grid container className="justify-center mt-10">
          <Grid item>
            <CreateDialySale />
          </Grid>
        </Grid>
        <Grid container className="justify-center mt-2">
          <Grid item>
            <Button className="text-gray-500" variant="text" onClick={handleKikanShiteiOnClick}>
              {isSearchDialySalesDispalay ? "隠す" : "期間を指定して表示する"}
            </Button>
          </Grid>
        </Grid>
        {isSearchDialySalesDispalay ? (
          <Grid container className="justify-center mt-3">
            <Grid item>
              <SearchDailySales />
            </Grid>
          </Grid>
        ) : null}
        {isLoading ? (
          <Grid container className="justify-center mt-9">
            <Grid item>
              <CirclesWithBar height="80" width="80" color="gray" ariaLabel="three-dots-loading" wrapperClass="mt-20" />
            </Grid>
          </Grid>
        ) : (
          <>
            <Grid container spacing={0.75} className="justify-center mt-3">
              <Grid item>
                <DialySales />
              </Grid>
            </Grid>
            <Grid container className="justify-center mt-3">
              <Grid item>
                <Button className="text-gray-500" variant="text" onClick={handleEditBtnOnClick}>
                  変更
                </Button>
              </Grid>
              <Button className="text-gray-500" variant="text" onClick={handleDeleteOnClick}>
                削除
              </Button>
            </Grid>
          </>
        )}
      </Paper>
      <Snackbar
        message={dialySaleContext.snackBarText}
        open={dialySaleContext.isSnackBarOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        autoHideDuration={5000}
        onClose={handleSnackBarOnClose}
      />
      <EditDialog
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        rowSelectionModelValue={rowSelectionModelValue}
      />
    </>
  );
};

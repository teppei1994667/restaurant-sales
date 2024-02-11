import { Button, Dialog, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

export type InfomationDialogProps = {
  isInfomationDialogOpen: boolean;
  setIsInfomationDialogOpen: Dispatch<SetStateAction<boolean>>;
  infomationKinds: string;
  infomationMessage: string;
};

export const InfomationDialog = (props: InfomationDialogProps) => {
  const { isInfomationDialogOpen, setIsInfomationDialogOpen, infomationKinds, infomationMessage } = props;

  //表示するDialogTitleを保持
  const [dialogTitle, setDialogTitle] = useState<ReactNode>();

  //初期表示時にinfomationKindsの値で表示するDialogTitleを変更
  useEffect(() => {
    switch (infomationKinds) {
      case "confirmation":
        setDialogTitle(<Typography variant="h5">confirmation</Typography>);
        break;
      case "warning":
        setDialogTitle(
          <Typography variant="h5" className="text-red-500">
            warning
          </Typography>
        );
        break;
      default:
        setDialogTitle(<Typography variant="h5"></Typography>);
    }
  }, [infomationKinds]);

  //「閉じる」押下時
  const handleCloseOnClick = () => {
    setIsInfomationDialogOpen(false);
  };
  return (
    <Dialog open={isInfomationDialogOpen} fullWidth maxWidth="md" sx={{ textAlign: "center" }}>
      <DialogTitle className="border-solid border-red-900">
        <Grid container spacing={0.75} justifyContent="center">
          <Grid item>{dialogTitle}</Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className="h-52">
        <Grid container spacing={0.75} className="justify-center">
          <Grid item>
            <Typography className="mt-10 whitespace-pre-wrap">{infomationMessage}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={0.75} className="justify-center mt-12">
          <Grid item>
            <Button variant="outlined" onClick={handleCloseOnClick}>
              閉じる
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

import { Button, Dialog, DialogContent, DialogTitle, Grid, Paper, Typography } from "@mui/material";
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
  const [borderColor, setBorderColor] = useState("");

  //初期表示時にinfomationKindsの値で表示するDialogTitleを変更
  useEffect(() => {
    switch (infomationKinds) {
      case "confirmation":
        setDialogTitle(<Typography variant="h4">confirmation</Typography>);
        setBorderColor("border-stone-700");
        break;
      case "warning":
        setDialogTitle(
          <Typography variant="h4" className="text-red-500">
            warning
          </Typography>
        );
        setBorderColor("border-red-600");
        break;
      default:
        setDialogTitle(<Typography variant="h4"></Typography>);
    }
  }, [infomationKinds]);

  //「閉じる」押下時
  const handleCloseOnClick = () => {
    setIsInfomationDialogOpen(false);
  };
  return (
    <Dialog open={isInfomationDialogOpen} fullWidth maxWidth="md" className="text-center">
      <DialogTitle>
        <Grid container spacing={0.75} justifyContent="center">
          <Grid item>{dialogTitle}</Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Paper elevation={0} className={`h-27 border border-dotted ${borderColor}`}>
          <Grid container spacing={0.75} className="justify-center">
            <Grid item>
              <Typography className="my-5 whitespace-pre-wrap">{infomationMessage}</Typography>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={0.75} className="justify-center mt-5">
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

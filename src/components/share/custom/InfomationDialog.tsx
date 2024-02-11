import { Button, Dialog, DialogContent, DialogTitle, Grid, Paper, Typography } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

export type InfomationDialogProps = {
  isInfomationDialogOpen: boolean;
  infomationKinds: string;
  infomationMessage: string;
  setIsInfomationDialogOpen: Dispatch<SetStateAction<boolean>>;
  setClickedButton?: Dispatch<SetStateAction<string>>;
};

export const InfomationDialog = (props: InfomationDialogProps) => {
  const { isInfomationDialogOpen, infomationKinds, infomationMessage, setIsInfomationDialogOpen, setClickedButton } =
    props;

  //表示するDialogTitleを保持
  const [dialogTitle, setDialogTitle] = useState<ReactNode>();
  const [buttonKind, setButtonKind] = useState<ReactNode>();
  const [borderColor, setBorderColor] = useState("");

  //初期表示時にinfomationKindsの値で表示する内容を変更
  useEffect(() => {
    switch (infomationKinds) {
      case "confirmation":
        setDialogTitle(<Typography variant="h4">confirmation</Typography>);
        setButtonKind(
          <Grid container spacing={0.75} className="justify-center mt-5">
            <Grid item>
              <Button variant="outlined" onClick={handleCloseOnClick}>
                閉じる
              </Button>
            </Grid>
          </Grid>
        );
        setBorderColor("border-stone-700");
        break;
      case "warning":
        setDialogTitle(
          <Typography variant="h4" className="text-red-500">
            warning
          </Typography>
        );
        setButtonKind(
          <Grid container spacing={0.75} className="justify-center mt-5">
            <Grid item>
              <Button variant="outlined" onClick={handleYesOnClick}>
                はい
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={handleNoOnClick}>
                いいえ
              </Button>
            </Grid>
          </Grid>
        );
        setBorderColor("border-red-600");
        break;
      default:
        setDialogTitle(<Typography variant="h4"></Typography>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infomationKinds]);

  //「閉じる」押下時
  const handleCloseOnClick = () => {
    setIsInfomationDialogOpen(false);
  };

  //「はい」押下時
  const handleYesOnClick = () => {
    if (setClickedButton) {
      setClickedButton("はい");
    }
    setIsInfomationDialogOpen(false);
  };

  //「いいえ」押下時
  const handleNoOnClick = () => {
    if (setClickedButton) {
      setClickedButton("いいえ");
    }
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
        {buttonKind}
      </DialogContent>
    </Dialog>
  );
};

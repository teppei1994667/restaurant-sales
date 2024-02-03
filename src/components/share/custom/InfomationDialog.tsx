import { Button, Dialog, DialogContent, DialogTitle, Grid, Paper, Typography } from "@mui/material";

export type InfomationDialogProps = {
  isInfomationDialogOpen: boolean;
};

export const InfomationDialog = (props: InfomationDialogProps) => {
  const { isInfomationDialogOpen } = props;
  return (
    <Dialog open={isInfomationDialogOpen} fullWidth maxWidth="md" sx={{ textAlign: "center" }}>
      <DialogTitle>
        <Grid container spacing={0.75} justifyContent="center">
          <Grid item>
            <Typography variant="h5">confirmation</Typography>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className="h-52">
        <Grid container spacing={0.75} className="justify-center">
          <Grid item>
            <Typography className="mt-10 whitespace-pre-wrap">{`同時に複数のデータの変更はできません。\n変更したいデータを１つだけ選択してください。`}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={0.75} className="justify-center mt-">
          <Grid item>
            <Button variant="outlined">閉じる</Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

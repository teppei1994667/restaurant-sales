import { AppBar, IconButton, Link, Theme, Toolbar, Typography, makeStyles } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// const useStyles = makeStyles((theme: Theme) => ({
//   iconButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     textDecoration: "none",
//     color: "inherit",
//   },
//   linkBtn: {
//     textTransform: "none",
//   },
// }));

export const Header = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Typography variant="h6">Sample</Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
};

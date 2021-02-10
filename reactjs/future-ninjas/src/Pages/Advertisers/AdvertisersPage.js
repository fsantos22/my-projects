import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import CreateIcon from "@material-ui/icons/Create";
import logo from "../../components/images/logoH.png";
import StyledButton from "../../components/MaterialUI/MaterialButton";
import { HiredJobsPage } from "../HiredJobsPage";
import RegisterJob from "./RegisterJob";
import { TopBar, LogoTopBar } from "../../components/Styled";
import { DeleteJobsPage } from './DeleteJobsPage';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      zIndex: 1201,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function AdvertisersPage(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [CurrentScreen, setCurrentScreen] = useState("");
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />

      <List>
        <ListItem button>
          <ListItemIcon>
            <CardTravelIcon />
          </ListItemIcon>
          <ListItemText
            primary="Jobs contratados"
            onClick={() => setCurrentScreen("Hired Jobs")}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText
            primary="Cadastrar novo Job"
            onClick={() => setCurrentScreen("Sign Job")}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DeleteForeverIcon />
          </ListItemIcon>
          <ListItemText
            primary="Excluir Job"
            onClick={() => setCurrentScreen("Delete Job")}
          />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const Tela = () => {
    switch (CurrentScreen) {
      case "Hired Jobs":
        return <HiredJobsPage />;
      case "Sign Job":
        return <RegisterJob />;
      case "Delete Job":
        return <DeleteJobsPage />;
      default:
        return "";
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <TopBar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <LogoTopBar src={logo} />
          <StyledButton text={"sair"} onClickBtn={props.onClickSair} />
        </TopBar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main id="main-screen" className={classes.content}>
        <div className={classes.toolbar} />
        {Tela()}
      </main>
    </div>
  );
}

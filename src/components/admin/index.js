import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Grid from '@material-ui/core/Grid';
import SignOutButton from '../SignOut';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import {compose} from 'recompose';
import withAuthorization from '../Session/withAuthorization';
import { BrowserRouter as Router , Route} from 'react-router-dom';
import * as routes from '../../constants/routes';
import Dashboard from './Dashboard';
import AdminHome from './Home';
import AddManger from './AddManger';
import Managers from './MangeManger';
import Rejected from './Rejected';
import Resolved from './Resolved';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'auto',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <Router>
      <div className={classes.root}>
        
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Grid container spacing={8}>
            <Grid item xs={12} sm={9} md={11}>
            <Typography variant="title" color="inherit">
              Admin @ Saylani Complaint System
            </Typography>
            </Grid>
            <Grid item xs={12} sm={3} md={1}>
            <Typography variant="button" color="inherit" >
              <SignOutButton />
            </Typography>
            </Grid>
             </Grid>
            
          </Toolbar>
        </AppBar>


        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>{mailFolderListItems}</List>
          <Divider />
          <List>{otherMailFolderListItems}</List>
        </Drawer>
          <main className={classes.content}>
             <div className={classes.toolbar} />
            
             <Grid container spacing={8}> 
              <Route exact path={routes.DASHBOARD} component={() => <Dashboard/>} />
              <Route exact path={routes.ADMIN} component={() => <AdminHome />} />
              <Route exact path={routes.NEWMANGER} component={() => <AddManger />} />

              <Route exact path={routes.MANAGERS} component={() => <Managers />} />
              <Route exact path={routes.REJECTEDHISTORY} component={() => <Rejected />} />
              <Route exact path={routes.RESOLVEDHISTORY} component={() => <Resolved />} />
             
            </Grid>
           
              
        </main>
      </div>
      </Router>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition),withStyles(styles, { withTheme: true }))(MiniDrawer);
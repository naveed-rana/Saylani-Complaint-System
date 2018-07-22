
import SignOutButton from '../../SignOut';
import * as routes from '../../../constants/routes';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class NavigationAuth extends Component {
    render() {
      return (
        <div>
      <AppBar className="nav-bar" position="fixed">
        <Toolbar>
          <Grid container spacing={8}> 
          <Grid item xm={6} md={10}>
          <Typography variant="title" color="inherit" >
            Saylani Complaint System
          </Typography>
          </Grid>
          <Grid item xm={6} md={1} align="right">
           <Link to={routes.HOME}><i className="material-icons menu-icon">home</i></Link>
          
          </Grid>
          <Grid item sm={6} md={1}>
          <SignOutButton />
          </Grid>
           
          </Grid>
         
        </Toolbar>
      </AppBar>
        </div>
      )
    }
  }
  export default NavigationAuth;
  
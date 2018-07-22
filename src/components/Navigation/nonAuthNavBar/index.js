import { Link } from 'react-router-dom';
import * as routes from '../../../constants/routes';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export  const NavigationNonAuth = () =>
<div>

   <AppBar className="nav-bar" position="fixed">
        <Toolbar>
          <Grid container spacing={8}> 
          <Grid item xm={6} md={8}>
          <Typography variant="title" color="inherit" >
            Saylani Complaint System
          </Typography>
          </Grid>
          <Grid item xm={6} md={4} align="right">
          <Link to={routes.LANDING}><i className="material-icons menu-icon">home</i></Link>
          <Link className="menu-signin" to={routes.SIGN_IN}>Sign In</Link>
          </Grid>
           
          </Grid>
         
        </Toolbar>
      </AppBar>
 
</div>

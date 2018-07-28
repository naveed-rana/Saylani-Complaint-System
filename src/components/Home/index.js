import React, {Component} from 'react';
import * as routes from '../../constants/routes';
import withAuthorization from '../Session/withAuthorization';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Instruntions from '../Instructions';
import NewComplaint from '../NewComplaint';
import ShowComplaints from '../Show Complaints';
import Account from '../Account';
import Footer from '../Footer'
import Navigation  from '../Navigation';
import { compose } from 'recompose';
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import {startGetUser} from '../../actions/index';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import History from '../History';

class HomePage extends Component {
  state = {
    value: 4,
  };
  componentDidMount() {
    this.props.startGetUser();
  
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        {this.props.userdata.flag ? 
        <div>
        <Navigation/>
      <Router>
        <div className="marginTop">
          
            <div className="container">
              
              <div className="row center-align z-depth-3">
                  
              <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
      >
        <BottomNavigationAction 
        className="buttomNavigation"
         label="New Complaints"
          icon={<Icon>library_add</Icon>}
          component={Link} to={routes.ADD_COMPLAINT}
          />

        <BottomNavigationAction 
        className="buttomNavigation" 
        label="My Complaints" 
        icon={<Icon>visibility</Icon>} 
        component={Link} to={routes.SHOW_COMPLAINTS}
        />

        
        <BottomNavigationAction
         className="buttomNavigation"
          label="History" 
          component={Link} to={routes.HISTORY}
          icon={<Icon>history</Icon>} />

        <BottomNavigationAction
         className="buttomNavigation"
          label="Account" 
          component={Link} to={routes.ACCOUNT}
          icon={<Icon>account_circle</Icon>} />

        <BottomNavigationAction className="buttomNavigation" 
        component={Link} to={routes.ACCOUNT_HOME}
        label="Instructions"
       icon={<Icon>help_outline</Icon>} />

      </BottomNavigation>
              </div>
              </div>

              
                <Grid container spacing={8}> 
                <Grid item sm={1} md={1}>
                </Grid>  
                <Grid item sm={10} md={10}>
                  
               
                <Route exact path={routes.ACCOUNT_HOME} component={() => <Instruntions/>}/>
                <Route exact path={routes.ADD_COMPLAINT} component={() =>< NewComplaint />}/>
                <Route
                  exact
                  path={routes.SHOW_COMPLAINTS}
                  component={() =>< ShowComplaints />}/>
                <Route exact path={routes.ACCOUNT} component={() =>< Account />}/>
                <Route exact path={routes.HISTORY} component={() =>< History />}/>

                 </Grid>

                <Grid item sm={1} md={1}>
                  
                </Grid>
                </Grid>
      
        </div>
      </Router>
      <Footer/>
      </div>
      :
      <Grid container className="loading">
       <Grid item md={5}></Grid>
       <Grid item md={2}>
       <CircularProgress  size={200} />
       </Grid>
       <Grid item md={5}></Grid>
       </Grid>
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
     
  return {
      userdata:state.userState
  }
}

const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition),connect(mapStateToProps,{startGetUser}))(HomePage);

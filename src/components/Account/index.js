import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {connect} from 'react-redux';

class AccountPage extends Component {
  render() {
    return (
      <div className="marginBottom">
        <Paper className="paddingBottom" elevation={10}>
         <Grid container spacing={8}> 
           <Grid item  md={2}>  </Grid>
           <Grid item md={8} align="center">
             <Grid item>
             <img src={require('../../images/download.png')} alt="account"/>
             </Grid>
             <Grid item>
             <Typography variant="display2" > 
               {this.props.user.username}
             </Typography>
             <Divider />
             <Typography variant="body2" > 
               Account Status : active
             </Typography>
             <Typography variant="body2"> 
               userid:{this.props.user.uid}
             </Typography>
             <Typography variant="body2" > 
               Email : {this.props.user.email}
             </Typography>
             <Divider />
             <Typography variant="body2" > 
             {this.props.myComplaints.length ? 
              <div>Your total Complaints:{this.props.myComplaints.length}</div>
               :""
                }
             </Typography>
             </Grid>
           </Grid>
           <Grid item md={2}></Grid>
         </Grid>
        </Paper>
      </div>
    )
  }
}
const mapStateToProps = state => (
  {user: state.userState.user,
    myComplaints:state.userComplaints.complaints})

export default connect(mapStateToProps, null)(AccountPage);
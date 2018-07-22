import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
 
    messages: {
      backgroundColor: 'white',
      borderRadius: 50,
      marginTop: 10,
      padding: 15
    },
    
    emptymessage: {
      borderRadius: 50,
      margin: 10,
      padding: 15
    },
    mymessage: {
      backgroundColor: '#4080FF',
      borderRadius: 50,
      marginTop: 10,
      padding: 15,
      color: 'white'
    },
    timeStamp:{
    paddingRight:20
    }
  });

class MessageShow extends Component {

  dateFormate = time =>{
    var currentdate = new Date(time); 
    var datetime =   currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
        return datetime;
   }
    
    render() {
        const {classes,messages} = this.props;
        return (
             
            <Grid container spacing={8}>

            <Grid item sm={6} md={6}>
              {messages.userid !== this.props.admin.uid
                ?
                <div> 
                <Typography className={classes.messages} variant="body1">
                    {messages.message}
                  </Typography>
                  <Typography className={classes.timeStamp} variant="body1" align="right"> 
                          <small>{this.dateFormate(messages.createdAt)}</small>
                        </Typography>
                  </div>
                : <Typography variant="body1" className={classes.emptymessage}></Typography>}
            </Grid>
            <Grid item sm={6} md={6}>
              {messages.userid === this.props.admin.uid
                ?
                <div> 
                <Typography className={classes.mymessage} variant="body1">
                    {messages.message}
                  </Typography>
                  <Typography className={classes.timeStamp} variant="body1" align="right"> 
                          <small>{this.dateFormate(messages.createdAt)}</small>
                        </Typography>
                  </div>
                : <Typography variant="body1" className={classes.emptymessage}></Typography>}
            </Grid>

          </Grid>
        )
    }
}

export default withStyles(styles)(MessageShow);
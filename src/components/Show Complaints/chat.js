import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import profileimg from '../../images/profile.jpg';
import {startGetUser} from '../../actions';
import {startAddNewMessage,startGetMessage} from '../../actions/chatActions';
import {updateComplaintStatus} from '../../actions/adminAction';
import ReactDOM  from 'react-dom';


const styles = theme => ({
    img:{
      paddingRight:5
    },
    details:{
      backgroundColor: 'antiquewhite',
      borderRadius: 5
    },
    textarea:{
      backgroundColor:'white',
      marginTop:20,
      width:'72vw'
    },
    progress:{
      marginTop:80
    },
    messages:{
      backgroundColor:'white',
      borderRadius:50,
      marginTop:10,
      padding:15
    },
    messageContainer:{
      maxHeight:300,
      overflow:'auto'
    },
    emptymessage:{
          borderRadius:50,
          margin:10,
          padding:15
    },
    mymessage:{
          backgroundColor:'#4080FF',
          borderRadius:50,
          marginTop:10,
          padding:15,
          color:'white'
    },
    sendbtn:{
      backgroundColor: 'transparent',
      border: 'none'
    },
    sendicon:{
      marginBottom: 2,
      fontSize: 40,
      color: '#4080FF'
    },
    timeStamp:{
    paddingRight:20
    }
  });


class ChatArea extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          message:'',
          expanded: null,
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.statusHandler = this.statusHandler.bind(this);
      }

sendMessage(complinat_id){
    
        var message ={
          userid:this.props.user.uid,
          message:this.state.message
        }
        this.props.startAddNewMessage(complinat_id,message);
        this.setState({message:''});

      }

componentDidUpdate(){
  this.scrollToBottom(this.props.complaint.id);
}

handleChange = panel => (event, expanded) => {  
  if(event.target.classList.contains("statusconfirmed")){
    return null;
  }else{
        this.props.startGetMessage(panel);
        this.setState({
          expanded: expanded
            ? panel
            : false
        });
      }}

      statusHandler(complaintid){
        
       let confirm =  window.confirm("are you sure?");
       if(confirm){
        this.props.updateComplaintStatus(complaintid,"confirm resolved");
       }
      }

      scrollToBottom = (id) => {
     
        const element = document.getElementById(id);
        const scrollHeight = element.scrollHeight;
        const height = element.clientHeight;
        const maxScrollTop = scrollHeight - height;   
        ReactDOM.findDOMNode(element).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
     }

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
        const {classes,chatState,complaint,no} = this.props;
        const {  expanded } = this.state;
       
        return (
            <div>
            <ExpansionPanel
              expanded={expanded === complaint.id}
              onChange={this.handleChange(complaint.id)}>
              <ExpansionPanelSummary expandIcon={< ExpandMoreIcon />}>
                <Grid container spacing={8}>
                  <Grid item sm={1} md={1}>
                    <Typography variant="body1">
                      {no}
                    </Typography>
                  </Grid>
                  <Grid item sm={1} md={2}>
                    <Typography variant="body1">
                      {complaint.city_incharge}
                    </Typography>
                  </Grid>
                  <Grid item sm={1} md={2}>
                    <Typography variant="body1">
                      {complaint.brach_incharge}
                    </Typography>
                  </Grid>
                  <Grid item sm={1} md={3} align="center">
                    <Typography variant="body1">
                      {complaint.complaint_discription}
                    </Typography>
                  </Grid>
                  <Grid  item sm={1} md={2} align="center">
                  
                    <Typography  variant="body1">
                      {complaint.complaint_status === 'Resolved'?
                      <b>Resolved <br/><a className="statusconfirmed" onClick={()=>this.statusHandler(complaint.id)}> Confirm Resolved</a></b>
                      :
                      complaint.complaint_status==='Rejected'?
                      <b>Rejected <br/><a className="statusconfirmed" onClick={()=>this.statusHandler(complaint.id)}>Delete</a></b> :
                      "pending"
                    }
                    </Typography>
                   
                  </Grid>
                  
                  <Grid item sm={1} md={2}>
                    <Typography variant="body1">
                      {complaint.date_time}
                    </Typography>
                  </Grid>

                </Grid>
              
              </ExpansionPanelSummary>
              <ExpansionPanelDetails >
              <Grid container spacing={8} className={classes.details} > 

                <Grid item sm={12} md={12}>
                  <Typography variant="title"> 
                    <img className={classes.img} src={profileimg} alt="user"/>
                    Admin
                  </Typography>
                </Grid>
                <Grid item sm={12} md={12} id={complaint.id} className={classes.messageContainer}>
                {chatState.chat.map((messages,i)=>{
                    return (
                        
                      <Grid container key={i}  spacing={8}> 
                     <Grid item sm={6} md={6}>
                      {messages.userid !== this.props.user.uid ?
                        <div>
                        <Typography className={classes.messages} variant="body1" >
                          {messages.message}
                        </Typography>
                        <Typography className={classes.timeStamp} variant="body1" align="right"> 
                          <small>{this.dateFormate(messages.createdAt)}</small>
                        </Typography>
                        </div>
                        : <Typography variant="body1" className={classes.emptymessage} > 
                          
                        </Typography> }
                      </Grid>
                   <Grid item sm={6} md={6}>
                   {messages.userid === this.props.user.uid ?
                        <div>
                        <Typography className={classes.mymessage} variant="body1" > 
                          {messages.message}
                        </Typography>
                        <Typography className={classes.timeStamp} variant="body1" align="right"> 
                          <small>{this.dateFormate(messages.createdAt)}</small>
                        </Typography>
                        </div>
                        : <Typography variant="body1" className={classes.emptymessage} > 
                          
                        </Typography> }
                   </Grid>
                 
                         </Grid>

                )
                })}
                 <div
                 ref="mydiv">
                 </div>
                </Grid>
                
                <Grid item sm={12} md={12}>
                <form onSubmit={(event)=>{
                  event.preventDefault();
                 this.sendMessage(complaint.id)}}>
                  <textarea
                  onChange={(event)=>this.setState({message:event.target.value})}
                  className={classes.textarea} 
                  cols="5" rows="2"
                  onKeyPress={(event)=>{
                    if((event.keyCode || event.charCode) === 13) this.sendMessage(complaint.id)}}
                  placeholder="Enter your message here!"
                  value={this.state.message}
                  >
                  </textarea>
                  <button className={classes.sendbtn} atype="submit"><Icon className={classes.sendicon}>send</Icon></button>
                 
                </form>
                </Grid>
              </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>

          </div>
        )
    }
}

ChatArea.propTypes = {
    classes: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    user:state.userState.user,
    chatState:state.chatReducer,
    })
  
  export default compose(withStyles(styles), connect(mapStateToProps, {
    startGetUser,
    startAddNewMessage,
    updateComplaintStatus,
    startGetMessage,}))(ChatArea);
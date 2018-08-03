import React, {Component} from 'react';
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
import profileimg from '../../../images/profile.jpg';
import {startAddNewMessage, startGetMessage} from '../../../actions/chatActions';
import {updateComplaintStatus} from '../../../actions/adminAction';
import MessageShow from './MessageShow';
import Icon from '@material-ui/core/Icon';
import ReactDOM from 'react-dom';

const styles = theme => ({
  img: {
    paddingRight: 5
  },
  details: {
    backgroundColor: 'antiquewhite',
    borderRadius: 5
  },
  textarea: {
    backgroundColor: 'white',
    marginTop: 20,
    width: '80vw'
  },
  progress: {
    marginTop: 80
  },
  messageContainer: {
    maxHeight: 300,
    overflow: 'auto'
  },

  sendbtn: {
    backgroundColor: 'transparent',
    border: 'none'
  },
  sendicon: {
    marginBottom: 2,
    fontSize: 40,
    color: '#4080FF'
  },
  topBar:{
    backgroundColor:'peachpuff'
  }
  
});

class ChatArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      expanded: null
      
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.statusHandler = this.statusHandler.bind(this);
  }
 statusHandler(event,complaint_id){
  this.props.updateComplaintStatus(complaint_id,event.target.value);
 }
  
componentDidUpdate(){
  this.scrollToBottom(this.props.complaint.id);
}

  sendMessage(complinat_id) {
   if(this.state.message !==''){
    var message = {
      userid: this.props.admin.uid,
      message: this.state.message
    }
    this.props.startAddNewMessage(complinat_id, message);
    this.setState({message: ''});
  }
  else{
    this.setState({message: ''});
    alert('please enter some message! and try again');
  }
  }

  handleChange = complaintid => (event, expanded) => {
    if(event.target.classList.contains("selectlist")){
      return null;
    }else{
    this.props.startGetMessage(complaintid);
    this.setState({
      expanded: expanded
        ? complaintid
        : false
    });
  
  }
  }

  scrollToBottom = (id) => {
     
     const element = document.getElementById(id);
     const scrollHeight = element.scrollHeight;
     const height = element.clientHeight;
     const maxScrollTop = scrollHeight - height;   
     ReactDOM.findDOMNode(element).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  

  render() {
  
    
    const {classes, chatState, complaint} = this.props;
    const {expanded} = this.state;
    return (
      <div>
        <ExpansionPanel
          expanded={expanded === complaint.id}
          onChange={this.handleChange(complaint.id)}>
          <ExpansionPanelSummary expandIcon={< ExpandMoreIcon />}>
            <Grid container spacing={8}>
              <Grid item sm={1} md={1}>
                <Typography variant="body1">
                  {complaint.comlaintid}
                </Typography>
              </Grid>
              <Grid item sm={1} md={1}>
                <Typography variant="body1">
                  {complaint.requester_name}
                </Typography>
              </Grid>
              <Grid item sm={2} md={2}>
                <Typography variant="body1" align="center">
                  {complaint.brach_name}
                </Typography>
              </Grid>
              <Grid item sm={3} md={3}>
                <Typography variant="body1" align="center">
                  {complaint.complaint_discription}
                </Typography>
              </Grid>
              <Grid item sm={1} md={1} align="center">
                <Typography variant="body1">
                  {complaint.priority_level}
                </Typography>
              </Grid>
              <Grid item sm={2} md={2}>
                <Typography variant="body1" align="center">
                  {complaint.special_request}
                </Typography>
              </Grid>
              <Grid item sm={1} md={1}>
                <Typography variant="body1" align="center">
                <select className="selectlist" onChange={(e)=>this.statusHandler(e,complaint.id)}>
                <option  disabled selected>{complaint.complaint_status}</option>
                  <option value="pending">pending</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Rejected">Rejected</option>
                </select>
                </Typography>
              </Grid>
              <Grid item sm={1} md={1}>
                <Typography variant="body1" align="center">
                  {complaint.date_time}
                </Typography>
              </Grid>

            </Grid>

          </ExpansionPanelSummary>
          <ExpansionPanelDetails >
            <Grid container spacing={8} className={classes.details}>

              <Grid item sm={12} md={12} className={classes.topBar}>
                <Typography variant="title">
                  <img className={classes.img} src={profileimg} alt="user"/> {complaint.requester_name}
                </Typography>
              </Grid>

              <Grid item sm={12} md={12} id={complaint.id} className={classes.messageContainer}>
                {chatState
                  .chat
                  .map((messages,i) => {
                    console.log(i);
                    return (
                     <MessageShow key={i} messages={messages} admin={this.props.admin} />
                    )
                  })}
        
              </Grid>

              <Grid item sm={12} md={12}>
              <form onSubmit={(event)=>{
                  event.preventDefault();
                 this.sendMessage(complaint.id)}}>
                <textarea
                  onChange={(e) => this.setState({message: e.target.value})}
                  onKeyPress={(event) => {
                  if ((event.keyCode || event.charCode) === 13) 
                    this.sendMessage(complaint.id)
                }}
                  className={classes.textarea}
                  cols="30"
                  rows="2"
                  value={this.state.message}
                  placeholder="Enter your message here!"
                  ></textarea>
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
const mapStateToProps = state => (
  {admin: state.userState.user,
  chatState: state.chatReducer})

export default compose(withStyles(styles), connect(mapStateToProps, {startAddNewMessage, startGetMessage,updateComplaintStatus}))(ChatArea);
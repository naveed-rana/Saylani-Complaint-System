import TablePaginationActionsWrapped from './TablePagination';
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {startGetRequesterComplaints} from '../../../actions/adminAction';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import ProgressCircle from '../../ProgressCircle';
import {startGetUser} from '../../../actions';
import ChatArea from './chat';
import BranchName from './getBranchNames';

const styles = theme => ({
  root: {
    marginTop: 1,
    textAlign: 'left'
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  paper: {
    padding: 15,
    borderRadius: '0'
  },
  paper1: {
    marginBottom:10,
    padding: 15,
    borderRadius: '0'
  },
  fixdWidth:{
    width:'90vw',
    overflowX: 'auto'
  },
  messageshow:{
    marginTop:20,
    padding:30
  }

});

class AdminHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      copyData:[],
      branches:[],      
      page: 0,
      rowsPerPage: 5,

    };
  }

  componentDidMount() {
    this
      .props
      .startGetRequesterComplaints();
      this.props.startGetUser();
  }
  componentWillReceiveProps(nextProps) {
    var branches = [];
   nextProps.allcomplaints.forEach(item => {
	if(branches.indexOf(item.brach_name) === -1){
		branches.push(item.brach_name);
	}
});

    this.setState({data:nextProps.allcomplaints,
                  copyData:nextProps.allcomplaints,
                branches})
  }
  
  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
  };

 


  filterHandler = () =>{
     const priority = this.refs.priorityRef.value;
     const status = this.refs.statusRef.value;
     const branch = this.refs.branchRef.value;
     
     
     console.log(branch);
     console.log(status);
     console.log(priority);
     const {copyData} = this.state;

     if(priority === 'nill' && status === 'nill' && branch === 'nill'){
       
        this.setState({data:copyData});
     }
     else if (priority === 'nill' && status === 'nill'){
      const result = copyData.filter(complaint => complaint.brach_name === branch);
      this.setState({data:result});
     }
     else if (priority === 'nill' && branch === 'nill'){
      const result = copyData.filter(complaint => complaint.complaint_status === status);
      this.setState({data:result});
     }
     else if (status === 'nill' && branch === 'nill'){
      const result = copyData.filter(complaint => complaint.priority_level === priority);
      this.setState({data:result});
     }
     else if (priority === 'nill'){
      const result = copyData.filter(complaint => complaint.complaint_status === status && complaint.brach_name === branch);
      this.setState({data:result});
     }
     else if (status === 'nill'){
      const result = copyData.filter(complaint => complaint.priority_level === priority && complaint.brach_name === branch);
      this.setState({data:result});
     }
     else if (branch === 'nill'){
      const result = copyData.filter(complaint => complaint.complaint_status === status && complaint.priority_level === priority);
      this.setState({data:result});
     }
    else{
      const result = copyData.filter(complaint => complaint.priority_level === priority && complaint.brach_name === branch && complaint.complaint_status === status);
      this.setState({data:result});
    }
   
  }


  render() {

    const {classes, flag} = this.props;
    const {data, rowsPerPage, page} = this.state;

    return (
      
      <div className={classes.fixdWidth}>
       <Paper className={classes.paper1} elevation={5}>
                        <Typography variant="title">
                            Complaints Portal
                        </Typography>
                    </Paper>
        <Paper className={classes.paper} elevation={1}>
          <Grid container spacing={8}>
            <Grid item sm={1} md={1}>
              <Typography variant="body2">
                Complaint No.
              </Typography>
            </Grid>
            <Grid item sm={1} md={1} align="center">
              <Typography variant="body2">
                Requester
              </Typography>
            </Grid>
            <Grid item sm={2} md={2} align="center">
              <Typography variant="body2">
                <select ref="branchRef" className="selectlist filters" onChange={()=>this.filterHandler()}>
                <option value="nill" selected disabled>Branch Name</option>
                  <option value="nill">All Branches</option>
                  {this.state.branches.map((complaint,i)=>{
                    return(
                      <BranchName key={i} name={complaint} />
                    )
                  })}
                </select>
              </Typography>
            </Grid>
            <Grid item sm={3} md={3}>
              <Typography variant="body2" align="center">
                Complaint Discription
              </Typography>
            </Grid>
            <Grid item sm={1} md={1}>
              <Typography variant="body2" align="center">
                <select ref="priorityRef" className="selectlist filters1" onChange={()=>this.filterHandler()}>
                 <option value="nill" selected disabled>Priority Level</option>
                  <option value="nill">All Priorities</option>
                  <option value="High">Priority High</option>
                  <option value="Medium">Priority Medium</option>
                  <option value="Low">Priority Low</option>
                </select>
              </Typography>
            </Grid>
            <Grid item sm={2} md={2}>
              <Typography variant="body2" >
                Special Request
              </Typography>
            </Grid>
            <Grid item sm={1} md={1}>
              <Typography variant="body2" >
              <select ref="statusRef" className="selectlist filters1" onChange={()=>this.filterHandler()}>
              <option value="nill" selected disabled>Status</option>
                  <option value="nill">All Status</option>
                  <option value="pending">pending</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </Typography>
            </Grid>
            <Grid item sm={1} md={1} align="center">
              <Typography variant="body2">
                Created At
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <div className={classes.root}>
          {flag
            ? data.length>0 ?
              data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((complaint,i) => {
                return (
               <ChatArea key={i} complaint={complaint} />
                );
              })
              :
              <Grid container spacing={8}> 
                <Grid item sm={12} md={12}>
                <Typography className={classes.messageshow} variant="display2" align='center'>
                No Complaint Yet!....
               </Typography>
                </Grid>
              </Grid>
              
            : 
            <ProgressCircle />}
          <Table>

            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={7}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}/>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

      </div>
    );
  }
}

AdminHome.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  allcomplaints: state.adminReducer.complaints,
  flag: state.adminReducer.complaintFlag,
  admin:state.userState.user
  })

export default compose(withStyles(styles), connect(mapStateToProps, {startGetRequesterComplaints,
  startGetUser,
}))(AdminHome);

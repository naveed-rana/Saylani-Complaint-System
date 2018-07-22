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
  fixdWidth:{
    minWidth:900,
    overflowX: 'auto'
  }

});

class AdminHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
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
    this.setState({data:nextProps.allcomplaints})
  }
  
  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
  };


  render() {

    const {classes, flag} = this.props;
    const {data, rowsPerPage, page} = this.state;
    var no = 0;

    return (
      <div className={classes.fixdWidth}>

        <Paper className={classes.paper} elevation={1}>
          <Grid container spacing={8}>
            <Grid item sm={1} md={1}>
              <Typography variant="body2">
                No.
              </Typography>
            </Grid>
            <Grid item sm={2} md={2}>
              <Typography variant="body2">
                Requester
              </Typography>
            </Grid>
            <Grid item sm={3} md={3}>
              <Typography variant="body2">
                Complaint Discription
              </Typography>
            </Grid>
            <Grid item sm={1} md={1}>
              <Typography variant="body2" align="center">
                Priority Level
              </Typography>
            </Grid>
            <Grid item sm={2} md={2}>
              <Typography variant="body2" align="center">
                Special Request
              </Typography>
            </Grid>
            <Grid item sm={2} md={2}>
              <Typography variant="body2">
                Status
              </Typography>
            </Grid>
            <Grid item sm={1} md={1}>
              <Typography variant="body2">
                Created At
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <div className={classes.root}>
          {flag
            ? data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(complaint => {
                no++;
                return (
               <ChatArea key={complaint.id} complaint={complaint} no={no} />
                );
              })
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

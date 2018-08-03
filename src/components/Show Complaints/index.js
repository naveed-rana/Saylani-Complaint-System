import TablePaginationActionsWrapped from '../admin/Home/TablePagination';
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import ProgressCircle from '../ProgressCircle';
import {startGetUser,startGetUserComplaints} from '../../actions';
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
  }


});

class ShowComplaints extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 10,
    };
  }

  componentDidMount() {

      this.props.startGetUserComplaints(this.props.user.uid);
  }

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
  };
     
  render() {
    const {classes,flag} = this.props;
    const { rowsPerPage, page} = this.state;

    return (
      <div >

        <Paper className={classes.paper} elevation={1}>
          <Grid container spacing={8}>
            <Grid item sm={1} md={1}>
              <Typography variant="body2">
                Complaint No.
              </Typography>
            </Grid>
            <Grid item sm={2} md={2}>
              <Typography variant="body2">
                City Incharge
              </Typography>
            </Grid>
            <Grid item sm={2} md={2}>
              <Typography variant="body2">
                Branch Incharge
              </Typography>
            </Grid>
            <Grid item sm={3} md={3}>
              <Typography variant="body2" align="center">
                Complaint Discription
              </Typography>
            </Grid>
            <Grid item sm={2} md={2}>
              <Typography variant="body2">
                Complaint Status
              </Typography>
            </Grid>
            <Grid item sm={2} md={2}>
              <Typography variant="body2">
                Created At
              </Typography>
            </Grid>

          </Grid>
        </Paper>

        <div className={classes.root}>
          {flag
            ? this.props.myComplaints
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((complaint,i) => {
                return (
                  <ChatArea key={i} complaint={complaint} />
                );
              })
            : 
            <ProgressCircle />}
          <Table>

            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={this.props.myComplaints.length}
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

ShowComplaints.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user:state.userState.user,
  flag:state.userComplaints.flag,
  myComplaints:state.userComplaints.complaints
  })

export default compose(withStyles(styles), connect(mapStateToProps, {
  startGetUser,
  startGetUserComplaints}))(ShowComplaints);

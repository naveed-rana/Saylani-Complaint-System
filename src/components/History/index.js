import TablePaginationActionsWrapped from '../admin/Home/TablePagination';
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {startGetUserComplaintsHistory} from '../../actions';

const styles = theme => ({
    root: {
        width: '82vw',
        textAlign: 'left'
    },
    table: {
        minWidth: 500
    },
    tableWrapper: {
        overflowX: 'auto'
    },
  
});

class History extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 5
        };
    }

    componentDidMount() {
        console.log('=================props===================');
        console.log(this.props);
        console.log('====================================');
        this.props.startGetUserComplaintsHistory(this.props.uid);
    }


    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    render() {
        const {classes,historyFlag,historyComlaint} = this.props;
        const {rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, historyComlaint.length - page * rowsPerPage);
        var no = 0;
        return (
             
            <div>
                
                 
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className="">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No.</TableCell>
                                    <TableCell >City Incharge</TableCell>
                                    <TableCell >Branch Incharge</TableCell>
                                    <TableCell >Complaint Discription</TableCell>
                                    <TableCell >Complaint Status</TableCell>
                                    <TableCell >Created At</TableCell>
                                    {/* <TableCell >DeleteAll</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {historyFlag ?
                                historyComlaint.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((complaint,i) => {
                                        no++
                                        return (
                                            <TableRow key={i}>
                                                <TableCell component="th" scope="row">
                                                   {no}
                                                </TableCell>
                                                <TableCell >{complaint.city_incharge}</TableCell>
                                                <TableCell>{complaint.brach_incharge}</TableCell>
                                                <TableCell >{complaint.complaint_discription}</TableCell>
                                                <TableCell >{complaint.complaint_status}</TableCell>
                                                <TableCell >{complaint.date_time}</TableCell>
                                            </TableRow>
                                        );
                                    })
                               : emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                        height: 48 * emptyRows
                                    }}>
                                        <TableCell colSpan={5} >loading...</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        colSpan={6}
                                        count={historyComlaint.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActionsWrapped}/>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </Paper>
              
            </div>
        );
    }
}

History.propTypes = {
    classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    uid:state.userState.user.uid,
    historyFlag:state.userComplaints.historyFlag,
    historyComlaint:state.userComplaints.historyComlaint
})

export default compose(withStyles(styles), connect(mapStateToProps, {startGetUserComplaintsHistory}))(History);

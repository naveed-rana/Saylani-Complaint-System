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
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {startGetUserComplaintsHistory} from '../../actions';
var jsPDF = require('jspdf');
require('jspdf-autotable');

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
        this.props.startGetUserComplaintsHistory(this.props.uid);
    }


    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    createJsPDF = (data,page,rowsPerPage) =>{
        data = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        
        var columns = [
            { title: "Branch Incharge", dataKey: "brach_incharge" },
            { title: "Branch Name", dataKey:"brach_name" },
            { title: "Complaint Discription", dataKey:"complaint_discription" },
            { title: "Special Request", dataKey:"special_request" },
            { title: "Complaint Status", dataKey:"complaint_status" },
            { title: "Dated", dataKey:"date_time" },
         ];

        var rows = data;
        var doc = new jsPDF('p', 'pt');
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.setFontStyle('normal');
        doc.text("List of my resolved and rejected complaints", 10, 50);
        doc.autoTable(columns, rows, {
          startY: 70,
          margin: { horizontal: 10 },
          styles: { overflow: 'linebreak' },
          bodyStyles: { valign: 'top' },
          columnStyles: { brach_incharge: { columnWidth: 70 },
          brach_name: { columnWidth: 70 },
          complaint_discription: { columnWidth: 180},
          special_request: { columnWidth: 120 },
          complaint_status: { columnWidth: 70 },
          date_time: { columnWidth: 70 } } ,
          theme: "striped"
        });
        doc.save('complaints2.pdf');
    }

    render() {
        const {classes,historyFlag,historyComlaint} = this.props;
        const {rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, historyComlaint.length - page * rowsPerPage);
        return (
             
            <div>
                
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                      
                        <Table className="">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Complaint No.</TableCell>
                                    <TableCell >City Incharge</TableCell>
                                    <TableCell >Branch Incharge</TableCell>
                                    <TableCell >Complaint Discription</TableCell>
                                    <TableCell >Complaint Status</TableCell>
                                    <TableCell className="textRight">Created At 

                                        <br/><b><a onClick={()=>this.createJsPDF(historyComlaint,page,rowsPerPage)} >Download PDF</a></b>
                                    </TableCell>
                                    {/* <TableCell >DeleteAll</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                
                            {historyFlag ?
                                historyComlaint.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((complaint,i) => {
                                        return (
                                            <TableRow key={i}>
                                                <TableCell component="th" scope="row">
                                                   {complaint.comlaintid}
                                                </TableCell>
                                                <TableCell >{complaint.city_incharge}</TableCell>
                                                <TableCell>{complaint.brach_incharge}</TableCell>
                                                <TableCell >{complaint.complaint_discription}</TableCell>
                                                <TableCell >{complaint.complaint_status}</TableCell>
                                                <TableCell>
                                                {complaint.date_time}</TableCell>
                        
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
                                        rowsPerPageOptions={[5,10,25,100,500]}
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

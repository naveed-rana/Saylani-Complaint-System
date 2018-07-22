import React, { Component } from 'react'

export default class AdminFooter extends Component {
   
    render() {
        return (
            <div className="center-align footer-pad footer-color">
            <span>
               <Childcomponent />
               <a href="#">Admin @ Saylani Complaint System</a>
           </span>
           </div>
        )
    }
}


export default class Childcomponent extends Component {
    render() {
        return (
            <div>
                Childcomponent
            </div>
        )
    }
}







import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePaginationActionsWrapped from './TablePagination';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import {compose} from 'recompose';
import {startGetRequesterComplaints} from '../../../actions/adminAction';

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}


const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  paper:{
      padding:20
  }
});

class AdminHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 5,
      data: [
        createData('Cupcake', 305, 3.7),
        createData('Donut', 452, 25.0),
        createData('Eclair', 262, 16.0),
        createData('Frozen yoghurt', 159, 6.0),
        createData('Gingerbread', 356, 16.0),
        createData('Honeycomb', 408, 3.2),
        createData('Ice cream sandwich', 237, 9.0),
        createData('Jelly Bean', 375, 0.0),
        createData('KitKat', 518, 26.0),
        createData('Lollipop', 392, 0.2),
        createData('Marshmallow', 318, 0),
        createData('Nougat', 360, 19.0),
        createData('Oreo', 437, 18.0),
      ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
    };
  }

   
  
  componentDidMount() {
    this.props.startGetRequesterComplaints();
     
  }
  

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rowsPerPage, page,data } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    
    return (
        <Grid  container spacing={8}> 
        <Grid item sm={12} md={12}>
        <Paper className="" elevation={1} className={classes.paper}>
        <Typography variant="title" > 
         Recent Complaints
       </Typography>
      </Paper>
        </Grid>
      <Grid item sm={12} md={12}>
      
      <Paper className={classes.root} >
        <div className={classes.tableWrapper}>
          <Table>
          <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell numeric>Requester</TableCell>
            <TableCell numeric>Branch Incharge</TableCell>
            <TableCell numeric>City Incharge</TableCell>
            <TableCell numeric>Complaint Discription</TableCell>
            <TableCell numeric>Priority Level</TableCell>
            <TableCell numeric>Special Request</TableCell>
            <TableCell numeric>Date</TableCell>
          </TableRow>
        </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(complaint => {
                return (
                  <TableRow key={complaint.uid}>
                    <TableCell numeric>1</TableCell>
                    <TableCell numeric>{complaint.requester}</TableCell>
                    <TableCell numeric>{complaint.city_incharge}</TableCell>
                    <TableCell numeric>{complaint.complaint_discription}</TableCell>
                    <TableCell numeric>{complaint.prority_level}</TableCell>
                    <TableCell numeric>{complaint.special_request}</TableCell>
                    <TableCell numeric>{complaint.date_time}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
        
      </Grid>
      </Grid>
    );
  }
}

AdminHome.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
            allcomplaints:state.adminReducer.complaints
})

export default compose(withStyles(styles),connect(mapStateToProps,{startGetRequesterComplaints}))(AdminHome);








import TablePaginationActionsWrapped from '../Home/TablePagination';
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
import {startGetManagers} from '../../../actions/newManager';

const styles = theme => ({
    root: {
        width: '90vw',
        marginTop: theme.spacing.unit * 3,
        textAlign: 'left'
    },
    table: {
        minWidth: 500
    },
    tableWrapper: {
        overflowX: 'auto'
    },
    paper:{
        padding:15,
        width:'90vw'
    }
});

class Mangers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 5
        };
    }

    componentDidMount() {
        this.props.startGetManagers();
    }

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    render() {
        const {classes,flag,managers} = this.props;
        const {rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, managers.length - page * rowsPerPage);
        var no = 0;
        console.log(managers);
        
        return (
             
            <div>
                
                    <Paper className={classes.paper} elevation={1}>
                        <Typography variant="title">
                            Managers
                        </Typography>
                    </Paper>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className="">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No.</TableCell>
                                    <TableCell >Branch Incharge</TableCell>
                                    <TableCell >Branch Name</TableCell>
                                    <TableCell >Branch Code</TableCell>
                                    <TableCell >Branch Email</TableCell>
                                    <TableCell >Account Created!</TableCell>
                                    {/* <TableCell >DeleteAll</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {flag ?
                                managers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(manager => {
                                        no++
                                        return (
                                            <TableRow key={manager.email}>
                                                <TableCell component="th" scope="row">
                                                   {no}
                                                </TableCell>
                                                <TableCell >{manager.username}</TableCell>
                                                <TableCell>{manager.branch_name}</TableCell>
                                                <TableCell >{manager.branch_code}</TableCell>
                                                <TableCell >{manager.email}</TableCell>
                                                <TableCell >{manager.dated}</TableCell>
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
                                        count={managers.length}
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

Mangers.propTypes = {
    classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    managers: state.adminReducer.managers,
    flag:state.adminReducer.managersFlag,
})

export default compose(withStyles(styles), connect(mapStateToProps, {startGetManagers}))(Mangers);

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {connect} from 'react-redux';
import {startGetNewManager,messageClear} from '../../../actions/newManager';
import {compose} from 'recompose';
import {toast} from 'react-toastify';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit
    },
    paper: {
        width: '90vw',
        padding: 20,
        paddingRight: 80,
        textAlign: 'center'
    },

    button: {
        marginTop: 30
    },

    rightIcon: {
        marginLeft: theme.spacing.unit
    },
    error_message:{
        paddingTop:15,
        color:'#D32F2F'
    }
});

const updateByPropertyName = (propertyName, value) => () => ({[propertyName]: value});

class AddManager extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            branch_manager: '',
            manager_email: '',
            manager_password: '',
            branch_name: '',
            branch_code: '',
            confirmPassowrd:'',
            error:'',
            loading:false
        }
        this.onSubmit = this.onSubmit.bind(this);
    
    }
  componentWillReceiveProps(nextProps) {
    this.setState({loading:false});
    if(nextProps.errormessage!==''){
    toast.error(nextProps.errormessage);
    this.props.messageClear();
    }
    if(nextProps.addmanagerFlag){
        toast.success("Successfully Submitted!");
        this.setState({
            branch_manager: '',
            manager_email: '',
            manager_password: '',
            branch_name: '',
            branch_code: '',
            confirmPassowrd:''
        });
        this.props.messageClear();
    }

  }
    onSubmit = event => {
        event.preventDefault();
        const {manager_password,confirmPassowrd} = this.state;
        if(manager_password!==confirmPassowrd){
          this.setState({
              confirmPassowrd:'',
              manager_password:'',
              error:'The password and Confirm password does not same!'});
        }
        else if(manager_password.length < 8){
            this.setState({
                confirmPassowrd:'',
                manager_password:'',
                error:"The password must be a string with at least 8 characters"
            });
        }

        else{
        this.setState({error:'',
        loading:true});
        var currentdate = new Date(); 
        var datetime =   currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
         
        var new_manager = {
                            username: this.state.branch_manager,
                            email: this.state.manager_email,
                            manager_password:this.state.manager_password,
                            branch_name: this.state.branch_name,
                            branch_code: this.state.branch_code,
                            dated:datetime
                }
                
        this.props.startGetNewManager(new_manager);
    }}

    render() {
        const {classes} = this.props;
        const {branch_manager,manager_email,manager_password,branch_name,branch_code,confirmPassowrd,error,loading} = this.state;
        const isValid = branch_code==='' || branch_name==='' || manager_email===''|| manager_password===''|| branch_manager===''||confirmPassowrd===''|| loading;
        
        return (
            <div id="form">
                <Paper className={classes.paper} elevation={14}>
                     <Grid item sm={12} md={12}>
                        <Typography variant="title">
                            Add Manager
                        </Typography>
                    </Grid>
                    <form onSubmit={this.onSubmit}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid
                                item
                                style={{
                                textAlign: 'right'
                            }}
                                md={1}>
                                <AccountCircle/>
                            </Grid>
                            <Grid item md={11}>
                                <TextField
                                    fullWidth={true}
                                    id="input-with-icon-grid6"
                                    value = {branch_manager}
                                    onChange={event => this.setState(updateByPropertyName('branch_Incharge', event.target.value))}
                                    label="Branch Incharge"
                                    required={true}/>
                            </Grid>
                        </Grid>

                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid
                                item
                                style={{
                                textAlign: 'right'
                            }}
                                md={1}>
                                <Icon>email</Icon>
                            </Grid>
                            <Grid item md={11}>
                                <TextField
                                    onChange={event => this.setState(updateByPropertyName('manager_email', event.target.value))}
                                    type="email"
                                    value={manager_email}
                                    fullWidth={true}
                                    id="input-with-icon-grid5"
                                    label="Branch Email"
                                    required={true}/>
                            </Grid>
                        </Grid>

                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid
                                item
                                style={{
                                textAlign: 'right'
                            }}
                                md={1}>
                                <Icon>lock</Icon>
                            </Grid>
                            <Grid item md={11}>
                                <TextField
                                    onChange={event => this.setState(updateByPropertyName('manager_password', event.target.value))}
                                    type="password"
                                    fullWidth={true}
                                    value={manager_password}
                                    id="input-with-icon-grid4"
                                    label="Manager Password"
                                    required={true}/>
                            </Grid>
                        </Grid>

                         <Grid container spacing={8} alignItems="flex-end">
                            <Grid
                                item
                                style={{
                                textAlign: 'right'
                            }}
                                md={1}>
                                <Icon>lock</Icon>
                            </Grid>
                            <Grid item md={11}>
                                <TextField
                                    onChange={event => this.setState(updateByPropertyName('confirmPassowrd', event.target.value))}
                                    type="password"
                                    value={confirmPassowrd}
                                    fullWidth={true}
                                    id="input-with-icon-grid3"
                                    label="Confirm Password"
                                    required={true}/>
                            </Grid>
                        </Grid>

                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid
                                item
                                style={{
                                textAlign: 'right'
                            }}
                                md={1}>
                                <Icon>place</Icon>
                            </Grid>
                            <Grid item md={11}>
                                <TextField
                                    onChange={event => this.setState(updateByPropertyName('branch_name', event.target.value))}
                                    fullWidth={true}
                                    id="input-with-icon-grid2"
                                    label="Branch Name"
                                    value={branch_name}
                                    required={true}/>
                            </Grid>
                        </Grid>

                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid
                                item
                                style={{
                                textAlign: 'right'
                            }}
                                md={1}>
                                <Icon>code</Icon>
                            </Grid>
                            <Grid item md={11}>
                                <TextField
                                    onChange={event => this.setState(updateByPropertyName('branch_code', event.target.value))}
                                    fullWidth={true}
                                    id="input-with-icon-grid1"
                                    required={true}
                                    value={branch_code}
                                    label="Branch Code"/>
                            </Grid>
                        </Grid>

                        <Grid item sm={12} md={12}>
                          <Typography variant="title" className={classes.error_message} align="center"> 
                            {error}
                          </Typography>
                            <Button
                                disabled={isValid}
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}>
                               {loading ?"laoding...":"submit"}
                                <Icon className={classes.rightIcon}>send</Icon>
                            </Button>
                        </Grid>
                    </form>
                </Paper>
            </div>
        );
    }
}

AddManager.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
    errormessage:state.adminReducer.managersError,
    addmanagerFlag:state.adminReducer.addmanagerFlag

}) 


export default compose(withStyles(styles),connect(mapStateToProps, {startGetNewManager,messageClear}))(AddManager);
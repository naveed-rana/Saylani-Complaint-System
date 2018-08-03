import React, {Component} from 'react';
import {connect} from 'react-redux';
import {startAddComplaint, clearFlag,startGetComplaintId} from '../../actions/index';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import Loader from '../ProgressCircle';

const updateByPropertyName = (propertyName, value) => () => ({[propertyName]: value});

class NewComplaint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city_incharge: '',
            brach_incharge: '',
            brach_name: '',
            complaint_discription: '',
            priority_level: '',
            loading: false,
        }
        this.onSubmit = this
            .onSubmit
            .bind(this);
    }

    componentDidMount() {
        this.props.startGetComplaintId();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({loading: false});
  
        if (nextProps.flag) {
            toast.success("Your Complaint Successfully added!");
            this
                .props
                .clearFlag();
            this.setState({
                city_incharge: '',
                brach_incharge: '',
                brach_name: '',
                complaint_discription: '',
                priority_level: '',
                loading: false
            })
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var uid = this.props.complaintId + 1;
        var new_complaint = {
            comlaintid:uid,
            requester: this.props.user.uid,
            city_incharge: this.state.city_incharge,
            brach_incharge: this.state.brach_incharge,
            brach_name: this.state.brach_name,
            complaint_discription: this.state.complaint_discription,
            special_request: this.refs.special_request.value,
            priority_level: this.state.priority_level,
            date_time: datetime,
            requester_name: this.props.user.username,
            complaint_status: "pending"
        }

        this
            .props
            .startAddComplaint(new_complaint, this.props);

    }

    render() {
        const {
            city_incharge,
            brach_incharge,
            brach_name,
            complaint_discription,
            priority_level,
            loading,
        } = this.state;
        const isValid = city_incharge === '' || brach_name === '' || brach_incharge === '' || complaint_discription === '' || priority_level === '' || loading;
        var complaintid =this.props.complaintId+1;
        return (
            <div>
                <div className="row">
                    <div className="col s12 m12">
                        <div className="z-depth-5 card white darken-1">
                            <div className="card-content black-text">
                                <span className="card-title">Request a New Complaint</span>
                                <div className="row pad">
                                {this.props.complaintId>=0?
                                    <form onSubmit={this.onSubmit}>
                                        <div className="col s12">
                                            <div className="row">

                                                <div className="input-field col s12 m6">

                                                    <span className="helper-text labels" data-error="wrong" data-success="right">Complaint ID</span>
                                                    <input
                                                
                                                        value={complaintid}
                                                        readOnly
                                                        type="text"
                                                        id="autocomplete-input343"
                                                        className="autocomplete"/>

                                                </div>
                                                <div className="input-field col s12 m6">

                                                    <span className="helper-text labels" data-error="wrong" data-success="right">Branch Name</span>
                                                    <input
                                                        value={brach_name}
                                                        type="text"
                                                        id="autocomplete-input34"
                                                        required
                                                        onChange={event => this.setState(updateByPropertyName('brach_name', event.target.value))}
                                                        className="autocomplete"/>

                                                </div>
                                            </div>
                                            <div className="row">

                                                <div className="input-field col s12 m6">

                                                    <span className="helper-text labels" data-error="wrong" data-success="right">City Incharge</span>
                                                    <input
                                                        value={city_incharge}
                                                        type="text"
                                                        id="autocomplete-input"
                                                        required
                                                        onChange={event => this.setState(updateByPropertyName('city_incharge', event.target.value))}
                                                        className="autocomplete"/>

                                                </div>
                                                <div className="input-field col s12 m6">
                                                    <span className="helper-text labels" data-error="wrong" data-success="right">Branch Incharge</span>
                                                    <input
                                                        value={brach_incharge}
                                                        onChange={event => this.setState(updateByPropertyName('brach_incharge', event.target.value))}
                                                        type="text"
                                                        id="autocomplete-input"
                                                        required
                                                        className="autocomplete"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="input-field col s12 m12">
                                                <span className="helper-text labels" data-error="wrong" data-success="right">Complaint Description</span>
                                                <textarea
                                                    value={complaint_discription}
                                                    onChange={event => this.setState(updateByPropertyName('complaint_discription', event.target.value))}
                                                    required
                                                    cols="30"
                                                    rows="20"></textarea>
                                            </div>

                                        </div>
                                        <div className="row">

                                            <div className="input-field col s12 m12">
                                                <span className="helper-text labels" data-error="wrong" data-success="right">
                                                    Special Request
                                                </span>
                                                <textarea ref="special_request" cols="30" rows="10"></textarea>
                                            </div>

                                        </div>
                                        <div className="row">

                                            <div className="input-field col s12 m12">
                                                <span className="helper-text labels" data-error="wrong" data-success="right">
                                                    Complaint Prority
                                                </span>
                                                <select
                                                    onChange={event => this.setState(updateByPropertyName('priority_level', event.target.value))}
                                                    className="selectlist">
                                                    <option defaultValue="" disabled selected>select priority level</option>
                                                    <option defaultValue="L">Low</option>
                                                    <option defaultValue="M">Medium</option>
                                                    <option defaultValue="H">High</option>
                                                </select>
                                            </div>

                                        </div>
                                        <div className="row center-align">
                                            <button
                                                disabled={isValid}
                                                className="btn waves-effect waves-light"
                                                type="submit"
                                                name="action">
                                                {loading
                                                    ? "laoding..."
                                                    : "submit"}
                                                <i className="material-icons right">send</i>
                                            </button>
                                        </div>
                                    </form>
                                    :<Loader/>}
                                </div>
                              
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {

    return {user: state.userState.user,
         flag: state.userComplaints.addflag,
         complaintId:state.userComplaints.complaintId
        }
}

export default withRouter(connect(mapStateToProps, {startAddComplaint, clearFlag,startGetComplaintId})(NewComplaint));

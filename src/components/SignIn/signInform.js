import React, {Component} from 'react';
import {auth} from '../../firebase';
import { toast } from 'react-toastify';
import {connect} from 'react-redux';
import {startGetUser} from '../../actions';

const updateByPropertyName = (propertyName, value) => () => ({[propertyName]: value});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
      loading:false
    };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.userdata.user.email){
      toast.success("Successfully Login!");
      if (nextProps.userdata.user.admin) {
        this.setState({loading:false});
        this.props.history.push('/admin');
      }
      else{
        this.props.history.push('/home');
      }
    }
    
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({loading:true});
    const {email, password} = this.state;
    
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
    
        this.setState(() => ({
          ...INITIAL_STATE,
        }));
         this.props.startGetUser();
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
        this.setState({loading:false});
      });

    
  }

  render() {  
   
    const {email, password, error,loading} = this.state;
    const isInvalid = password === '' || email === '' || loading;
  
    return (
      <div className="signInbg">
      <div className="rgba">
      <div className="container center-align ">
        <div className="row margin ">
        <div className="col m2"></div>
          <div className="col s12 m8 ">
            <div className="card blue-grey darken-1 z-depth-4">
              <div className="card-content white-text">
                <span className="card-title">
                 Login</span>
                <form onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="col s12">
                      <div className="row">
                        <div className="input-field col s12">
                          <i className="material-icons prefix">account_box</i>
                          <input
                            value={email}
                            onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                            type="text"
                            id="autocomplete-input"
                            className="autocomplete"/>

                          <label htmlFor="autocomplete-input">Enter Email</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <div className="row">
                        <div className="input-field col s12">
                          <i className="material-icons prefix">lock</i>
                          <input
                            value={password}
                            onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
                            type="password"
                            id="autocomplete-inputs"
                            className="autocomplete"/>

                          <label htmlFor="autocomplete-input">Enter Password</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={isInvalid}
                    className="btn waves-effect waves-light"
                    type="submit"
                    name="action">{loading ? "loading..." :"Submit"}
                    <i className="material-icons right">send</i>
                  </button>

                  {error && <p>{error.message}</p>}
                </form>

              </div>
             
              
            </div>
          </div>
        </div>

      </div>
      </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
     
  return {
      userdata:state.userState
  }
}

export default connect(mapStateToProps,{startGetUser})(SignInForm);

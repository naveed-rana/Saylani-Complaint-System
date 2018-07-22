import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Footer from '../Footer';
import Navigation from '../Navigation';

import {auth, db} from '../../firebase';
import * as routes from '../../constants/routes';

const SignUpPage = ({history}) => <div>

  <SignUpForm history={history}/>
</div>

const updateByPropertyName = (propertyName, value) => () => ({[propertyName]: value});

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE
    };
  }

  onSubmit = (event) => {
    const {username, email, passwordOne} = this.state;
    const user = {
      email,
      username
    }
    const {history} = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        
        // Create a user in your own accessible Firebase Database too
        db
          .doCreateUser(authUser.user.uid,user)
          .then(() => {
            this.setState(() => ({
              ...INITIAL_STATE
            }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(updateByPropertyName('error', error));
          });

      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {username, email, passwordOne, passwordTwo, error} = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || username === '' || email === '';

    return (
      <div>
        <Navigation/>
        <div className="signInbg marginTopNonauth">
          <div className="rgba padding ">

            <div className="container center-align margin">
              <div className="row">
                <div className="col m2"></div>
                <div className="col s12 m8">
                  <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                      <span className="card-title">SignUp</span>

                      < form onSubmit={this.onSubmit}>

                        <div className="row">
                          <div className="col s12">
                            <div className="row">
                              <div className="input-field col s12">
                                <i className="material-icons prefix">account_box</i>
                                <input
                                  value={username}
                                  onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
                                  type="text"
      
                                  id="autocomplete-input1"
                                  className="autocomplete"/>

                                <label html="autocomplete-input">Enter Full Name</label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col s12">
                            <div className="row">
                              <div className="input-field col s12">
                                <i className="material-icons prefix">email</i>
                                <input
                                  value={email}
                                  onChange=
                                  { event => this.setState(updateByPropertyName('email', event.target.value)) }
                                  type="text"
                                  id="autocomplete-input2"
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
                                  value={passwordOne}
                                  onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
                                  type="password"
                                  id="autocomplete-input3"
                                  className="autocomplete"/>

                                <label htmlFor="autocomplete-input">Enter Password</label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col s12">
                            <div className="row">
                              <div className="input-field col s12">
                                <i className="material-icons prefix">confirmation_number</i>
                                <input
                                  value={passwordTwo}
                                  onChange=
                                  { event => this.setState(updateByPropertyName('passwordTwo', event.target.value)) }
                                  type="password"
                                  id="autocomplete-input4"
                                  className="autocomplete"/>

                                <label htmlFor="autocomplete-input">Confirm Password</label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          disabled={isInvalid}
                          className="btn waves-effect waves-light"
                          type="submit"
                          name="action">Submit
                          <i className="material-icons right">send</i>
                        </button>

                        {error && <p>{error.message}</p>
}
                      </form>

                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

const SignUpLink = () => <p>
  Don't have an account? {' '}
  <Link to={routes.SIGN_UP}>Sign Up</Link >
</p>
export default withRouter(SignUpPage);

export {SignUpForm, SignUpLink};
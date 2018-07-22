import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import Navigation from '../Navigation';
import Footer from '../Footer';

const PasswordForgetPage = () =>
  <div>
   <Navigation/>
    <PasswordForgetForm />
    <Footer/>
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (


      <div className="signInbg marginTopNonauth">
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
                            value={this.state.email}
                            onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                            type="text"
                            id="autocomplete-input"
                            className="autocomplete"/>

                          <label htmlFor="autocomplete-input">Enter Email</label>
                        </div>
                      </div>
                    </div>
                  </div>
               

                  <button
                    disabled={isInvalid}
                    className="btn waves-effect waves-light"
                    type="submit"
                    name="action">Reset My Password
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

const PasswordForgetLink = () =>
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};

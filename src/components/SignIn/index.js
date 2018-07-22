import React from 'react';
import {withRouter} from 'react-router-dom';
import {SignUpLink} from '../SignUp';
import {PasswordForgetLink} from '../PasswordForget';
import Footer from '../Footer';
import Navgation from '../Navigation';
import SignInForm from './signInform';

const SignInPage = ({history}) => <div>
  <Navgation/>
  <div className="center-align marginTopNonauth">
    <SignInForm history={history}/>
    <PasswordForgetLink/>
    <SignUpLink/>
  </div>
  <Footer/>
</div>

export default withRouter(SignInPage);

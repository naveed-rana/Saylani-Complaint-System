import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Admin from '../admin';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../../constants/routes';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import '../../css/index.css';
import '../../css/admin.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

const App = () =>
 <Router>
    
    <div>
    
        
    
        <Route exact path={routes.LANDING} component={() => <LandingPage/>}/>
        <Route exact path={routes.SIGN_UP} component={() => <SignUpPage/>}/>
        <Route exact path={routes.SIGN_IN} component={() => <SignInPage/>}/>
        <Route
            exact
            path={routes.PASSWORD_FORGET}
            component={() => <PasswordForgetPage/>}/>
        <Route exact path={routes.HOME} component={() => <HomePage/>}/>
        <Route exact path={routes.ADMIN} component={() => <Admin/>}/>
        <Route exact path={routes.DASHBOARD} component={() => <Admin/>}/>
        <Route exact path={routes.MANAGERS} component={() => <Admin />}/>
        <Route exact path={routes.NEWMANGER} component={() => <Admin />}/>
        <Route exact path={routes.REJECTEDHISTORY} component={() => <Admin />}/>
        <Route exact path={routes.RESOLVEDHISTORY} component={() => <Admin />}/>
        <Route exact path={routes.SHOW_COMPLAINTS} component={() => <HomePage />}/>
        <Route exact path={routes.ADD_COMPLAINT} component={() => <HomePage />}/>
        <Route exact path={routes.ACCOUNT} component={() => <HomePage />}/>
        <Route exact path={routes.HISTORY} component={() => <HomePage />}/>
                            <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                    />
    </div>
</Router>

export default withAuthentication(App);

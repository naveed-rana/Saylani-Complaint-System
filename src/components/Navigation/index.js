
import React from 'react';
import { connect } from 'react-redux';
import NavigationAuth from './authNavBar';
import {NavigationNonAuth} from './nonAuthNavBar';

const Navigation = ({ authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>


const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps,null)(Navigation);

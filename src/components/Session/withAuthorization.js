import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { firebase } from '../../firebase';
import * as routes from '../../constants/routes';
import {db} from '../../firebase';
import {startFlag} from '../../actions';

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authUser) {
          this.props.history.push(routes.SIGN_IN);
        }
        else{
         
          db.onceGetUser(authUser.uid).then((snapshot)=>{
            var userdata=snapshot.val();
          if(userdata.admin){
            this.props.history.push(routes.ADMIN);
          }
          else{
            this.props.history.push(routes.HOME);
          }
          this.props.startFlag({flagNetworkerror:false,flag:true});
            
        })
        .catch((err)=>{
          this.props.startFlag({flagNetworkerror:true,flag:true});
        });
        }
       
      
      });
    }

    render() {
      return this.props.authUser ? <Component /> : null;
    }
  }

  const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
  });

  return compose(
    withRouter,
    connect(mapStateToProps,{startFlag}),
  )(WithAuthorization);
}

export default withAuthorization;
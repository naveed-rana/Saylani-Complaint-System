import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import {auth} from '../../firebase';
import {connect} from 'react-redux';
import {unsetuser} from '../../actions';
class SignOutButton extends Component {
  
constructor(props) {
  super(props)
  this.onClickHandler = this.onClickHandler.bind(this);
}


  onClickHandler(){
    this.props.unsetuser();
    auth.doSignOut();
  }
  
  
  render() {
    return (
      <div>
        <Button color="inherit" type="button" onClick={
          this.onClickHandler
          }>
          Sign Out
        </Button>
      </div>
    )
  }
}
export default connect(null, {unsetuser})(SignOutButton);

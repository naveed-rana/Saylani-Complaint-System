import {GETUSER} from '../actions';
import {FLAG} from '../actions';
const INITIAL_STATE = {
  user: {},
  flag:false,
  flagNetworkerror:false
  
};

const applySetUser = (state, action) => { 

  return {
  ...state,
  user: action.user
}};

function userReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case  GETUSER: {
      
      return applySetUser(state, action);
    }

    case FLAG:{
     
      return {
        ...state,
        flag:action.flag
      }
    }
     case 'unset':{
       return {
         user:{}
       }
     }
    default : return state;
  }
}

export default userReducer;
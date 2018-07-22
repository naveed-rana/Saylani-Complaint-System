import {ADD_COMPLAINT,GET_USER_COMPLAINT,CLEARFLAG} from '../actions';
import {
  applySetComplaint,
  applyGetComplaint
} from './complaintReducerFuntions';



let INITIAL_STATE = {
complaints:[],
flag:false,
addflag:false

}


function complaintReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
      case ADD_COMPLAINT : {
        
        return applySetComplaint(state, action);

      }

      case GET_USER_COMPLAINT:{
          
        return applyGetComplaint(state,action);
      }
      case CLEARFLAG:{
        return{
          ...state,
          addflag:false
        }
      }
      
      default : return state;
    }
  }
  
  export default complaintReducer;
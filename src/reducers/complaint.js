import {ADD_COMPLAINT,GET_USER_COMPLAINT,CLEARFLAG,GETID,GETHISTORY} from '../actions';
import {
  applySetComplaint,
  applyGetComplaint
} from './complaintReducerFuntions';



let INITIAL_STATE = {
complaints:[],
flag:false,
addflag:false,
complaintId:-1,
historyComlaint:[],
historyFlag:false

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

      case GETID:{
        return {
          ...state,
          complaintId:action.complaintId
        }
      }
      case GETHISTORY:{
           return {
             ...state,
             historyFlag:true,
             historyComlaint:action.historycomplaints
           }
      }

      default : return state;
    }
  }
  
  export default complaintReducer;
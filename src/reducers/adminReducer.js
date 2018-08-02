import {
    ALL_COMPLAINT
} from '../actions/adminAction';
import {
    NEWMANAGER,
    GETMANGAGERS,
    ERROR,
    CLEARERROR
} from '../actions/newManager';

let intaialstate = {
    complaints: [],
    rejectedComplaint:[],
    resolvedComplaint:[],
    managers: [],
    complaintFlag:false,
    managersFlag:false,
    managersError:'',
    addmanagerFlag:false,

}

function adminReducer(state = intaialstate, action) {

    switch (action.type) {
        case ALL_COMPLAINT:
            {    
                let allcomplaints = action.allcomplaints;
                allcomplaints = allcomplaints.reverse();
                return { ...state,
                    complaints: allcomplaints,
                    rejectedComplaint:action.rejectedComplaints.reverse(),
                    resolvedComplaint:action.resolvedComplaints.reverse(),
                    complaintFlag:true
                }
            }
        case NEWMANAGER:
            {

                var previousManagers = state.managers;
                previousManagers.push(action.manager);
                return {
                    ...state,
                    managers: previousManagers,
                    addmanagerFlag:true

                }
            }
        case GETMANGAGERS:
            {
                let managers = action.managers.reverse();
                return {
                    ...state,
                    managers,
                    managersFlag:true
                }
            }
        case ERROR:{
             return{
                 ...state,
                 managersError:action.err,
                 managersFlag:true
             }
        }
      case CLEARERROR:{
          return{
            ...state,
            managersFlag:false,
            managersError:'',
            addmanagerFlag:false
          }
      }
        default:
            return state;
    }
}

export default adminReducer;
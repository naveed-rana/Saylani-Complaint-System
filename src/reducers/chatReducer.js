import {ADDMESSAGE,GETMESSAGES} from '../actions/chatActions';
import {STATUSSUCCESS,STATUSERROR,CLEARSTATUSFLAG} from '../actions/adminAction';

var intialState ={
    chat:[],
    statusFlag:false,
    statusFlagerror:false
}

function chatReducer(state=intialState,action) {

    switch (action.type) {
        case ADDMESSAGE:{
            let previoschat = state.chat;
             previoschat.push(action.message) 
            return {
                   ...state,
                   chat:previoschat
            }
        }
        case GETMESSAGES:{
            return{
                ...state,
                networkrequest:true,
                chat:action.messages
            }
        }
        case STATUSERROR:{
            return {
                ...state,
                statusFlagerror:true
            }
        }
        case STATUSSUCCESS:{
            return {
                ...state,
                statusFlag:true
            }
        }
        case CLEARSTATUSFLAG:{
            return{
                ...state,
                statusFlag:false,
                statusFlagerror:false
            }
        }
        default:
            return state;
    }
    
}

export default chatReducer;
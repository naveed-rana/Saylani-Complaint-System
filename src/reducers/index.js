import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import complaintReducer from './complaint';
import adminReducer from './adminReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  userComplaints:complaintReducer,
  adminReducer,
  chatReducer
});

export default rootReducer;

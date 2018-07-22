import {

    functions
} from '../firebase/firebase.js';
import {
    onceGetUsers,
    doCreateUser
} from '../firebase/db';

export const NEWMANAGER = 'NEWMANAGER';
export const GETMANGAGERS = 'GETMANGAGERS';
export const ERROR = 'ERROR';
export const CLEARERROR = 'CLEARERROR';

function getNewManager(manager) {

    return {
        type: NEWMANAGER,
        manager
    }
}

function errorCreatingManager(err) {
    return {
        type:ERROR,
        err
    }
}

export function startGetNewManager(manager) {

    return (dispatch) => {
        var createClientUser = functions.httpsCallable('createClientUser');
        createClientUser({
            email: manager.email,
            password: manager.manager_password
        }).then((user)=>{
          if(user.data.uid){
            doCreateUser(user.data.uid,manager)
                .then(() => {
                    dispatch(getNewManager(manager));
                })
                .catch(error => {
                dispatch(errorCreatingManager(error));
                });
        }
       else{
         dispatch(errorCreatingManager(user.data.errorInfo.message));
       }
    }
        ).catch((err) => {
            dispatch(errorCreatingManager(err))
        });

    }

}

//get all managers from database;

function getManagers(managers) {
    return {
        type : GETMANGAGERS,
        managers
    }
    
}

export function startGetManagers(){
    return (dispatch) =>{
        onceGetUsers().then((snapshot) =>{
            let managers =[];
            snapshot.forEach((element=>{
                let manager = element.val();
              if(manager.branch_code){
                managers.push(manager);
              }
            }));
           dispatch(getManagers(managers));  
        } ).catch((err)=>{
            console.log(err);
        })}
}

//clear state 

export function messageClear() {
        return {
            type:CLEARERROR
        }
}
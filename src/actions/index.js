import {db} from '../firebase/firebase';
import {auth} from 'firebase';
import {doAddNewComplaint,onceGetUser} from '../firebase/db';
import { HISTORY } from '../constants/routes';
export const ADD_COMPLAINT = 'ADD_COMPLAINT';
export const GET_USER_COMPLAINT = 'GET_USER_COMPLAINT';
export const GETUSER = 'GETUSER';
export const FLAG ='Flag';
export const CLEARFLAG = 'CLEARFLAG';
export const GETID = 'GETID';
export const GETHISTORY = 'GETHISTOORY';


function getUserComplaint(complaints) {
     
    return{
        type:GET_USER_COMPLAINT,
        complaints
    }
    
}

export function startFlag(flag) {
     
    return{
        type:FLAG,
        flag
    }
    
}

export function startGetUserComplaints(userid) {
    
    return (dispatch) =>{
        
   
    db.ref('complaints').on('value',(snapshot)=>{
            var usercomplaints = [];
            snapshot.forEach(element => {
                let complaint = element.val();
                if (complaint.requester === userid && complaint.complaint_status !=='confirm resolved' && complaint.complaint_status !=='deleted'){
                    usercomplaints.push({
                        id:element.key,
                        ...element.val()
                    });
                }
            });
        
            dispatch(getUserComplaint(usercomplaints));
        })
    }
}

function getUserComplaintHistory(historycomplaints) {
    return{
        type:GETHISTORY,
        historycomplaints
    }
}

export function startGetUserComplaintsHistory(uid){ 
    return (dispatch) =>{
        
        db.ref('complaints').on('value',(snapshot)=>{
                var usercomplaints = [];
                snapshot.forEach(element => {
                    let complaint = element.val();
                    if (complaint.requester === uid && (complaint.complaint_status ==='confirm resolved' || complaint.complaint_status ==='deleted')){
                        usercomplaints.push({
                            ...element.val()
                        });
                    }
                });
            
                dispatch(getUserComplaintHistory(usercomplaints));
            })
        }

}



function addComplaint(newComplaint) {
   
    return {
        type:ADD_COMPLAINT,
        newComplaint
    }
}

export function startAddComplaint(newComplaint){
    return (dispatch) => {
       
        doAddNewComplaint(newComplaint)

        .then( () => {
            
            dispatch(addComplaint(newComplaint));
            
        })
        .catch(err => {
            alert("error has been occoured!")
        });
        
       
    } 
}

function getUser(user){
    return{
        type:GETUSER,
        user
    }
}

export function startGetUser(){
    return (dispatch) => {
       
        var user = auth().currentUser;     
        if(user)
        {onceGetUser(user.uid).then((snapshot)=>{
            var userdata=snapshot.val();
             userdata = {
                 ...userdata,
                  uid:user.uid
             }
            dispatch(getUser(userdata));
        })}
        else{
            dispatch(getUser("user is not login"));
        }
       
    } 
}

export function unsetuser() {
    return {
        type:'unset'
    }
}

export function clearFlag() {
    return {
        type:CLEARFLAG
    }
}

function getComplaintId(id) {
    return{
        type:GETID,
        complaintId:id
    }
}
export function startGetComplaintId() {
    return(dispatch) =>{
        
    db.ref('complaints').limitToLast(1).on('child_added',(snapshot)=>{
        if(snapshot.val().comlaintid){
        dispatch(getComplaintId(snapshot.val().comlaintid));
        }else{
           
            dispatch(getComplaintId(0));
        }
    })
    }
}
import {db} from '../firebase/firebase';
import {complaintStatusUpdate} from '../firebase/db';
export const ALL_COMPLAINT ="ALL_COMPLAINT";
export const STATUSSUCCESS ="STATUSSUCCESS";
export const STATUSERROR ="STATUSERROR";
export const CLEARSTATUSFLAG = "CLEARSTATUSFLAG";

function getRequesterComplaint(allcomplaints) {
     
    return{
        type:ALL_COMPLAINT,
        allcomplaints
    }
    
}


export function startGetRequesterComplaints() {
   
    return (dispatch) =>{
        
        
        db.ref('complaints').on('value',(snapshot)=>{
            var usercomplaints=[];
                  snapshot.forEach(element => { 
                      let data = element.val();
                      if(data.complaint_status !=='confirm resolved' && data.complaint_status !=='deleted'){
                       usercomplaints.push({
                           id:element.key,
                          ...data
                          });}
                 });     
         dispatch(getRequesterComplaint(usercomplaints));
        })    
    }
}
function complaintUpdateStatusSuccess() {
    return{
        type:STATUSSUCCESS
    }
}
function complaintUpdateStatusError() {
    return{
        type:STATUSERROR
    }
}
export function updateComplaintStatus(id,value) {
    return (dispatch) =>{
        complaintStatusUpdate(id,value).then(()=>{
          dispatch(complaintUpdateStatusSuccess());
        }).catch(()=>{
         dispatch(complaintUpdateStatusError());
        })
    }
}

export function clearUpdateStatusFlag() {
    return{
        type:CLEARSTATUSFLAG
    }
}
import {doAddNewMessage,onceGetMessages } from '../firebase/db';
import {db} from '../firebase/firebase';
export const ADDMESSAGE = 'ADDMESSAGE';
export const GETMESSAGES = 'GETMESSAGES';
function addNewMessage(message) {
    return{
          type:ADDMESSAGE,
          message
    }
    
}

export function startAddNewMessage(id,message) {
    return (dispatch)=>{
        doAddNewMessage(id,message)
        .then(()=>{
        })
        .catch((err)=>console.log(err))

    }
    
}

//get mesage

function getMessage(messages) {
    return {
        type:GETMESSAGES,
        messages
    }
}

export function startGetMessage(id){
    return (dispatch) =>{
        onceGetMessages(id)
        .then((snapshot) =>{
           let allmessages =[];
           snapshot.forEach((message)=>{
             allmessages.push({
                 uid:message.key,
                 ...message.val()
             });
           })
           dispatch(getMessage(allmessages));
        })

        db.ref(`chat/${id}`).orderByChild('createdAt').startAt(Date.now()).on('child_added', function(childSnapshot) {
           dispatch(addNewMessage({uid:childSnapshot.key,...childSnapshot.val()}));
          });

    }
}


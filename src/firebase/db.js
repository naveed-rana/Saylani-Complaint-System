import { db,firebase } from './firebase';

// User API

export const doCreateUser = (id, user) =>
  db.ref(`users/${id}`).set(user);

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const onceGetUser = (userid) =>
  db.ref('users/'+ userid).once('value');
// Other db APIs ...
export const doAddNewComplaint = (newComplaint) =>
  db.ref('complaints').push(newComplaint);

  export const doAddNewManager = (newManager) =>
  db.ref('managers').push(newManager);

  //chat api

  export const doAddNewMessage =(id,message)=>
    db.ref(`chat/${id}`).push({
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      ...message
    });

 export const onceGetMessages = (id) =>
    db.ref(`chat/${id}`).once('value');

 export const complaintStatusUpdate = (id,value) =>
       db.ref(`complaints/${id}/complaint_status`).set(value);


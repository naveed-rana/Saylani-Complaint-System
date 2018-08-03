const functions = require('firebase-functions');
var admin = require("firebase-admin");
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createClientUser = functions.https.onCall((data, context) => {
    let userdata = admin.auth().createUser({
        email: data.email,
        password: data.password,
        disabled: false
       
      }).then((user)=>{
    
          return {
              uid:user.uid,
              email:user.email
          };
      })
        .catch((err)=>{
            return err;
        })
    return userdata;
  });
  
  exports.updateClientUser = functions.https.onCall((data, context) => {
      console.log('==================from update a user==================');
      console.log(context);
      console.log(data);
    // let userdata = admin.auth().updateUser(context.uid,{
    //     password: data.password
    //   }).then((user)=>{
    
    //       return {
    //           uid:user.uid,
    //           email:user.email
    //       };
    //   })
    //     .catch((err)=>{
    //         return err;
    //     })
    // return userdata;
  });
  
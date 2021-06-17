const FCM = require('fcm-node');
const serverKey = 'abcd';
const fcm = new FCM(serverKey);


// function sendPushNotification(message1,deviceToken) {
//    var message = {
//         registration_ids: deviceToken,
//         notification: {
//             title: 'Testing',
//             body: message1.message,
//             type: message1.type,
//             sound: 'default',
//             badge: 1
//         },
//         data: message1,
//         priority: 'high'
//     };
//     fcm.send(message, function (err, result) {
//         if (err) {
//             console.log("Something has gone wrong!", err);
//         } else {
//             console.log("Successfully sent with response: ", result);
//         }
//     });
// }

// async function sendPushNotification(message1, deviceToken) {
//   console.log(typeof(deviceToken))

//   var message = {
//     registration_ids: deviceToken,
//     notification: {
//       title: 'Testing',
//       body: message1.message,
//       badge: 1
//     },
//     data: message1,
//     priority: 'high'
//   };
//   fcm.send(message, function (err, result) {
//     if (err) {
//       console.log("Something has gone wrong!", err);
//     } else {
//       console.log("Successfully sent with response: ", result);
//     }
//   });
// }

function OTP(phoneNo){
    console.log(phoneNo);
const accountsid='ACe2eaa3359611950eac5c30f614427fbc';
const authtoken='4c3a8a27a717ba61df011978d69584c2';
const client=require('twilio')( accountsid,authtoken);

var value = Math.floor(1000 + Math.random() * 9000); 
   
    
client.messages.create({
    body:value ,
    from:'+16163446313',
    to:phoneNo,
})
.then((message)=>console.log(message))
.catch((err)=>console.log(err));
return value
}

module.exports = {
    // sendPushNotification,
    OTP
};
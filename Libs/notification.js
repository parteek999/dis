const FCM = require('fcm-node');
const serverKey = 'lolu';
const fcm = new FCM(serverKey);




/*
 ==============================================
 Send the notification
 =============================================
 */


function sendPushNotification(message1,deviceToken) {


   var message = {
        registration_ids: deviceToken,
        notification: {
            title: 'Testing',
            body: message1.message,
            type: message1.type,
            sound: 'default',
            badge: 1
        },
        data: message1,
        priority: 'high'
    };
    fcm.send(message, function (err, result) {
        if (err) {
            console.log("Something has gone wrong!", err);
        } else {
            console.log("Successfully sent with response: ", result);
        }
    });
}

function otp(){
const accountsid='ACe2eaa3359611950eac5c30f614427fbc';
const authtoken='7aa3d1f35f858963a74ae93f0e104728';
const client=require('twilio')( accountsid,authtoken);

OTP = Math.floor(Math.random() * 10000); 
   
    
client.messages.create({
    body:OTP ,
    from:'+16163446313',
    to:'+918569808687',

})
.then((message)=>console.log(message))
.catch((err)=>console.log(err));
return OTP
}
module.exports = {
    sendPushNotification,
    otp
};
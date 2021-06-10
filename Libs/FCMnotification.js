const FCM = require('fcm-node');
const serverKey = 'AAAAQ37WFGY:APA91bFJ23AbSNIiy9HHzfVfLZtaSaxYug5ptWXJV2zjzapQyGPE37uiYqq6v9sPSMYjPhagTHgWRj__LriaL9FLN6n_gWGH08TfPQQ9wolW_uu3TxHrijFm1-rF_WQwSMIjpDEkJZKt';
const fcm = new FCM(serverKey);

async function sendPushNotification(message1, deviceToken) {
  console.log(typeof(deviceToken))

  var message = {
    registration_ids: deviceToken,
    notification: {
      title: 'Testing',
      body: message1.message,
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
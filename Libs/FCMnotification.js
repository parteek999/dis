const FCM = require('fcm-node');
const serverKey = 'AAAAPbzQd4Q:APA91bGdeFq31WQwocKOhIExpNocV5Cq7hTyA2k7UF2p1HO5Zk96aOkPLhqo1XOYxMh_KolQ534l2utcIYCqxvFW0WE4bW5x7n8PwJGYxHNKAdSM_4yZ8VcDaQcuGaZg3kJd1a0dY16Q';
const fcm = new FCM(serverKey);

function sendPushNotification(message, 
    // deviceToken
    ) {
    //  console.log(message.message)
     console.log("mesage",message.message);
    var devicetoken = ["dEeXtwXaQfyVynu2bpC0ri:APA91bFF9tOpjwwr_aMNeCqOlTU6ypMllqSlJ0IN6v130YxSF65_2Eivtquko-_a-TEGPBWK5H_CJvvYzytS3rsE4RjCr_SzILOFmcehcd_supwhBLR2xljeKRxY1BZwSTxIgIMPrInf"]
    console.log(devicetoken)
    var message = {
        registration_ids: devicetoken,
        // to:"dEeXtwXaQfyVynu2bpC0ri:APA91bFF9tOpjwwr_aMNeCqOlTU6ypMllqSlJ0IN6v130YxSF65_2Eivtquko-_a-TEGPBWK5H_CJvvYzytS3rsE4RjCr_SzILOFmcehcd_supwhBLR2xljeKRxY1BZwSTxIgIMPrInf",
        notification: {
            title: message.message.title,
            // message: "Hi there this is message",
            sound: 'default',
            badge: 1
        },
        data: message.message,
        
        priority: 'high'
    };
    fcm.send(message, function (err, result) {
        console.log("hello");
        if (err) {
            console.log("Something has gone wrong!", err);
        } else {
            console.log("Successfully sent with response: ", result);
        }
    });
}

module.exports = {
    sendPushNotification
};
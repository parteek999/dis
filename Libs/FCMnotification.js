const FCM = require('fcm-node');
const serverKey = 'AAAAPbzQd4Q:APA91bGdeFq31WQwocKOhIExpNocV5Cq7hTyA2k7UF2p1HO5Zk96aOkPLhqo1XOYxMh_KolQ534l2utcIYCqxvFW0WE4bW5x7n8PwJGYxHNKAdSM_4yZ8VcDaQcuGaZg3kJd1a0dY16Q';
const fcm = new FCM(serverKey);

async function sendPushNotification(message1,deviceToken) {
            var message = {
                registration_ids: deviceToken,
                data: message1.message,
                priority: 'high'
            };
            fcm.send(message, function (err, result) {
                console.log("hello");
                if (err) {
                    // reject(err)
                    console.log("Something has gone wrong!", err);
                } else {
                    console.log("Successfully sent with response: ", result);
                    // resolve(result)
                }
            });
        // }
    //     catch (err) {
    //         reject(err)
    //     }
    //  })
}

module.exports = {
    sendPushNotification
};
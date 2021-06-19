const FCM = require('fcm-node');
const serverKey = 'AAAAPbzQd4Q:APA91bGdeFq31WQwocKOhIExpNocV5Cq7hTyA2k7UF2p1HO5Zk96aOkPLhqo1XOYxMh_KolQ534l2utcIYCqxvFW0WE4bW5x7n8PwJGYxHNKAdSM_4yZ8VcDaQcuGaZg3kJd1a0dY16Q';
const fcm = new FCM(serverKey);

async function sendPushNotification(message1,deviceToken) {
    // return new Promise((resolve, reject) => {
        // try {
            // console.log("mesage", message1.message);
            // var deviceToken = ["c-CRQPX_SaOU8IB6tj421i:APA91bEI8cGnHqPnr5APTn6f9_a4gqjc56qjsFiPXH9wlnTUc-IBnbvRIPWEu7gxBddSJmaks405nDTbNgN211gdGrND0dAC7gW1mXqUX1leDF9bOF09XIu_xqwyBULE8pzQnXGGuuog"]
            var message = {
                registration_ids: deviceToken,
                // to:"dEeXtwXaQfyVynu2bpC0ri:APA91bFF9tOpjwwr_aMNeCqOlTU6ypMllqSlJ0IN6v130YxSF65_2Eivtquko-_a-TEGPBWK5H_CJvvYzytS3rsE4RjCr_SzILOFmcehcd_supwhBLR2xljeKRxY1BZwSTxIgIMPrInf",
                // notification: {
                //     title: message1.message.title,
                //     // message: "Hi there this is message",
                //     sound: 'default',
                //     badge: 1
                // },
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
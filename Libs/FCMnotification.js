const OneSignal = require("onesignal-node");
const client = new OneSignal.Client(
  "b422c7c0-8a0c-430c-9420-d699543a2388",
  "NmJjYjFlZGEtYWJiYS00NTkzLWFhOGYtM2E0MjdkMGNiZDJh"
);
const userClient = new OneSignal.UserClient(
  "NWIwM2ZlNTQtMjg0My00NzNiLThiNDAtOGYyZjgzMzU5MTI1"
);

var sendPushNotification = async (message,deviceToken) => {
  return new Promise((res, rej) => {
    const notification = {
      contents: {
        en:`${message.message.title}`,
      },
      headings: {
        en: "New News Added",
      },
      data: message.message,
      include_player_ids: deviceToken,
    };

    return client.createNotification(notification)
      .then((response) => {
        console.log(response);
        return res(response);
      })
      .catch((e) => {
        console.log(e);
        return rej(e);
      });
  });
};

module.exports = {
  sendPushNotification,
};


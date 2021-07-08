const OneSignal = require("onesignal-node");
const client = new OneSignal.Client(
  "dc0cb514-750f-4112-bd9d-033d4ec0ae84",
  "YjNjNGI5MjAtY2Y3NC00YmYzLThjOTMtYmUwMTc4MDllMGJh"
);
const userClient = new OneSignal.UserClient(
  "MmFjMGEwNmQtMGIwZS00YjU5LWIzZTgtMWMzNTVhYjY4YzEy"
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


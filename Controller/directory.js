var moment = require("moment");
const DAO = require("../DAOManager").queries,
  Config = require("../Config"),
  ERROR = Config.responseMessages.ERROR,
  Models = require("../Models");
const { Model } = require("mongoose");
var upload = require("../Libs/uploadManager");

const directory = async (payload) => {
  const {
    directoryType,
    directoryName,
    aboutDirectory,
    phoneNO,
    address,
    website,
    startTime,
    endTime,
    facebookLInk,
    instagramLInk,
    twitterLink,
  } = payload;
  console.log(payload);

  let imgDetail = await upload.upload(payload);

  var Data = {
    directoryType: directoryType,
    directoryName: directoryName,
    aboutDirectory: aboutDirectory,
    phoneNO: phoneNO,
    address: address,
    website: website,
    startTime: startTime,
    endTime: endTime,
    facebookLInk: facebookLInk,
    instagramLInk: instagramLInk,
    twitterLink: twitterLink,
    image: imgDetail,
  };
  let directory = await DAO.saveData(Models.Directory, Data);
  return directory;
};

const getDirectory = async (payload, userdetails) => {
  const query = {
    isDeleted: false,
  };
  var options = {
    sort: { directoryName: 1 },
  };
  let final = await DAO.getData(Models.Directory, query, {}, options);
  return final;
};

const getUserDirectory = async (payload, userDetails) => {
  const { directoryType } = payload;

  const query = {
    directoryType: directoryType,
    isDeleted: false,
  };
  var options = {
    sort: { directoryName: 1 },
  };

  var directory = await DAO.getData(Models.Directory, query, {}, options);

  directory.forEach((data) => {
    // const start = new Date(data.startTime);

    const start = new Date(data.startTime).toLocaleString('en-US', {
      timeZone: 'America/Nassau'
    });


    // const date=start.toLocaleTimeString();
    // const b = moment(start).format("hh:mm A");
    const b = moment.utc(start).local().format("hh:mm A");
    console.log(b);
    data.startTime = b;
    // const end = new Date(data.endTime);
    const end = new Date(data.endTime).toLocaleString('en-US', {
      timeZone: 'America/Nassau'
    });
    console.log(end);
    // const c = moment(end).format("hh:mm A");
    const c = moment.utc(end).local().format("hh:mm A");
    console.log(c);
    data.endTime = c;
  });

  return directory;
};

const editDirectory = async (payload, userDetails) => {
  let query = {
    _id: payload.id,
  };
  let data = {};

  if (payload.directoryType !== null && payload.directoryType !== "") {
    data.title = payload.directoryType;
  }
  if (payload.directoryName !== null && payload.directoryName !== "") {
    data.directoryName = payload.directoryName;
  }
  if (payload.aboutDirectory !== null && payload.aboutDirectory !== "") {
    data.aboutDirectory = payload.aboutDirectory;
  }
  if (payload.phoneNO !== null && payload.phoneNO !== "") {
    data.phoneNO = payload.phoneNO;
  }
  if (payload.address !== null && payload.address !== "") {
    data.address = payload.address;
  }
  if (payload.website !== null && payload.website !== "") {
    data.website = payload.website;
  }
  if (payload.startTime !== null && payload.startTime !== "") {
    data.startTime = payload.startTime;
  }
  if (payload.endTime !== null && payload.endTime !== "") {
    data.endTime = payload.endTime;
  }
  if (payload.facebookLInk !== null && payload.facebookLInk !== "") {
    data.facebookLInk = payload.facebookLInk;
  }
  if (payload.instagramLInk !== null && payload.instagramLInk !== "") {
    data.instagramLInk = payload.instagramLInk;
  }
  if (payload.twitterLink !== null && payload.twitterLink !== "") {
    data.twitterLink = payload.twitterLink;
  }
  if (payload["file"]) {
    let imgDetail = await upload.upload(payload);
    data.image = imgDetail;
  }

  let result = await DAO.findAndUpdate(Models.Directory, query, data, {
    new: true,
  });
  return result;
};

const singleDirectory = async (payload, userdetails) => {
  let id = payload.id;
  const query = {
    _id: id,
    isDeleted: false,
  };
  let directory = await DAO.getDataOne(Models.Directory, query, {}, {});
  return directory;
};

const deleteDirectory = async (payload, userdetails) => {
  let id = payload.id;
  const query = {
    _id: id,
  };
  let result = await DAO.findAndUpdate(
    Models.Directory,
    query,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

module.exports = {
  directory,
  getDirectory,
  singleDirectory,
  getUserDirectory,
  deleteDirectory,
  editDirectory,
};

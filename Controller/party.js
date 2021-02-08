const DAO = require('../DAOManager').queries,
  Models = require('../Models');
Config = require('../Config');
ERROR = Config.responseMessages.ERROR;



const createEvent = async (payload) => {
  //    console.log(payload);
  const { venue, startTime, endingTime } = payload;
  let query = {
    venue,
    //  startTime,endingTime
  }
  // console.log(query);
  let res = await DAO.getDataOne(Models.party, query, {}, {})
  console.log(res);
  if (res!= null) {
    console.log("hi");
    if (venue == res.venue) {
      console.log("hello");
      if (startTime.getTime() >= res.startTime.getTime()) {
        console.log("hey");
        if (startTime.getTime() < res.startTime.getTime()) {
          console.log("oye");
          throw "fas gye aap";
        }
      }
    }
  }

  let final = await DAO.saveData(Models.party, payload);

  return {
    final
  }
}
module.exports = {
  createEvent
}
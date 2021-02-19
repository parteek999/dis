const DAO = require('../DAOManager').queries,
Models = require('../Models');
Config = require('../Config');
ERROR = Config.responseMessages.ERROR;

const mail= require('../DAOManager/mail');

const createEvent = async (payload,userDetails) => {
      // console.log(payload);
      console.log(userDetails);

  // const { venue } = payload;
  // let query = {
  //   venue,
  // }
  // let res = await DAO.getDataOne(Models.party, query, {}, {})
  // console.log(res);
  // if (res!= null) {
  //   console.log("hi");
  //   if (venue == res.venue) {
  //     console.log("hello");
  //     if (startTime.getTime() >= res.startTime.getTime()&& startTime.getTime() <= res.endingTime.getTime()||
  //         endingTime.getTime()>=res.startTime.getTime()&& endingTime.getTime()<=res.endingTime.getTime()||
  //         res.startTime.getTime()>=startTime.getTime()&&res.startTime.getTime()<=endingTime.getTime()) {
  //         console.log("hey");
  //         throw "fas gye aap";
  //       }
  //     }
  //   }

  let final = await DAO.saveData(Models.party, payload);
  console.log(final)
  const query1={
    fullName:userDetails.fullName
  }
  console.log(query1);
  const query2={
    _id:final._id
  }
console.log(query2);

  const data = await DAO.findAndUpdate(Models.party,query2,query1,{});
  //  console.log(data)


  return {
    final
  }
}

const searchEvent = async (payload) => {
  // let res = await Models.party.find({
  //   loc:
  //   {
  //     $nearSphere: {
  //       $geometry: {
  //         type: "Point",
  //         coordinates: [-73.97, 40.77]
  //       },
  //       $minDistance: 0,
  //       $maxDistance: 8000,
  //     }
  //   }
  // }, { _id: 1, name: 1 }, {})

  let res = await DAO.getData(Models.party, 
    {
      loc:
      {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [21,22]
          },
          $minDistance: 0,
          $maxDistance: 80000
        }
      }
    }

  , {_id:1,name:1},{});


  return {
    res
  }
}
const imageUpload = async (payload) => {
  const { file } = payload;
   let a=await mail.Uplaod(file);
   return a
}
module.exports = {
  createEvent,
  searchEvent,
  imageUpload
}


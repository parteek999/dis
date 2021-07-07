const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    Models = require('../Models');
var upload = require('../Libs/uploadManager');
const { sendPushNotification,sendIosNotfication } = require('../Libs/FCMnotification');



const createNews = async (payload, userDetails) => {
    const { title, description } = payload
    let imgDetail = await upload.upload(payload)
    var Data = {
        title: title,
        description: description,
        image: imgDetail,
    }
    let result = await DAO.saveData(Models.news, Data);
    const message = {
        message: result,
        type: 2
    }

    console.log("zdsasada",message)
    const deviceToken = await DAO.getUniqueData(Models.Users,  { notificationToggle: true,deviceType : "IOS"}, {}, {}, 'deviceToken');
    const deviceToken1 = await DAO.getUniqueData(Models.Users, { notificationToggle: true,deviceType : "ANDROID"}, {}, {}, 'deviceToken');
console.log("deviceToken",deviceToken)
console.log("deviceToken1",deviceToken1)
    try {
    await sendIosNotfication (message,deviceToken);
    await sendPushNotification(message, deviceToken1);
    let query = {
        deviceToken: { '$in': deviceToken },
        notificationToggle: true
    };
    let final_id = await DAO.getUniqueData(Models.Users, query, {}, {}, '_id');
    var data1 = {
        message: result.title,
        article_id: result._id,
        userId: final_id,
    }
     notification = await DAO.saveData(Models.Notification, data1);
    
} catch (error) {
    return error
}
    return result
}

const getNews = async (payload, userdetails) => {
    const query = {
        isDeleted: false
    }
    return DAO.getData(Models.news, query, {}, { sort: { createdAt: -1 } });
}

const getUserNews = async (payload, userdetails) => {
    if(userdetails&&userdetails!==null){
        const query = {
            isDeleted: false
        }
        let result = await DAO.getData(Models.Users, { _id: userdetails._id }, { article_Id: 1, _id: 0 }, {})
    
        let news = await DAO.getData(Models.news, query, {}, { sort: { createdAt: -1 } });
    
        let b = {};
        let bookmarkId = result[0].article_Id;
        bookmarkId.forEach(like => {
            b[like] = true
        });
    
        news.forEach(article => {
            if (b[article._id]) {
                article.isBookmarked = true;
            } else {
                article.isBookmarked = false;
            }
        });
        return news
    }
    else{
        const query = {
            isDeleted: false
        }
        return DAO.getData(Models.news, query, {}, { sort: { createdAt: -1 } });
    }
    
}

const singleNews = async (payload, userdetails) => {
    let id = payload.id
    const query = {
        _id: id,
        isDeleted: false
    }
    let result = await DAO.getDataOne(Models.news, query, {}, {});
    return result
}

const userSingleNews = async (payload, userdetails) => {
    if(userdetails&&userdetails!==null){
        let id = payload.id
        const query = {
            _id: id,
        }
        var arr = [];
        arr.push(id)
        let data = {
            _id:userdetails._id,
            article_Id: { '$in': arr }
        }
        let final = await DAO.getDataOne(Models.Users, data);
        
        if (final && final!=null) {
            result = await DAO.getDataOne(Models.news, query, {}, {});
            result.isBookmarked = true;
            return result
        }
        
        else {
            result = await DAO.getDataOne(Models.news, query, {}, {});
            result.isBookmarked = false;
            return result
        }
    }
    else{
        let id = payload.id
        const query = {
            _id: id,
            isDeleted: false
        }
        let result = await DAO.getDataOne(Models.news, query, {}, {});
        return result
    }
    
    
}

const deleteNews = async (payload, userdetails) => {
    let id = payload.id
    const query = {
        _id: id,
    }
    let result = await DAO.findAndUpdate(Models.news, query, { isDeleted: true }, { new: true })
    return result
}

const editNews = async (payload, userDetails) => {
    let query = { _id: payload.id };
    let data = {}

    console.log('edit paylod', payload)


    if (payload.title !== null && payload.title !== "") { data.title = payload.title }
    if (payload.description !== null && payload.description !== "") { data.description = payload.description }
    if (payload['file']) {
        let imgDetail = await upload.upload(payload);
        data.image = imgDetail
    }

    console.log("edit data", data)
    let result = await DAO.findAndUpdate(Models.news, query, data, { new: true })
    return result
}

const toggleNotification = async (payload, UserDetails) => {
    console.log(payload)
    const { mark, id } = payload;
    if (mark == 1) {
        var toggler = await DAO.findAndUpdate(Models.Users, { _id: id }, { notificationToggle: true },{new:true})
    }
    if (mark == 0) {
        var toggler = await DAO.findAndUpdate(Models.Users, { _id: id }, { notificationToggle: false },{new:true})
    }
    


    const data=await DAO.formatUser(toggler.toObject())

    console.log(data)

    return (data)
}



module.exports = {
    createNews,
    getNews,
    singleNews,
    deleteNews,
    getUserNews,
    editNews,
    toggleNotification,
    userSingleNews
}
const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    Models = require('../Models');
var upload = require('../Libs/uploadManager');



const createNews = async (payload, userDetails) => {
    console.log(payload)
    const { title, description } = payload
    let imgDetail = await upload.upload(payload)
    console.log("3434343", imgDetail)
    var Data = {
        title: title,
        description: description,
        image: imgDetail,
    }
    let result = await DAO.saveData(Models.news, Data)
    return result
}

const getNews = async (payload, userdetails) => {
    console.log("qwq", userdetails);
    const query = {
        isDeleted: false
    }
    return DAO.getData(Models.news, query, {}, { sort: { createdAt: -1 } });
}

const getUserNews = async (payload, userdetails) => {
    console.log(userdetails);
    const query = {
        isDeleted: false
    }
    let result = await DAO.getData(Models.Users, { _id: userdetails._id }, { article_Id: 1, _id: 0 }, {})
    console.log(result, "sjhsdsjd")
    console.log(result[0].article_Id)

    let news = await DAO.getData(Models.news, query, {}, { sort: { createdAt: -1 } });
    console.log(news)

    let b = {};
    let bookmarkId = result[0].article_Id;
    bookmarkId.forEach(like => {
        b[like] = true
    });
    //  Your object becomes { 1: true, 5: true }

    news.forEach(article => {
        // console.log(b[article.id])
        if (b[article._id]) {//   If key is present in the object
            article.isBookmarked = true;
        } else {
            article.isBookmarked = false;
        }
    });
    return news
}

const singleNews = async (payload, userdetails) => {
    let id = payload.id
    const query = {
        _id: id,
        isDeleted: false
    }
    console.log(query)
    let result = await DAO.getDataOne(Models.news, query, {}, {});
    return result
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
    //let id = payload.id
    let data = {}
    //  console.log("wqwqw",payload)


    if (payload.title) { data.title = payload.title }
    if (payload.description) { data.description = payload.description }
    if (payload['file']) {
        let imgDetail = await upload.upload(payload);
        data.image = imgDetail
        }
        
    console.log(data)
    let result = await DAO.findAndUpdate(Models.news, query, data, { new: true })
         return result
    }
   




module.exports = {
    createNews,
    getNews,
    singleNews,
    deleteNews,
    getUserNews,
    editNews
}
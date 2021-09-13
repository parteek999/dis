const Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    fs = require('fs');

    
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


// const upload = (payload) => {
//     return new Promise((resolve, reject) => {
//         try {
//             var unique = uuidv4()
//             var result = [];
//             key = unique;
//             p = "https://testing999.s3-eu-west-1.amazonaws.com/" + key;
//             result.push(p);
//             console.log("12121", payload['file']._data)
//             const BUCKET_NAME = 'testing999';
//             const s3 = new AWS.S3({
//                 accessKeyId: ID,
//                 secretAccessKey: SECRET,
//             });
//             const params = {
//                 Bucket: BUCKET_NAME,
//                 Key: key,
//                 Body: payload['file']._data,
//                 ACL: 'public-read',
//             };
//             s3.upload(params, (err, data) => {
//                 if (err) {
//                     console.log("assasas")
//                     reject(err)
//                 } else {
//                     console.log("qety")
//                     resolve(result)
//                 }
//             })
//         }
//         catch (err) {
//             reject(err)
//         }
//     })
// }


const upload = (payload) => {
    return new Promise((resolve, reject) => {

        try {
            console.log("sdsd",payload)
            var unique = uuidv4()
            var result = [];

            p = unique + " " + payload['file'].hapi.filename
            key = "https://api.accessabilitybahamas.org/" + p;
            result.push(p);
            const value = fs.createWriteStream("./uploads/" + p)
            const well = payload["file"].pipe(value)
            resolve(key);
        }

        catch (err) {
            reject(err)
        }
    
    })
}

module.exports = {
    upload
}
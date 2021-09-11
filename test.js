// const data = [
//     {name: 'Page A', count: 4000},
//     {name: 'Page B', count: 3000},
//     {name: 'Page C', count: 2000},
//     ];

//   let wantedArray = data.map((obj, index) => {
//       return {
//         name: obj.name,
//         [`count${index+1}`]: obj.count,
//         order:index+1
//       }
//    });
//    console.log(wantedArray)

var hello =
  '[{"id":"gary","name":"Gary Goodspeed","order":0},{"id":"kvn","name":"KVN","order":1},{"id":"cato","name":"Little Cato","order":2},{"id":"mooncake","name":"Mooncake","order":3},{"id":"quinn","name":"Quinn Ergon","order":4}]';
var str = hello.replace(/^"|"$/g, "");
var hel = str.split(",");
console.log(typeof str);
console.log("hello", str);
console.log(JSON.parse(hello))

[
  {
    _id: "60fa652b09d0855ed21ea66d",
    order: 1,
  },
  {
    _id: "60fa653409d0855ed21ea66e",
    order: 2,
  },
  {
    _id: ObjectId("60fa654009d0855ed21ea66f"),
    order: 3,
  }
];

// let articles = [
//     {
//         id: 1,
//         title: "1",
//         isBookmarked: false
//     },
//     {
//         id: 2,
//         title: "2",
//         isBookmarked: false
//     },
//     {
//         id: 3,
//         title: "3",
//         isBookmarked: true
//     },
//     {
//         id: 4,
//         title: "4",
//         isBookmarked: false
//     },
//     {
//         id: 5,
//         title: "5",
//         isBookmarked: false
//     },
// ]

// let likes = [1, 5];

// let b = {};
// likes.forEach(like => {
//     b[like] = true
// });
// //  Your object becomes { 1: true, 5: true }

// articles.forEach(article => {
// // console.log(b[article.id])

//     if (b[article.id]) {//   If key is present in the object
//         article.isBookmarked=true;
//     } else {
//         article.isBookmarked=false;

//     }
// });
// return console.log(articles);
// let articles = [
//     {
//         id: 1,
//         title: "1",
//     },
//     {
//         id: 2,
//         title: "2",
//     },
//     {
//         id: 3,
//         title: "3",
//     },
//     {
//         id: 4,
//         title: "4",
//     },
//     {
//         id: 5,
//         title: "5",
//     },
// ]

// let likes = [1, 5];

// let b = {};
// likes.forEach(like => {
//     b[like] = true
// });
// console.log(b)
// //  Your object becomes { 1: true, 5: true }

// articles.forEach(article => {
//     console.log(b[article.id])
//     if(b[article.id]) {//   If key is present in the object
//         b['isBookmarked'] = true;
//     } else {
//         b['isBookmarked'] = false;
//     }
// });

// return console.log(p);

// user getDirectory

    // const start = new Date(data.startTime);
    // const start = new Date(data.startTime).toLocaleString('en-US', {
    //   timeZone: 'America/Nassau'
    // });
    // // const date=start.toLocaleTimeString();
    // // const b = moment(start).format("hh:mm A");
    // const b = moment.utc(start).local().format("hh:mm A");
    // console.log(b);
    // data.startTime = b;
    // // const end = new Date(data.endTime);
    // const end = new Date(data.endTime).toLocaleString('en-US', {
    //   timeZone: 'America/Nassau'
    // });
    // console.log(end);
    // // const c = moment(end).format("hh:mm A");
    // const c = moment.utc(end).local().format("hh:mm A");
    // console.log(c);
    // data.endTime = c;




    api.accessabilitybahamas.org/4f191750-1fe5-46bf-bc35-34b5d7e66ee2 tb1_xSHSOy.jpg
const data = [
    {name: 'Page A', count: 4000},
    {name: 'Page B', count: 3000},
    {name: 'Page C', count: 2000},
    ];
  
  let wantedArray = data.map((obj, index) => {
      return {
        name: obj.name,
        [`count${index+1}`]: obj.count,
        order:index+1
      }
   });
   console.log(wantedArray)
















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
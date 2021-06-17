// let articles = [
//     {
//         id: 1,
//         title: "1",
//         // isBookmarked: false
//     },
//     {
//         id: 2,
//         title: "2",
//         // isBookmarked: false
//     },
//     {
//         id: 3,
//         title: "3",
//         // isBookmarked: false
//     },
//     {
//         id: 4,
//         title: "4",
//         // isBookmarked: false
//     },
//     {
//         id: 5,
//         title: "5",
//         // isBookmarked: false
//     },
// ]

// console.log(articles)
// let likes = [1, 5];
// let b = {};
// likes.forEach(like => {
//     b[like] = true

// });
// //  Your object becomes { 1: true, 5: true }

// articles.forEach(article => {
// console.log(b[article.id])
//     if (b[article.id]) {//   If key is present in the object
//         article.isBookmarked=true;
//     } else {
//         article.isBookmarked=false;
//     }
// });

// return console.log(articles);



// let a=[1,2,3];
// let b={...a};
// console.log(b)

// let sum=0

// function hello(array){
//     sum=sum+1

// console.log(sum ,array, "ist loop" )
// }


// async function splitIntoChunk(arr, chunk) {

//     while(arr.length > 0) {

//         let tempArray;
//         tempArray = arr.splice(0, chunk);
//         console.log(tempArray,"helllo");
//         await hello(tempArray)
        
//     }
// }

// const array = [1, 2, 3, 4, 5, 6, 7, 8,0];
// const chunk = 2;
// splitIntoChunk(array,chunk);


const array = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    const chunk = 2;

    while (array.length > 0) {

        let tempArray;
        tempArray = array.splice(0, chunk);
        console.log(tempArray, "helllo");

        // await sendPushNotification(message, deviceToken);

    }


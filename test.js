let articles = [
    {
        id: 1,
        title: "1",
        isBookmarked: false
    },
    {
        id: 2,
        title: "2",
        isBookmarked: false
    },
    {
        id: 3,
        title: "3",
        isBookmarked: false
    },
    {
        id: 4,
        title: "4",
        isBookmarked: false
    },
    {
        id: 5,
        title: "5",
        isBookmarked: false
    },
]

console.log(articles)
let likes = [1, 5];
let b = {};
likes.forEach(like => {
    b[like] = true

});
//  Your object becomes { 1: true, 5: true }

articles.forEach(article => {
console.log(b[article.id])
    if (b[article.id]) {//   If key is present in the object
        article.isBookmarked=true;
    } else {
        article.isBookmarked=false;
    }
});

return console.log(articles);



// let a=[1,2,3];
// let b={...a};
// console.log(b)

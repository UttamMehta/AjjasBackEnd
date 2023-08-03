const connectDatabase = require("../config/connectDatabase");
const { Youtubes } = require("../database/Youtubes");
const axios = require("axios").default;
const config = require("../config/config");

// async function generateData() {
//   try {
//     let arr = [];
//     let req = await data(
//       "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=5&regionCode=IN&key=AIzaSyCWFfdxzshap5vCja1ic4qbz7SjMLVBB1w"
//     );
//     let datas = req.items;

//     arr = datas.map(function (el, i) {
//       let obj = {};
//       const {
//         snippet: {
//           thumbnails: {
//             high: { url: thumbnails },
//           },
//         },
//         snippet: { title },
//         snippet: { description },
//         snippet: { publishedAt },
//       } = el;

//       obj = {
//         title,
//         description,
//         publishedAt,
//         thumbnails,
//       };

//       return obj;
//     });

//     await Youtubes.insertMany(arr);
//     console.log("done");
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function data(url) {
//   try {
//     let x = await axios
//       .get(url)
//       .then(function (res) {
//         // console.log(res.data);
//         return res.data;
//       })
//       .catch(function (error) {
//         console.log("error in 46");
//       });

//     return x;
//   } catch (error) {
//     console.log("error in 55");
//     // return error;
//   }
// }

// function appendData() {
//   connectDatabase().then(() => generateData());
// }

// module.exports = { appendData };

console.log("hello");
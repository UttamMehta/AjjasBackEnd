const mongoose = require("mongoose");
const config = require("./config");
mongoose.set("strictQuery", false);

async function connectDatabase() {
  try {
    const result = await mongoose.connect(
      "mongodb+srv://UttamMehta:UttamMehta@practo.8y3l5l5.mongodb.net/?retryWrites=true&w=majority"
    );
    return result;
  } catch (e) {
    return e;
  }
}
// console.log(config);

module.exports = connectDatabase;

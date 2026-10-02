const mongoose = require('mongoose');

module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connect to MongoDB successfully!!!");
  } catch (error) {
    console.log("Connect to MongoDB failed!");
  }

}
mongoose.connect(process.env.MONGO_URL);
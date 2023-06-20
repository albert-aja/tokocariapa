const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(`Mongodb terhubung dengan server: ${data.connection.host}`);
  });
};
module.exports = connectDatabase;

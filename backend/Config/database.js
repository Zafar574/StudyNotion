const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((e) => {
      console.log("Database connection failed");
      console.log(e.message);
      process.exit(1);
    });
};

module.exports = dbConnect;

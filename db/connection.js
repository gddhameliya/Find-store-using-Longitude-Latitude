const mongoose = require("mongoose");

let connection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected.."))
    .catch((err) => console.log(err));
};

module.exports = connection;

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/UsersDB")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log(error);
  });

const credentailSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const user = new mongoose.model("Users", credentailSchema);
module.exports = user;

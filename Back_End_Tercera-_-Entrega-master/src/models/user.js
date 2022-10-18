const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  address: {
      type: String,
      require: true,
  },
  phone: {  
    type: Number,
    require: true,
  }
});

module.exports = mongoose.model("User", UserSchema);

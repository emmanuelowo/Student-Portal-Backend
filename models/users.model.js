const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

const User = new Schema({
  id: {
    type: Number,
    unique: true,
    sparse: true,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
  },

  picture: {
    type: String,
  },
});

User.plugin(mongoosePaginate);

User.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};
// User.index({'$**': 'text'});

module.exports = mongoose.model("User", User);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// questions collection schema
const Answer = new Schema({
  text: { type: String, required: true },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Answer", Answer);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// questions collection schema
const Question = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
});

module.exports = mongoose.model("Question", Question);

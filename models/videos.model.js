const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Video = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  videoUrl: { type: String, required: true },
});

module.exports = mongoose.model("Video", Video);

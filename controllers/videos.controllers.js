const Video = require("../models/videos.model");

// POST a new video
exports.postVideo = async (req, res, next) => {
  try {
    let { title, description } = req.body;
    title = "abc"
    description = "abc"
    const video = await Video.create({
      title,
      description,
      creator: req.user._id,
      videoUrl: req.file.path,
    });
    res.status(201).json({
      success: true,
      message: "Video created successfully!",
      data: { video },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error?.message });
  }
};

// GET all videos uploaded by other users
exports.getVideos = async (req, res, _) => {
  try {
    const videos = await Video.find({ creator: { $ne: req.user._id } });
    res.status(200).json({
      data: { videos },
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

exports.getMyVideos = async (req, res, _) => {
  try {
    const videos = await Video.find({ creator: req.user._id });
    res.status(200).json({
      data: { videos },
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

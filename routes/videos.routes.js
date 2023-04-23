const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const videosController = require("../controllers/videos.controllers");
const checkAuth = require("../middleware/check-auth");

router.post(
  "/post-video",
  checkAuth,
  upload("public/videos", "video", "video/mp4"),
  videosController.postVideo
);
router.get("/get-videos", checkAuth, videosController.getVideos);
router.get("/get-my-videos", checkAuth, videosController.getMyVideos);

module.exports = router;

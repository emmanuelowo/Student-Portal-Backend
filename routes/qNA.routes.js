const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const qNAController = require("../controllers/qNA.controllers");

router.post("/post-question", checkAuth, qNAController.postQuestion);
router.get("/get-questions", checkAuth, qNAController.getQuestions);
router.get("/get-my-questions", checkAuth, qNAController.getMyQuestions);
router.post("/post-answer/:questionId", checkAuth, qNAController.postAnswer);

module.exports = router;

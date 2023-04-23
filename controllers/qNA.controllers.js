const Question = require("../models/questions.model");
const Answer = require("../models/answers.model");

// POST a new question
exports.postQuestion = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const question = await Question.create({
      title,
      description,
      creator: req.user._id,
    });
    res.status(201).json({
      message: "Question created successfully!",
      data: { question },
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// GET all questions and their answers
exports.getQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find()
      .populate("creator", "_id username")
      .populate({
        path: "answers",
        populate: {
          path: "creator",
          select: "_id username",
        },
      });
    res.status(200).json({
      data: { questions },
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

exports.getMyQuestions = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const questions = await Question.find({ creator: userId })
      .populate("creator", "_id username")
      .populate({
        path: "answers",
        populate: {
          path: "creator",
          select: "_id username",
        },
      });
    res.status(200).json({
      data: { questions },
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// POST a new answer to a question
exports.postAnswer = async (req, res, next) => {
  try {
    const { text } = req.body;
    const answer = await Answer.create({
      text,
      creator: req.user._id,
    });
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return res.status(404).json({
        message: "Question not found!",
        success: false,
      });
    }
    question.answers.push(answer);
    await question.save();
    res.status(201).json({
      message: "Answer created successfully!",
      data: { answer },
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const express = require("express");
const router = express.Router();

const UserController = require("../controllers/users.controllers");

// router.get("/",UserController.sampleUser);
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
// router.get("/",UserController.getAll);
// router.get("/:_id",UserController.getSingleUser);
// // router.post("/",UserController.addUser);
// router.put("/:_id", UserController.updateUser);
// router.delete("/:_id", UserController.deleteUser);

module.exports = router;

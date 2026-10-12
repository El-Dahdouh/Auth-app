const express = require("express");
const router = express.Router();
const { getAllUsers,getOneUser } = require("../controller/userController");
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT)
router.get("/", getAllUsers)
router.get("/:id", getOneUser)

module.exports = router;
const express = require("express")
const router = express.Router()
const {userRegister,userLogin, userRefresh, userLogout}= require("../controller/authController")

router.post("/register", userRegister)
router.post("/login", userLogin)
router.get("/refresh", userRefresh)
router.post("/logout", userLogout)

module.exports = router
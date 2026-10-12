const User = require("../model/user")

const getAllUsers = async (req, res) => {
    const users = await User.find().select("-password").lean()
    if (!users.length) {
        return res.status(400).json({ message: "No users found" })
    }
    res.status(200).json(users)
}

const getOneUser = async (req, res) => {
    const {id} = req.params
    const user = await User.findById(id).select("-password").lean()
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json(user)
}

module.exports = {
    getAllUsers,
    getOneUser
}
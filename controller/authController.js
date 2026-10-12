const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// register endpoint
const userRegister = async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    if (!first_name || !last_name || !email || !password)
        return res.status(400).json({ message: "All fields are required" })
    const foundedUser = await User.findOne({ email }).exec()
    if (foundedUser)
        return res.status(409).json({ message: "user is already existed" })
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        first_name,
        last_name,
        email,
        password: hashedPassword
    })

    const accessToken = jwt.sign({
        userInfo: {
            id: user._id
        }
    }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "15m" })

    const refreshToken = jwt.sign({
        userInfo: {
            id: user._id
        }
    }, process.env.REFRESH_ACCESS_TOKEN, { expiresIn: "7d" })

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.json({
        accessToken,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
    })
}


// login endpoint
const userLogin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({ message: "All fields are required" })
    const foundedUser = await User.findOne({ email }).exec()
    if (!foundedUser)
        return res.status(401).json({ message: "email or password is incorrect" })

    const isMatched = await bcrypt.compare(password, foundedUser.password)
    if (!isMatched)
        return res.status(401).json({ message: "email or password is incorrect" })

    const accessToken = jwt.sign({
        userInfo: {
            id: foundedUser._id
        }
    }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "15m"})

    const refreshToken = jwt.sign({
        userInfo: {
            id: foundedUser._id
        }
    }, process.env.REFRESH_ACCESS_TOKEN, { expiresIn: "7d" })
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.json({
        accessToken,
        email: foundedUser.email
    })
}

// refresh endpoint
const userRefresh = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt)
        return res.status(401).json({ message: "Unauthorized" })
    const refreshToken = cookies.jwt
    jwt.verify(refreshToken, process.env.REFRESH_ACCESS_TOKEN, async (err, decoded) => {
        if (err)
            return res.status(403).json({ message: "Forbidden" })
        const foundedUser = await User.findById(decoded.userInfo.id).exec()
        if (!foundedUser)
            return res.status(401).json({ message: "Unauthorized" })
        const accessToken = jwt.sign({
            userInfo: {
                id: foundedUser._id
            }
        }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "15m" })
        res.json({ accessToken })
    })
}

// logout endpoint
const userLogout = async (req, res)=> {
    const cookies = req.cookies
    if (!cookies?.jwt)
        return res.sendStatus(204)
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    })
    res.json({message: "logout success"})
}

module.exports = {
    userRegister,
    userLogin,
    userRefresh,
    userLogout
}

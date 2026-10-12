const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith("Bearer "))
        return res.status(401).json({ message: "Unauthorized" })
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
        if (err)
            return res.status(403).json({ message: "Forbidden" })
        req.user = decoded.userInfo.id
        next()
    })
}

module.exports = verifyJWT
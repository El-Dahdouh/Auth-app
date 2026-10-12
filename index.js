require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
const connectDB = require("./config/db")
const cookieParser= require("cookie-parser")
const corsOption = require("./config/corsOptions")
const allowedOrigins = require("./config/allowedOrigins")
const app = express()
const PORT = process.env.PORT || 5000

// DB connection
connectDB()

// middleware
app.use(cors(corsOption))
app.use(cookieParser())
app.use(express.json())


// routes
app.use(express.static(path.join(__dirname, "public")))
app.use("/", require("./routes/root"))
app.use("/auth", require("./routes/authRoutes"))
app.use("/users", require("./routes/userRoutes"))

app.all("/*splat", (req,res) => {
    res.status(404)
    if(req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"))
    }else if(req.accepts("json")) {
        res.json({error: "404 Not Found"})
    }else {
        res.type("txt").send("404 Not Found")
    }
})

mongoose.connection.once("open", () => {
    console.log("DB connected")
    app.listen(PORT, () => {
        console.log(`API running on port ${PORT}`)
    })
})

mongoose.connection.on("error", (err) => {
    console.log(err)
})

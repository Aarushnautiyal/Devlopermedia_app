const express = require("express")
const connectDB = require("./config/db")
const mongoose = require('mongoose')
const app = express()

// connecting db

connectDB()

// Init middleware for body parser using express

app.use(express.json({extended:false}))




app.use("/api/user",require('./routes/api/user'))
app.use("/api/auth",require('./routes/api/auth'))
app.use("/api/profile",require('./routes/api/profile'))
app.use("/api/post",require('./routes/api/post'))


const port = process.env.PORT||5000

app.listen(port,()=>{console.log(`server listening on ${port}`)})






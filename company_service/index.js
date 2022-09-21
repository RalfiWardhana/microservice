const express = require('express')
const dotenv = require('dotenv')
const app = express()
const router = require("./router")

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/upload-logo",express.static("upload_logo"))
app.use("/api",router)

app.listen(process.env.PORT, ()=> {
    console.log(`API run in PORT : ${process.env.PORT}`)
})
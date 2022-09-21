const express = require('express')
const app = express()
const PORT = 3000
const proxy = require('express-http-proxy')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/users",proxy("http://localhost:5000/"))
app.use("/company", proxy("http://localhost:4000/"))



app.listen(PORT , ()=> {
    console.log(`API run in PORT : ${PORT}`)
})
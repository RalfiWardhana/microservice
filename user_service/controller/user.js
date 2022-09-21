const repositoryUser = require('../repository/user')
const CryptoJS = require("crypto-js")
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')

dotenv.config()

exports.usersList = async (req,res,next) => {
    try {
        let findAll = await repositoryUser.usersList()
        console.log(req.user)
       
        if(!findAll){
            return res.status(500).json({
                message:"database error",
                status:500
            })
        }
        return res.status(200).json({
            message:"success to get all data user",
            status:200,
            data: findAll
        })   

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.userOne = async (req,res,next) => {
    try {
        let id = req.params.id
     
        let findOne = await repositoryUser.userOne(id)
        const { password, ...other } = findOne
        if(!findOne){
            return res.status(500).json({
                message:"database error",
                status:500
            })
        }
        return res.status(200).json({
            message:"success to get data user",
            status:200,
            data: other
        })        

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.createUser = async (req,res,next) => {
    try {
        let obj = {}

        const hashPassword = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()

        obj.first_name = req.body.first_name 
        obj.last_name = req.body.last_name
        obj.email = req.body.email
        obj.password = hashPassword
        obj.isActive = false
        obj.role = "user"
        obj.about = req.body.about
        obj.photo = req.files[0].filename
        
        const token = JWT.sign({
            email: req.body.email,
            password: hashPassword
        },
            process.env.JWT_SEC,
            { expiresIn: "1d" })

        const templeteEmail = {
            from:'Ralfi',
            to:req.body.email,
            subject:"Link aktivasi akun",
            html:`<p>Silahkan klik link untuk aktivasi akun, Ini hanya link contoh ke client side</p><p>${process.env.CLIENT_URL}/reset-password/${token}</p>`
        }
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
              user: 'ralfigeophysics@gmail.com',
              pass: 'xzkqcsmnlzsyyhdp', 
            },
          })

        const sendMail = await transporter.sendMail(templeteEmail)  

        let create = await repositoryUser.createUser(obj)
        if(!create){
            return res.status(500).json({
                message:"database error",
                status:500
            })
        }
        return res.status(200).json({
            message:"success to resgistration user",
            status:200,
        })   
    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.updateUser = async (req,res,next) => {
    try {
        let id = req.params.id
        let obj = {}

        const hashPassword = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
        
        obj.first_name = req.body.first_name 
        obj.last_name = req.body.last_name
        obj.email = req.body.email
        obj.password = hashPassword
        obj.isActive = false
        obj.role = "user"
        obj.about = req.body.about
        obj.photo = req.files[0].filename

        const d = new Date();
        const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`

        obj.updated_at = date

        let update = await repositoryUser.updateUser(obj,id)
        if(!update){
            return res.status(500).json({
                message:"database error",
                status:500
            })
        }
        return res.status(200).json({
            message:"success to update data user",
            status:200,
        })   

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.deleteUser = async (req,res,next) => {
    try {
        let id = req.params.id
        let deletes = await repositoryUser.deleteUser(id)
        if(!deletes){
            return res.status(500).json({
                message:"database error",
                status:500
            })
        }
        return res.status(200).json({
            message:"success to delete data user",
            status:200,
        })   

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.login = async (req, res) => {
    try {
        let email = req.body.email
        let passwords = req.body.password

        const dataUser = await repositoryUser.userByEmail(email)
        !dataUser && res.status(401).json("Wrong creddentials")

        let originalPassword = CryptoJS.AES.decrypt(dataUser.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8)
        originalPassword !== passwords && res.status(401).json("Wrong creddentials")

        const token = JWT.sign({
            id: dataUser.id,
            role: dataUser.role
        },
            process.env.JWT_SEC,
            { expiresIn: "1d" })

        const { password, ...other } = dataUser

        res.status(200).json({ ...other, token })
    } catch (err) {
        console.log(err)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

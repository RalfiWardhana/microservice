const JWT = require("jsonwebtoken")
const repositoryResume = require('../repository/resume')

const verifyJwt = (req,res,next) => {
    let authorization = req.header('Authorization')
    if(authorization){
        const token = authorization.split(" ")[1]
        JWT.verify(token, process.env.JWT_SEC, function(err, user) {
            if(err) res.status(403).json({
                status:401,
                message: "token invalid"
            })
            req.user = user
            next()
          })
    }else {
        return res.status(401).json({
            status:401,
            message: "not authenticated"
        })
    }
}

const verifyAdmin = (req,res,next) => {
    verifyJwt(req,res, ()=> {
        if(req.user.role == 'admin'){
            next()
        }else{
            return res.status(401).json({
                status:401,
                message: "Unauthorization you are not admin"
            })
        }
    })
} 

const verifySelf = (req,res,next) => {
    verifyJwt(req,res,()=> {
        if(req.user.id == req.params.id){
            next()
        }
        else{
            return res.status(401).json({
                status:401,
                message: "Unauthorization you can't access, because this is not FOR your account"
            })
        }
    })
}

const verifyResume = (req,res,next) => {
    verifyJwt(req,res, async()=> {
        let findOne = await repositoryResume.resumeOne(req.params.id)
        if(req.user.id == findOne.user_id){
            next()
        }
        else{
            return res.status(401).json({
                status:401,
                message: "Unauthorization you can't access, because this is not FOR your account"
            })
        }
    })
}

module.exports = {verifyJwt,verifyAdmin,verifySelf, verifyResume}

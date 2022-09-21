const JWT = require("jsonwebtoken")
const repositoryCompany = require('../repository/company')
const repositoryJob = require('../repository/jobs')
const repositoryUser_job = require('../repository/user_jobs')

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


const verifyCompany = (req,res,next) => {
    verifyJwt(req,res, async()=> {
        let findOne = await repositoryCompany.companyOne(req.params.id)
        if(req.user.id == findOne.user_access){
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

const verifyJobs = (req,res,next) => {
    verifyJwt(req,res, async()=> {
        let job = await repositoryJob.jobOne(req.params.id)
        let company_id = job.company_id
        let company = await repositoryCompany.companyOne(company_id)
    
        if(req.user.id == company.user_access){
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

const verifyUserJobs = (req,res,next) => {
    verifyJwt(req,res, async()=> {
        let findOne = await repositoryUser_job.user_jobOne(req.params.id)
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

module.exports = {verifyJwt, verifyAdmin, verifyCompany, verifyJobs, verifyUserJobs}

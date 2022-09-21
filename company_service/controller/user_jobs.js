const repositoryUser_job = require('../repository/user_jobs')
const axios = require('axios').default
const http = require('https');

exports.user_jobsList = async (req, res, next) => {
    try {
        let findAll = await repositoryUser_job.user_jobsList()
        if (!findAll) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to get data user_jobs",
            status: 200,
            data: findAll
        })

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.user_jobOne = async (req, res, next) => {
    try {
        let id = req.params.id
        let findOne = await repositoryUser_job.user_jobOne(id)
        if (!findOne) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to get data user_job",
            status: 200,
            data: findOne
        })

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.createuser_job = async (req, res, next) => {
    try {
        if (req.user.id != req.body.user_id) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorization you can't access, because this is not FOR your account"
            })
        }

        let getResume = await axios.get("http://localhost:5000/api/resumes/list/for-update-user-jobs", { responseType: "json" })

        let resultResume = getResume.data.data
        let user_id_resume = []

        resultResume.map((data) => {
            user_id_resume.push(data.user_id)
        })
       
        if (user_id_resume.includes(req.user.id) == false) {
         
            return res.status(400).json({
                message: "You don't have a resume, please upload it first",
                status: 400
            })
        }

        
        let obj = {}

        obj.user_id = req.user.id
        obj.resume_id = req.body.resume_id
        obj.jobs_id = req.body.jobs_id

        let create = await repositoryUser_job.createuser_job(obj)
        if (!create) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to add data user_job",
            status: 200,
        })
    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.updateuser_job = async (req, res, next) => {
    try {
        if (req.user.id != req.body.user_id) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorization you can't access, because this is not FOR your account"
            })
        }

        let id = req.params.id
        let obj = {}

        obj.user_id = req.user.id
        obj.resume_id = req.body.resume_id
        obj.jobs_id = req.body.jobs_id

        const d = new Date();
        const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`

        obj.updated_at = date

        let update = await repositoryUser_job.updateuser_job(obj, id)
        if (!update) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to update data user_job",
            status: 200,
        })

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.deleteuser_job = async (req, res, next) => {
    try {
        let id = req.params.id
        let deletes = await repositoryUser_job.deleteuser_job(id)
        if (!deletes) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to delete data user_job",
            status: 200,
        })

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

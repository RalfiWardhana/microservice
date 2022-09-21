const repositoryJob = require('../repository/jobs')
const repositoryCompany = require('../repository/company')

exports.jobsList = async (req, res, next) => {
    try {
        let findAll = await repositoryJob.jobsList()
        if (!findAll) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to get data jobs",
            status: 200,
            data: findAll
        })

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.jobOne = async (req, res, next) => {
    try {
        let id = req.params.id
        let findOne = await repositoryJob.jobOne(id)
        if (!findOne) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to get data job",
            status: 200,
            data: findOne
        })

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.createjob = async (req, res, next) => {
    try {
        let companies = await repositoryCompany.companysList()
        let company_id
        companies.filter((comp) =>  comp.user_access == req.user.id ).map((data) => {
            company_id = data.id
            if (company_id != req.body.company_id) {
                return res.status(401).json({
                    status: 401,
                    message: "Unauthorization you can't access, because this is not your company"
                })
            }
        })


        let obj = {}

        obj.job_title = req.body.job_title
        obj.company_id = req.body.company_id
        obj.location = req.body.location
        obj.workspace_type = req.body.workspace_type
        obj.min_salary = req.body.min_salary
        obj.max_salary = req.body.max_salary

        let create = await repositoryJob.createjob(obj)
        if (!create) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to add data job",
            status: 200,
        })
    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.updatejob = async (req, res, next) => {
    try {
        let companies = await repositoryCompany.companysList()
        let company_id
        companies.filter((comp) =>  comp.user_access == req.user.id ).map((data) => {
            company_id = data.id
            if (company_id != req.body.company_id) {
                return res.status(401).json({
                    status: 401,
                    message: "Unauthorization you can't access, because this is not your company"
                })
            }
        })

        let id = req.params.id
        let obj = {}

        obj.job_title = req.body.job_title
        obj.company_id = req.body.company_id
        obj.location = req.body.location
        obj.workspace_type = req.body.workspace_type
        obj.min_salary = req.body.min_salary
        obj.max_salary = req.body.max_salary

        const d = new Date();
        const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`

        obj.updated_at = date

        let update = await repositoryJob.updatejob(obj, id)
        if (!update) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to update data job",
            status: 200,
        })

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.deletejob = async (req, res, next) => {
    try {
        let id = req.params.id
        let deletes = await repositoryJob.deletejob(id)
        if (!deletes) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to delete data job",
            status: 200,
        })

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

const repositoryResume = require('../repository/resume')

exports.resumesList = async (req, res, next) => {
    try {
        let findAll = await repositoryResume.resumesList()
        if (!findAll) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to get all data resume",
            status: 200,
            data: findAll
        })

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.resumeOne = async (req, res, next) => {
    try {
        let id = req.params.id
        let findOne = await repositoryResume.resumeOne(id)
        if (!findOne) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to get data resume",
            status: 200,
            data: findOne
        })

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.AllResumeUploaed = async (req, res, next) => {
    try {
        let id = req.params.id
        let findOne = await repositoryResume.resumeOne(id)
        if (!findOne) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        const { attachment, ...other } = findOne
        return res.status(200).json({
            message: "success to get data attachmnet resume",
            status: 200,
            data: attachment
        })

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.createresume = async (req, res, next) => {
    try {
        if (req.user.id != req.body.user_id) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorization you can't access, because this is not FOR your account"
            })
        }

        let obj = {}
        let arrayAttach = []
        let attachment
        if (req.files.length > 1) {
            req.files.map((data) => {
                arrayAttach.push(data.filename)
            })
            attachment = arrayAttach.join()
        }
        else {
            attachment = req.files[0].filename
        }
        obj.name = req.body.name
        obj.attachment = attachment
        obj.user_id = req.body.user_id

        let create = await repositoryResume.createresume(obj)
        if (!create) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to add data resume",
            status: 200,
        })
    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.updateresume = async (req, res, next) => {
    try {
        let id = req.params.id
        let obj = {}

        let arrayAttach = []
        let attachment
        if (req.files.length > 1) {
            req.files.map((data) => {
                arrayAttach.push(data.filename)
            })
            attachment = arrayAttach.join()
        }
        else {
            attachment = req.files[0].filename
        }

        obj.name = req.body.name
        obj.attachment = attachment
        obj.user_id = req.body.user_id

        const d = new Date();
        const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`

        obj.updated_at = date

        let update = await repositoryResume.updateresume(obj, id)
        if (!update) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to update data resume",
            status: 200,
        })

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.deleteresume = async (req, res, next) => {
    try {
        let id = req.params.id
        let deletes = await repositoryResume.deleteresume(id)
        if (!deletes) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to delete data resume",
            status: 200,
        })

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

const repositoryCompany = require('../repository/company')
const CryptoJS = require("crypto-js")
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

exports.companysList = async (req, res, next) => {
    try {
        let findAll = await repositoryCompany.companysList()

        if (!findAll) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to get all data company",
            status: 200,
            data: findAll
        })

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.companyOne = async (req, res, next) => {
    try {
        let id = req.params.id

        let findOne = await repositoryCompany.companyOne(id)
        if (!findOne) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to get data company",
            status: 200,
            data: findOne
        })

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.createcompany = async (req, res, next) => {
    try {
        if (req.user.id != req.body.user_access) {
            return res.status(401).json({
                status:401,
                message: "Unauthorization you can't access, because this is not FOR your account"
            })
           }
        let obj = {}

        obj.nama = req.body.nama
        obj.city = req.body.city
        obj.organization_size = req.body.organization_size
        obj.industri_type = req.body.industri_type
        obj.logo = req.files[0].filename
        obj.user_access = req.user.id

        let create = await repositoryCompany.createcompany(obj)
        if (!create) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to add data company",
            status: 200,
        })
    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.updatecompany = async (req, res, next) => {
    try {
        if (req.user.id != req.body.user_access) {
            return res.status(401).json({
                status:401,
                message: "Unauthorization you can't access, because this is not FOR your account"
            })
           }
        let id = req.params.id
        let obj = {}

        obj.nama = req.body.nama
        obj.city = req.body.city
        obj.organization_size = req.body.organization_size
        obj.industri_type = req.body.industri_type
        obj.logo = req.files[0].filename
        obj.user_access = req.body.user_access

        const d = new Date();
        const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`

        obj.updated_at = date

        let update = await repositoryCompany.updatecompany(obj, id)
        if (!update) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to update data company",
            status: 200,
        })

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}

exports.deletecompany = async (req, res, next) => {
    try {
        let id = req.params.id
        let deletes = await repositoryCompany.deletecompany(id)
        if (!deletes) {
            return res.status(500).json({
                message: "database error",
                status: 500
            })
        }
        return res.status(200).json({
            message: "success to delete data company",
            status: 200,
        })

    } catch (error) {
        console.log(error)
        return next(new CustomError('Something went wrong, please try again later!', 500))
    }
}


const db = require("../conecctDB/connectDB")

exports.companysList = async () => {
    try {
        let sql = `SELECT * FROM public.company`
        let findAll = await db.any(sql)
        return findAll      

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.companyOne = async (id) => {
    try {
        let sql = `SELECT * FROM public.company WHERE id = $1`
        let findOne = await db.one(sql, [id])
        return findOne      

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.createcompany = async (obj) => {
    try {
        let sql = `INSERT INTO public.company ("nama", "city", "organization_size", "industri_type", "logo", "user_access") values ($1, $2, $3, $4, $5, $6) `

        let create = await db.none(sql, [obj.nama, obj.city, obj.organization_size, obj.industri_type, obj.logo, obj.user_access])

        return true     

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.updatecompany = async (obj,id) => {
    try {
        let sql = `UPDATE public.company SET "nama" = $1, "city" = $2, "organization_size" = $3, "industri_type" = $4, "logo" = $5, "user_access" = $6, "updated_at" = $7 WHERE id = $8 `

        let update = await db.any(sql, [obj.nama, obj.city, obj.organization_size, obj.industri_type, obj.logo, obj.user_access, obj.updated_at, id])

        return true     

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.deletecompany = async (id) => {
    try {
        let sql = `DELETE FROM public.company WHERE id = $1 `

        let deletes = await db.any(sql, [id])

        return true     

    } catch (error) {
        console.log(error)
        return false
    }
}

const db = require("../conecctDB/connectDB")

exports.resumesList = async () => {
    try {
        let sql = `SELECT r.*, u.email FROM public.resume r 
        JOIN public.user u ON u.id = r.user_id`
        let findAll = await db.any(sql)
        return findAll      

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.resumeOne = async (id) => {
    try {
        let sql = `SELECT r.*, u.email  FROM public.resume r 
        JOIN public.user u ON u.id = r.user_id WHERE r.id = $1`
        let findOne = await db.one(sql, [id])
        return findOne      

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.createresume = async (obj) => {
    try {
        let sql = `INSERT INTO public.resume ("name", "attachment", "user_id") values ($1, $2, $3) `

        let create = await db.none(sql, [obj.name, obj.attachment, obj.user_id])

        return true     

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.updateresume = async (obj,id) => {
    try {
        let sql = `UPDATE public.resume SET "name" = $1, "attachment" = $2, "user_id" = $3, "updated_at" = $4 WHERE id = $5 `

        let update = await db.any(sql, [obj.name, obj.attachment, obj.user_id, obj.updated_at ,id])

        return true     

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.deleteresume = async (id) => {
    try {
        let sql = `DELETE FROM public.resume WHERE id = $1 `

        let deletes = await db.any(sql, [id])

        return true     

    } catch (error) {
        console.log(error)
        return false
    }
}

const db = require("../conecctDB/connectDB")

exports.user_jobsList = async () => {
    try {
        let sql = `SELECT * FROM public.user_jobs u
        JOIN public.jobs j ON j.id = u.jobs_id`
        let findAll = await db.any(sql)
        return findAll

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.user_jobOne = async (id) => {
    try {
        let sql = `SELECT * FROM public.user_jobs u
        JOIN public.jobs j ON j.id = u.jobs_id
        WHERE u.id = $1`
        let findOne = await db.one(sql, [id])
        return findOne

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.createuser_job = async (obj) => {
    try {
        let sql = `INSERT INTO public.user_jobs ("user_id", "resume_id", "jobs_id") values ($1, $2, $3) `

        let create = await db.none(sql, [obj.user_id, obj.resume_id, obj.jobs_id])

        return true

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.updateuser_job = async (obj, id) => {
    try {
    
        let sql = `UPDATE public.user_jobs SET "user_id" = $1, "resume_id" = $2, "jobs_id" = $3, "updated_at" = $4 WHERE id = $5 `

        let update = await db.any(sql, [obj.user_id, obj.resume_id, obj.jobs_id, obj.updated_at, id])

        return true

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.deleteuser_job = async (id) => {
    try {
        let sql = `DELETE FROM public.user_jobs WHERE id = $1 `

        let deletes = await db.any(sql, [id])

        return true

    } catch (error) {
        console.log(error)
        return false
    }
}

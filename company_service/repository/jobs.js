const db = require("../conecctDB/connectDB")

exports.jobsList = async () => {
    try {
        let sql = `SELECT * FROM public.jobs j 
        JOIN public.company c ON c.id = j.company_id`
        let findAll = await db.any(sql)
        return findAll

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.jobOne = async (id) => {
    try {
        let sql = `SELECT j.*, c.user_access FROM public.jobs j 
        JOIN public.company c ON c.id = j.company_id 
        WHERE j.id = $1`
        let findOne = await db.one(sql, [id])
        return findOne

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.createjob = async (obj) => {
    try {
        let sql = `INSERT INTO public.jobs ("job_title", "company_id", "location", "workspace_type", "min_salary", "max_salary") values ($1, $2, $3, $4, $5, $6) `

        let create = await db.none(sql, [obj.job_title, obj.company_id, obj.location, obj.workspace_type, obj.min_salary, obj.max_salary])

        return true

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.updatejob = async (obj, id) => {
    try {
    
        let sql = `UPDATE public.jobs SET "job_title" = $1, "company_id" = $2, "location" = $3, "workspace_type" = $4, "min_salary" = $5, "max_salary" = $6, "updated_at" = $7 WHERE id = $8 `

        let update = await db.any(sql, [obj.job_title, obj.company_id, obj.location, obj.workspace_type, obj.min_salary, obj.max_salary, obj.updated_at, id])

        return true

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.deletejob = async (id) => {
    try {
        let sql = `DELETE FROM public.jobs WHERE id = $1 `

        let deletes = await db.any(sql, [id])

        return true

    } catch (error) {
        console.log(error)
        return false
    }
}

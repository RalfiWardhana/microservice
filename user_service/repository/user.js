const db = require("../conecctDB/connectDB")

exports.usersList = async () => {
    try {
        let sql = `SELECT * FROM public.user`
        let findAll = await db.any(sql)
        return findAll      

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.userOne = async (id) => {
    try {
        let sql = `SELECT * FROM public.user WHERE id = $1`
        let findOne = await db.one(sql, [id])
        return findOne      

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.createUser = async (obj) => {
    try {
        let sql = `INSERT INTO public.user ("first_name", "last_name", "email", "password", "isActive", "role", "about", "photo") values ($1, $2, $3, $4, $5, $6, $7, $8) `

        let create = await db.none(sql, [obj.first_name, obj.last_name, obj.email, obj.password, obj.isActive, obj.role, obj.about, obj.photo])

        return true     

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.updateUser = async (obj,id) => {
    try {
        let sql = `UPDATE public.user SET "first_name" = $1, "last_name" = $2, "email" = $3, "password" = $4, "isActive" = $5, "role" = $6, "about" = $7, "photo" = $8 , "updated_at" = $9 WHERE id = $10 `

        let update = await db.any(sql, [obj.first_name, obj.last_name, obj.email, obj.password, obj.isActive, obj.role, obj.about, obj.photo, obj.updated_at, id])

        return true     

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.deleteUser = async (id) => {
    try {
        let sql = `DELETE FROM public.user WHERE id = $1 `

        let deletes = await db.any(sql, [id])

        return true     

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.userByEmail = async (email) => {
    try {
        let sql = `SELECT * FROM public.user WHERE email = $1`
        let findOne = await db.one(sql,[email])
        return findOne      

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.userByPassword = async (password) => {
    try {
        let sql = `SELECT * FROM public.user WHERE password = $1`
        let findOne = await db.one(sql,[password])
        return findOne      

    } catch (error) {
        console.log(error)
        return false
    }
}

exports.userByEmailAndPassword = async (email,password) => {
    try {
        let sql = `SELECT * FROM public.user WHERE email = $1 AND password = $2`
        let findOne = await db.one(sql,[email,password])
        return findOne      

    } catch (error) {
        console.log(error)
        return false
    }
}
const router = require('express').Router()
const {verifyJwt, verifyAdmin, verifySelf, verifyResume} = require("./middleware/auth")
const user = require('./controller/user')
const resume = require('./controller/resume')
const {upload_attachment} = require("./uploadAttachment")
const {upload_photo} = require("./uploadPhoto")

//auth
router.route("/register").post(upload_photo.any('photo'),user.createUser)
router.route("/login").post(user.login)
router.route("/aktivasi/:token").get(user.verificationUser)

//user
router.route("/users/list").get(verifyAdmin, user.usersList)
router.route("/user/:id").get(verifyAdmin, user.userOne)
router.route("/user-update/:id").put(verifySelf, upload_photo.any('photo'),user.updateUser)
router.route("/user-delete/:id").delete( user.deleteUser)

//resume
router.route("/resume-upload").post(verifyJwt, upload_attachment.any('photo'),resume.createresume)
router.route("/resumes/list").get(verifyJwt,resume.resumesList)
router.route("/resumes/list/for-update-user-jobs").get(resume.resumesList)
router.route("/resume/:id").get(verifyResume, resume.resumeOne)
router.route("/resume-attachment/:id").get(verifyResume,resume.AllResumeUploaed)
router.route("/resume-update/:id").put(verifyResume, upload_attachment.any('photo'),resume.updateresume)
router.route("/resume-delete/:id").delete(verifyResume, resume.deleteresume)

module.exports = router

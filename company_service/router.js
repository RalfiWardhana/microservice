const router = require('express').Router()
const {verifyJwt, verifyAdmin, verifyCompany, verifyJobs, verifyUserJobs} = require("./middleware/auth")
const company = require('./controller/company')
const jobs = require('./controller/jobs')
const user_jobs = require('./controller/user_jobs')
const {upload_logo} = require("./uploadLogo")


//company
router.route("/company-add").post(verifyJwt, upload_logo.any('photo'),company.createcompany)
router.route("/company/list").get(verifyJwt,company.companysList)
router.route("/company/:id").get(verifyJwt,company.companyOne)
router.route("/company-update/:id").put(verifyCompany, upload_logo.any('photo'),company.updatecompany)
router.route("/company-delete/:id").delete(verifyAdmin, company.deletecompany)

//jobs
router.route("/jobs-add").post(verifyJwt,jobs.createjob)
router.route("/jobs/list").get(verifyJwt,jobs.jobsList)
router.route("/jobs/:id").get(verifyJwt, jobs.jobOne)
router.route("/jobs-update/:id").put(verifyJobs, jobs.updatejob)
router.route("/jobs-delete/:id").delete( jobs.deletejob)

//user_jobs
router.route("/user-jobs-add").post(verifyJwt, user_jobs.createuser_job)
router.route("/user-jobs/list").get(verifyJwt, user_jobs.user_jobsList)
router.route("/user-jobs/:id").get(verifyUserJobs, user_jobs.user_jobOne)
router.route("/user-jobs-update/:id").put(verifyUserJobs, user_jobs.updateuser_job)
router.route("/user-jobs-delete/:id").delete( user_jobs.deleteuser_job)

module.exports = router

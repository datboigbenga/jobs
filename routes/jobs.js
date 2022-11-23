const express = require("express")
const router = express.Router()
// const auth = require("../middleware/authMiddleware")

const {getAllJobs, getJob, createJob, updateJob, deleteJob} = require("../controller/jobs")

router.route("/").get(getAllJobs).post(createJob)
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob)

module.exports = router
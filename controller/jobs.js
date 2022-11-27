const Job = require("../models/jobs")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, notFound} = require("../errors")
const { find } = require("../models/jobs")

const getAllJobs = async(req, res)=>{

// console.log(req.headers.authorization)
// console.log(req.user.name)
// res.status(200).json(req.user)
const job = await Job.find({createdBy: req.user.userId}).sort("-createdAt")
res.status(StatusCodes.OK).json({job, nbHit: job.length})
}


const getJob = async(req, res)=>{
const {user:{userId},  params:{id:jobId}} = req
const job = await Job.findOne({_id:jobId, createdBy:userId})
if(!job){
    throw new notFound(`no job found with id: ${jobId}`)
}
res.status(StatusCodes.OK).json({job, nbHit: job.length})
i
}

const createJob = async(req, res)=>{
    req.body.createdBy = req.user.userId
    const job = await Job.create({...req.body})
    res.status(StatusCodes.CREATED).json({job})

}

const updateJob = async(req, res)=>{
const {
    body: {company, position},
    user: {userId}, 
    params:{id: jobId}
} = req

if(company === "" || position == ""){
    throw new BadRequestError("company or position field canntot be empty")
}

const job = await Job.findByIdAndUpdate({_id:jobId, createdBy:userId}, req.body, 
    {new:true,runValidators:true})

    if(!job){
        throw new notFound(`no result  wit id:  ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const deleteJob = async(req, res)=>{
const {
    user:{userId},
    params:{id:jobId}
}= req

const job = await Job.findByIdAndRemove({_id:jobId,createdBy:userId})

if(!job){
    throw new notFound(`no records with id: ${jobId}`)
}
res.status(StatusCodes.OK).send()
    
}
module.exports = 
{getAllJobs, 
    getJob,
     createJob, 
     updateJob, 
     deleteJob}
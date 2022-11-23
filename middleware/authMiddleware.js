const {unauthenticated}= require("../errors")
const {StatusCodes} = require("http-status-codes")
const jwt = require("jsonwebtoken")
const User = require("../models/users")


const authMidWare = (req, res, next)=>{

 const auth = req.headers.authorization

 if(!auth || !auth.startsWith("Bearer ")){
    throw new unauthenticated("You are not authorized to access route")
 }

 const token = auth.split(' ')[1]

 try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    req.user = {userId : decoded.userId, name: decoded.name}
    next()
 } catch (error) {
    throw new unauthenticated("Authorization invalid")
 }




}
module.exports = authMidWare
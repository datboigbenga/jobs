const User = require("../models/users")
const {StatusCodes}= require("http-status-codes")
const{ BadRequestError, unauthenticated} = require("../errors")


const register = async(req, res)=>{
    const {name, email, password} = req.body
    // if(!name || !email || !password){
    //     throw new BadRequestError("Please fill in fields")
    // }
  
   
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:user.name,token})
}


const login = async(req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequestError("input fields")

    }

    const user = await User.findOne({email}) 
      if(!user){
        throw new unauthenticated("invalid details")
    }
    const isPasswordCheck = await user.comparePass(password)
    if(!isPasswordCheck){
        throw new unauthenticated("invalid details")
    }
     const token = user.createJWT()
    res.status(200).json({user:{name:user.name}, token})
}

module.exports = {register,login}
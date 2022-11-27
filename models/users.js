const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const usersSchema = new mongoose.Schema({
name:{
    type:String,
    required: [true, 'please provide a name'],
    minlength: 3,
    maxlength: 50
},

email:{
    type:String,
    required: [true, 'please provide an email'],
    minlength: 3,
    maxlength: 50,
    match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
    unique: true
},

password:{
    type:String,
    required: [true, 'please provide your password'],
    minlength: 3,
},
    
})

usersSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

usersSchema.methods.createJWT =  function(){
   return jwt.sign({ userId: this._id, name: this.name }, 
    process.env.JWT_SECRET,
     {expiresIn:process.env.JWT_LIFETIME }
     )  
}

usersSchema.methods.comparePass = async function(inputtedPass){
    const ismatch = bcrypt.compare(inputtedPass, this.password)
    return ismatch
}

module.exports = mongoose.model("users", usersSchema)
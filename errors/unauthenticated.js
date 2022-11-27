const customApiError = require("./customApi")
const {StatusCodes} = require("http-status-codes")

class unauthenticatedError extends customApiError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports  = unauthenticatedError
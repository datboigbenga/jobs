const customApiError = require("./customApi")
const BadRequestError = require("./bad-request")
const unauthenticated = require("./unauthenticated")
const notFound = require("./not-found")


module.exports = {
    customApiError,
    BadRequestError,
    unauthenticated,
    notFound
}

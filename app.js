const express = require("express")
const app = express()
require("dotenv").config()
require("express-async-errors")

const cors = require("cors")
const helmet = require("helmet")
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit")
const connectdb = require("./database/db")
const authenticate = require("./routes/auth")
const jobs = require("./routes/jobs")
const notFound = require("./middleware/notFound")
const errorHandler = require("./middleware/errorHandler")

const swaggerUI = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerDoc = YAML.load("./swagger.yaml")

app.set("trust proxy", 1)
app.use(rateLimiter({
    windowMs: 15*60*100,
    max: 100,
}))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use(xss())
app.use(helmet())



const auth = require("./middleware/authMiddleware")

app.get("/",(req,res)=>{
    res.send("Welcome to the test API <a href='/api-docs'>Documentation</a>")
})

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use("/api/v1/auth", authenticate)
app.use("/api/v1/jobs",auth,  jobs)
app.use(errorHandler)
app.use(notFound)
const port = process.env.PORT || 5000

const start = async()=>{
    try {
        await connectdb(process.env.Mongo_URI)
        app.listen(port, ()=>{
            console.log(`server connected to port ${port}......` )  
        })

    } catch (error) {
        console.log("unable to connect", error)
    }
}

start() 
const express = require("express")
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressEjsLayouts = require('express-ejs-layouts');
const { default: mongoose } = require("mongoose");
const { AllRoutes } = require("./router");
const { NotfoundError, ErrorHandler } = require("./common/utils/error.utils");
const { SwaggerConfig } = require("./configs/swagger.config");
const bodyParser = require("body-parser");
const { initSocket } = require("./configs/socket.config");
const { NamespaceHandler } = require("./socket/namespace.socket");
const { clientHelper } = require("./common/utils/client.utils");


class Application {
    #app = express()
    #PORT
    #DB_URI
    constructor(PORT, DB_URI) {
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.initApplication()
        this.initTemplateEngine()
        this.connectToMongoDb()
        this.connectToRedisDB()
        this.createServer()
        this.createRoutes()
        this.errorhandler()
    }
    initApplication() {
        this.#app.use(morgan("dev"))
        this.#app.use(cookieParser(process.env.COOKIE_SECRET_KEY))
        this.#app.use(session({
            secret: process.env.SESSION_SECRET,
            resave: true,
            saveUninitialized: true,
            cookie: {
                secure: true
            }
        }))
        this.#app.use(express.json())
        this.#app.use(bodyParser.urlencoded({ extended: true }))
        this.#app.use(express.static(path.join(__dirname, "..", "public")))
        SwaggerConfig(this.#app)
    }
    createServer() {
        const http = require('http');
        const server = http.createServer(this.#app)
        const io = initSocket(server)
        const namespaceHandler = new NamespaceHandler(io)
        namespaceHandler.connection()
        namespaceHandler.createNamespaceConnection()
        server.listen(this.#PORT, () => {
            console.log("run -> http://localhost:" + this.#PORT);
        })
    }
    connectToMongoDb() {
        mongoose.connect(this.#DB_URI).then(() => {
            console.log("successfully connected to MongoDb")
        }).catch((err) => {
            console.log("got error with connecting to database error : " + err)
        })
        mongoose.connection.on("disconnect", () => { console.log("disconnect from DB"); })
        process.on("SIGINT", () => {
            mongoose.connection.close()
            process.exit(0)
        })
    }
    connectToRedisDB() {
        require("./configs/redis.config");
    }
    initTemplateEngine() {
        this.#app.use(expressEjsLayouts)
        this.#app.set("view engine", "ejs");
        this.#app.set("views", "resource/views");
        this.#app.set("layout extractStyles", true);
        this.#app.set("layout extractScripts", true);
        this.#app.set("layout", "./layouts/master");
        this.#app.use((req,res,next)=>{
            this.#app.locals = clientHelper(req,res)
            next()
        })
    }
    createRoutes() {
        this.#app.use(AllRoutes)
    }
    errorhandler() {
        this.#app.use(NotfoundError)
        this.#app.use(ErrorHandler)
    }
}
module.exports = Application
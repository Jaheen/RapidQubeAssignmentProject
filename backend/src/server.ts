import { Server as HTTPServer, createServer } from "http"
import * as express from "express"
import { ApiRouter, AuthRouter } from "routers"
import * as dotenv from "dotenv"
import DatabaseManager from "database/database-manager"


export default class ProjectServer {
    /**
     * PORT number on which the server must listen for connections
     */
    private PORT: Number

    /**
     * express application instance
     */
    private application: express.Application

    /**
     * https server instance
     */
    private httpServer: HTTPServer

    /**
     * Constructor for the server
     * @param {Number} PORT port number for the server to listen
     */
    constructor(PORT: Number) {
        this.PORT = PORT
        this.application = express()
        this.httpServer = createServer(this.application)
    }

    /**
     * Initialize and start the server and wait for clients
     */
    async start() {
        // load .env file (only in development, in production use environment variables)
        dotenv.config()

        // init mongoose instance
        DatabaseManager.initDatabaseConnection().then(isConnected => {
            if (isConnected) console.log("Connected to MongoDB Database")
        })

        // this.application.use(express.static("public"))

        this.application.use("/auth", AuthRouter)
        this.application.use("/api", ApiRouter)
        
        this.application.use("*", express.static("public"))

        // start server to listen
        this.httpServer.listen(this.PORT, () => {
            console.log(`Server started on PORT: ${this.PORT}`)
        })
    }
}

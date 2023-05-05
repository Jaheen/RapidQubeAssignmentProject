import ProjectServer from "server"

/**
 * Entry point of the entire application
 */
(() => {
    const server: ProjectServer = new ProjectServer(parseInt(process.env.PORT) || 8080)
    server.start()
})()
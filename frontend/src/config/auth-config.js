const SERVER_AUTH_TOKEN = "server-auth-token"

export default class AuthConfig {

    /**
     * Get the JWT auth token from the localstorage
     * @returns {string} JWT token if found or empty string if not found
     */
    static getServerAuthToken() {
        const token = localStorage.getItem(SERVER_AUTH_TOKEN)

        if (typeof token === "string")
            return token
        else
            return ""
    }

    /**
     * Set the JWT auth token to localstorage
     * @param {string} token authentication token sent from server
     */
    static setServerAuthToken(token) {
        if (typeof token === "string" && token.trim() !== "")
            localStorage.setItem(SERVER_AUTH_TOKEN, token)
        else
            console.error("attempt to set empty token")
    }

    /**
     * Delete the JWT auth token from the localstorage
     */
    static deleteServerAuthToken() {
        localStorage.removeItem(SERVER_AUTH_TOKEN)
    }
}
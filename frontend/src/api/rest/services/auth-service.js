import axios from "axios"

/**
 * Service to make auth requests
 */
export default class AuthService {

    /**
     * Login to server using REST API
     * @param {string} email email address to login
     * @param {string} password password to login
     * @returns a promise containing jwt token
     */
    static async login(email, password) {
        return new Promise((resolve, reject) => {
            axios.post("/auth/login", { email, password }).then(response => {
                const { status, data } = response

                if (status === 200) {
                    const { message, token } = data
                    if (message === "success") resolve(token)
                    else reject(message)
                }
            })
        })
    }

    /**
     * Sign up as new user on server
     * @param {string} firstName firstname of the suer
     * @param {string} lastName lastname of the user
     * @param {string} email email of the user
     * @param {string} password password to signup
     * @returns a promise containing jwt token
     */
    static async signup(firstName, lastName, email, password) {
        return new Promise((resolve, reject) => {
            axios.post("/auth/signup", { firstName, lastName, email, password }).then(response => {
                const { status, data } = response

                if (status === 200) {
                    const { message, token } = data
                    if (message === "success") resolve(token)
                    else reject(message)
                }
            })
        })
    }

    /**
     * Verify whether the token is valid and also get the user's details
     * @param {string} token
     */
    static async verifyAuthAndGetUser(token) {
        return new Promise((resolve, reject) => {
            axios.post("/auth/verifyToken", { token }).then(response => {
                const { status, data } = response
                if (status === 200) {
                    const { message, user } = data
                    if (message === "valid") resolve(user)
                    else reject()
                }
            })
        })
    }
}
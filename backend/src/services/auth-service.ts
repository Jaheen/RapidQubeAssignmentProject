import { Users } from "database/models"
import * as jwt from "jsonwebtoken"
import { SHA512 } from "crypto-js"
import { AppMailer } from "api/mail"


/**
 * Service to handle logic related to authentication.
 */
export default class AuthService {

    /**
     * Login with email and password
     * @param email mail address of the user
     * @param password plain text password of the user
     * @returns a promise containing token
     */
    static async login(email: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            // find a user with same email address
            Users.findOne({ email }).then(user => {
                // if such user present verify password hash and send token
                if (user) {
                    const hash: string = SHA512(password).toString()
                    if (hash === user.password) {
                        const token: string = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY)
                        resolve(token)
                    } else
                        reject("password-mismatch")
                } else
                    reject("user-not-exists")
            }).catch(console.log)
        })
    }

    /**
     * Register a new user with the data
     * @param firstName firstName of the new user
     * @param lastName lastName of the new user
     * @param email email address of the new user
     * @param password password to be set
     * @returns a promise containing the token
     */
    static async signup(firstName: string, lastName: string, email: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            // find if user already exists
            Users.findOne({ email }).then(user => {
                // if not exists create user and authenticate or reject
                if (user) reject("user-already-exists")
                else {
                    const hash = SHA512(password).toString()
                    Users.create({ firstName, lastName, email, password: hash }).then(user => {
                        const token: string = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY)
                        resolve(token)
                        AppMailer.sendSimpleTextMail(
                            user.email,
                            "RapidQube Assignment Project Signup",
                            `Dear name,\n\tThank you for signing up in my project. If you're seeing this mail means you're an user of my project`
                        )
                    })
                }
            }).catch(console.log)
        })
    }

    /**
     * Verify a jwt token and find a user
     * @param token jwt token from the user
     * @returns user if token is valid reject otherwise
     */
    static async verifyToken(token: string): Promise<object> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data: any) => {
                if (err) reject()
                else {
                    const { userId } = data
                    Users.findOne({ _id: userId }, { _id: 1, firstName: 1, lastName: 1, email: 1 }).then(user => {
                        if (user) {
                            const userData = user.toJSON()
                            userData["userId"] = userData._id
                            delete userData._id
                            resolve(userData)
                        }
                        else reject()
                    }).catch(console.log)
                }
            })
        })
    }
}

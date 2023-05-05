import { Request, Response } from "express";
import { AuthService } from "services";

/**
 * Controller to handle all request related to authentication
 */
export default class AuthController {

    /**
     * Controller method to handle login request
     */
    static async login(req: Request, res: Response) {

        const { email, password } = req.body

        if (typeof email === "string" && /.*@.*\.*/.test(email)) {
            if (typeof password === "string" && password.trim() !== "") {

                // if both email and password are not null or empty pass them to auth service
                AuthService.login(email, password)
                    .then(token => res.json({ message: "success", token }))
                    .catch(reason => res.json({ message: reason }))

            } else
                res.status(400).json({ error: "password-not-provided" })
        } else
            res.status(400).json({ error: "email-not-provided" })
    }

    /**
     * Controller method to handle signup request
     */
    static async signup(req: Request, res: Response) {

        const { firstName, lastName, email, password } = req.body

        if (typeof firstName === "string" && firstName.trim() !== "") {
            if (typeof email === "string" && /.*@.*\.*/.test(email)) {
                if (typeof password === "string" && password.trim() !== "") {

                    // if firstname email and password are not empty or null then pass them to auth service
                    AuthService.signup(firstName, lastName, email, password)
                        .then(token => res.json({ message: "success", token }))
                        .catch(reason => res.json({ message: reason }))

                } else
                    res.status(400).json({ error: "password-not-provided" })
            } else
                res.status(400).json({ error: "email-not-provided" })
        } else
            res.status(400).json({ error: "first-name-not-provided" })
    }

    /**
     * Controller method to verify token and return user
     */
    static async verifyToken(req: Request, res: Response) {
        const { token } = req.body

        if (typeof token === "string" && token.trim() !== "") {
            AuthService.verifyToken(token)
                .then(user => res.json({ message: "valid", user }))
                .catch(() => res.json({ message: "invalid" }))
        } else
            res.status(400).json({ error: "token not provided" })
    }
}
import { NextFunction, Request, Response } from "express";
import { AuthService } from "services";


/**
 * Middleware to block unauthorized requests
 * 
 * @param request HTTP Request object
 * @param response HTTP Response object
 * @param next next function to pass control to next middleware
 */
export default function AuthMiddleware(request: Request, response: Response, next: NextFunction) {
    // get the auth header it will be like 'Bearer some-token'
    const authorization: string = request.headers.authorization

    // check if token is not null or empty string
    if (authorization && authorization.trim() !== "") {
        const splitAuthHeader: Array<string> = authorization.split(" ")

        if (splitAuthHeader.length === 2) {
            const token: string = splitAuthHeader[1]

            if (token && token.trim() !== "")
                AuthService.verifyToken(token).then((user: any) => {
                    // set user id as custom property so that we can access it in controllers
                    request["userId"] = user.userId
                    next()
                }).catch(reason => {
                    // if userId is null means user not found
                    response.status(401).json({ error: "invalid user" })
                })
            else
                // if token not found then it is a unauthorized request
                response.status(401).json({ error: "auth token not provided" })

        } else
            // if token not found then it is a unauthorized request
            response.status(401).json({ error: "auth token not provided" })

    } else
        // if authorization header not found then it is a unauthorized request
        response.status(401).json({ error: "auth token not provided" })
}

import createError from 'http-errors'
import { verifyJWT } from './tools.js'
import AuthorsModel from '../authors/schema.js'

export const JWTAuthMiddleware = async (req, res, next) => {
    console.log(req.headers)
    // 1. check the auth header
    if (!req.headers.authorization) {
        console.log("here")
        next(createError(401, "Show credentials!"))
    } else {
        try {
            // 2. extract
            const token = req.headers.authorization.replace("Bearer", "")
            console.log(token)

            // 3. verify
            const decodedToken = await verifyJWT(token)

            console.log(decodedToken)

            // 4. find author
            const author = await AuthorsModel.findById(decodedToken._id)
            if (author) {
                req.author = author
                next()
            } else {
                next(createError(404, "User not found!"))
            }
        } catch (error) {
            console.log(error)
            next(createError(401, "Token Expired!"))

        }
    }
}
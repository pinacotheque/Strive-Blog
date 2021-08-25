import createError from 'http-errors'
import {verifyJWT} from './tools.js'
import AuthorsModel from '../authors/schema.js'

export const JWTAuthMiddleware = async (req, res, next) => {
    console.log(req.headers)
    // 1. check the auth header
    if(!req.headers.authorization) {
        next(createError(401, "Show credentials!"))
    } else {
        try {
            // 2. extract
            const token = req.headers.authorization.replace("Bearer", "")
            
            // 3. verify
            const decodedToken = await verifyJWT(token)
        } catch (error) {
            
        }
    }
}
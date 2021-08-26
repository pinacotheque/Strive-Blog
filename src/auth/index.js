import express from "express"
import AuthorModel from "../authors/schema.js"
import { JWTAuthenticate } from "./tools.js"

const authRouter = express.Router()


authRouter.get("/test", (req, res) => {
    res.send({ message: "Test success" })
})

authRouter.post("/register", async (req, res, next) => {
    const newUser = new AuthorModel(req.body)
    await newUser.save()

    const { accessToken } = await JWTAuthenticate(newUser)

    res.status(201).send({ accessToken })

})

authRouter.post("/login", async (req, res, next) => {

    try {
        const user = await AuthorModel.checkCredentials(req.email, req.password)

        if (user) {

            const { accessToken } = await JWTAuthenticate(user)

            res.status(200).send({ accessToken })
        }
    } catch (error) {
        console.log(error)
        next(error)
    }

})


//register
// -expecting email, password
// create a new user
// create a new token using the newly created user
// send back to the frontend the token with 201


//login
// expecting email, password

// check if there is a match between the received email and passwrod and an entry in the db
// create a new token
//send back the token
// else error 400



export default authRouter
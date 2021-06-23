import express from 'express'
import listEndpoints from 'express-list-endpoints'
import cors from 'cors'

import usersRouter from './services/authors/index.js'

const server = express()

const port = 3001

server.use(cors())

server.use(express.json())

server.use("/users", usersRouter)

console.table(listEndpoints(server))

server.listen(port, ()=> {
    console.log("Server is running on the port " + port)
})

server.on("error", (error) =>
    console.log(error))
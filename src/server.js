import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";

import authorsRouter from "./authors/index.js";
import authRouter from "./auth/index.js";

import { notFound, forbidden, catchAllErrorHandler } from './errorHandlers.js'

import blogsRouter from './blogs/index.js'
import mongoose from 'mongoose'

const server = express();


const port = process.env.PORT

// console.log("DB CONNECTION STRING: ", process.env.MYDBCONNECTIONSTRING)
mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })

server.use(cors());
server.use(express.json());


server.use("/blogs", blogsRouter)
server.use("/auth", authRouter)
server.use("/authors", authorsRouter);

server.use(notFound)
server.use(forbidden)
server.use(catchAllErrorHandler)

console.table(listEndpoints(server))

server.listen(port, () => console.log(" Server is running on port : ", port));

server.on("error", (error) =>
  console.log(` Server is not running due to : ${error}`)
);

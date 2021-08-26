import express from "express";
import mongoose from 'mongoose'
import AuthorModel from './schema.js'
import { JWTAuthenticate, refreshTokens } from "../auth/tools.js";
import { JWTAuthMiddleware } from "../auth/middlewares.js";


const authorsRouter = express.Router()

authorsRouter.post("/register", async (req, res, next) => {
  try {
    const newAuthor = new AuthorModel(req.body)
    const { _id } = await newAuthor.save()

    res.status(201).send({ _id })

  } catch (error) {
    next(error)
  }
})

authorsRouter.get("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const authors = await AuthorModel.find()
    res.send(authors)
  } catch (error) {
    next(error)
  }
})

authorsRouter.get("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    res.send(req.author)
  } catch (error) {
    next(error)
  }
})

authorsRouter.put("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    req.user.name = 'whatever'
    await req.user.save()
  } catch (error) {
    next(error)
  }
})
authorsRouter.delete("/:authorId", async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
})




export default authorsRouter;
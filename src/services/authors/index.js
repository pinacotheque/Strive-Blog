import express from 'express'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'


const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename)

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        
    } catch (error) {
        res.send(500).send({message: error.message})
    }
})


router.post("/", async (req, res, next) => {
    try {
        
    } catch (error) {
        res.send(500).send({message: error.message})
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        
    } catch (error) {
        res.send(500).send({message: error.message})
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        
    } catch (error) {
        res.send(500).send({message: error.message})
    }
})

router.update("/:id", async (req, res, next) => {
    try {
        
    } catch (error) {
        res.send(500).send({message: error.message})
    }
})

export default router

import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import AuthorModel from '../authors/schema.js'

export const JWTAuthenticate = async author => {

  // 1. user -> tokens with user.id payload
  const accessToken = await generateJWT({ _id: author._id })
  // const refreshToken = await generateRefreshJWT({ _id: author._id })

  // // 2. save save refresh token in db
  // author.refreshToken = refreshToken
  // await author.save()

  return { accessToken }
}


// A N L A M A D I M  T A M //
const generateJWT = payload =>
  new Promise((resolve, reject) =>
    jwt.sign(payload, "98asy9fa8s7hdfa9s7dfgha9sd7fgas897dfghas8y7dufbnij23gb4inlkjmfpsofgjdsy5eshterwjrsd", { expiresIn: "2 days" }, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  )

const generateRefreshJWT = payload =>
  new Promise((resolve, reject) =>
    jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "1 week" }, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  )


export const verifyJWT = token => {

  console.log(process.env.JWT_SECRET)

  return new Promise((resolve, reject) =>
    jwt.verify(token, "98asy9fa8s7hdfa9s7dfgha9sd7fgas897dfghas8y7dufbnij23gb4inlkjmfpsofgjdsy5eshterwjrsd", (err, decodedToken) => {
      if (err) reject(err)
      resolve(decodedToken)
    }))
}

const verifyRefreshJWT = token =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decodedToken) => {
      if (err) reject(err)
      resolve(decodedToken)
    })
  )
export const refreshTokens = async actualRefreshToken => {
  try {
    // 1. Is the actual refresh token still valid?

    const decoded = await verifyRefreshJWT(actualRefreshToken)

    // 2. If the token is valid we are going to find the user in db

    const user = await UserModel.findById(decoded._id)

    if (!user) throw new Error("User not found")

    // 3. Once we have the user we can compare actualRefreshToken with the one stored in db

    if (actualRefreshToken === user.refreshToken) {
      // 4. If everything is fine we can generate the new pair of tokens

      const { accessToken, refreshToken } = await JWTAuthenticate(user)
      return { accessToken, refreshToken }
    } else {
    }
  } catch (error) {
    throw new Error("Token not valid!")
  }
}
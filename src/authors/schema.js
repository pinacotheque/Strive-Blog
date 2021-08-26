import mongoose from "mongoose"
import bcrypt from "bcrypt"

const { Schema, model } = mongoose

const AuthorSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },

})

AuthorSchema.statics.checkCredentials = async function (email, plainPW) {
  // 1. find user in db by email

  const user = await this.findOne({ email })
  console.log(user)

  if (user) {
    // 2. if user is found we need to compare plainPW with hashed PW
    const isMatch = await bcrypt.compare(plainPW, user.password)

    // 3. return a meaningful response

    if (isMatch) return user
    else return null
  } else {
    return null
  }
}

const AuthorModel = model("Author", AuthorSchema)
export default AuthorModel
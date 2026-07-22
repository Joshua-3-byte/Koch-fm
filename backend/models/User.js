import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
email: {
  type: String,
  required: true,
  unique: true
},
password: {
  type: String,
  required: true,
  minLength: 6
},
role: {
  type: String,
  enum: ['reader', 'admin'],
  default: 'admin'
}
},{timestamps: true})

userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) {
       next()
  } else{
      try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
      } catch (error) {
        next(error)
      }
  }
})

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)
export default User
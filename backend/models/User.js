const { Schema, model } = require('mongoose')
const PLM = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true
    },
    userName: {
      type: String,
      unique: true
    },
    game: String,
    img:{
      type: String,
      default: 'https://www.uic.mx/posgrados/files/2018/05/default-user.png'
    },
    fb: String,
    role: {
      type: String,
      enum: ['admin', 'gamer'],
      default: 'gamer'
    },
  },
 
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.plugin(PLM, {
  usernameField: 'userName'
})

module.exports = model('User', userSchema)
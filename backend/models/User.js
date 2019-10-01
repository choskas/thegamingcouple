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
    game: {
      ref: 'Game',
      type: Schema.Types.ObjectId
    },
    img:{
      type: String,
      default: 'https://www.uic.mx/posgrados/files/2018/05/default-user.png'
    },  
    team: {
      ref: 'Team',
      type: Schema.Types.ObjectId
    },
    fb: String
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
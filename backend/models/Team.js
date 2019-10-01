const { Schema, model } = require('mongoose')


const teamSchema = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    img: {
      type: String
    },
    description: String,
    game: {
      ref: 'Game',
      type: Schema.Types.ObjectId
    },
    members:[]
  },
  {
    timestamps: true,
    versionKey: false
  }
)



module.exports = model('Team', teamSchema)
const { Schema, model } = require('mongoose')

const gameSchema = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    description: {
      type: String
    },
    img:{
      type: String
    },
    video: String,  
    price: String,
    playgame: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)


module.exports = model('Game', gameSchema)
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
    owner : {
      ref: 'User',
      type: Schema.Types.ObjectId
    },
    game: String,
    searching: String,
    members:[{
      ref: 'User',
      type: Schema.Types.ObjectId
    }]
  },
  {
    timestamps: true,
    versionKey: false
  }
)



module.exports = model('Team', teamSchema)
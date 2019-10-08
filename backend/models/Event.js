const { Schema, model } = require('mongoose')


const eventSchema = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    img: {
      type: String
    },
    imgHome: String,
    description: String,
    price: String,
    getTickets: String,
    location: {
      type: {
        type: String,
        default: 'Point'
      },
      address: {
        type: String
      },
      coordinates: {
        type: [Number]
      }
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
)

eventSchema.index({
  location: '2dsphere'
})



module.exports = model('Event', eventSchema)
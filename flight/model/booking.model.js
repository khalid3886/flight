const mongoose=require('mongoose')
const bookingSchema=mongoose.Schema({
user:String,
flight:String
},{
    versionKey:false
})
const BookingModel=mongoose.model('bookings',bookingSchema)
module.exports={
BookingModel
}
const express=require("express")
const bookingRouter=express.Router()
const {BookingModel}=require('../model/booking.model')
const{auth}=require('../middleware/auth.middleware')
const {FlightModel}=require('../model/flight.model')

bookingRouter.post('/:id',auth,async(req,res)=>{
    const _id=req.params.id
    const {userID}=req.headers
    try{
        const booking=new BookingModel({user:userID,flight:_id})
        await booking.save()
        res.status(201).json({msg:'flight has been booked'})
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})
bookingRouter.get('/dashboard',auth,async(req,res)=>{
const {userID}=req.headers
try{
const bookings=await BookingModel.find({user:userID})
const flightdata=[]
bookings.forEach(async (booking)=>{
    const flightid=booking.flight
    const flight=await FlightModel.findOne({_id:flightid})
    flightdata.push(flight)
})
res.status(200).json(flightdata)
}
catch(err)
{
    res.status(400).json({error:err})
}
})

bookingRouter.delete('/dashboard/:id',auth,async(req,res)=>{
    const _id=req.params.id
    try{
        await BookingModel.findByIdAndDelete(_id)
        res.status(202).json({msg:'booking info has been deleted'})
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})

bookingRouter.patch('/dashboard/:id',auth,async(req,res)=>{
    const {data}=req.body
    const _id=req.params.id
    try{
        await BookingModel.findByIdAndUpdate(_id,{data})
        res.status(204).json({msg:'data has been updated'})
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})

module.exports={
    bookingRouter
}
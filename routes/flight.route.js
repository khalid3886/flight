const express=require("express")
const flightRouter=express.Router()
const {auth}=require('../middleware/auth.middleware')
const {FlightModel}=require('../model/flight.model')

flightRouter.get('/',async (req,res)=>{
    try{
        const date=new Date()
        const flights=await FlightModel.find({departureTime:{$gte:date}})
        res.status(200).json(flights)
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})

flightRouter.post('/',auth,async(req,res)=>{
    const {airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price}=req.body
    try{
        const flight=new FlightModel({airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price})
        await flight.save()
        res.status(201).json({msg:'flight has been added'})
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})
flightRouter.get('/:id',async(req,res)=>{
    const _id=req.params.id
    try{
        const flight= await FlightModel.findOne({_id})
        if(flight){
            res.status(200).json(flight)
        }else{
            res.status(404).json({msg:'flight not found'})
        }
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})

flightRouter.patch('/:id',auth,async(req,res)=>{
    const _id=req.params.id
    const {airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price}=req.body
    try{
        await FlightModel.findByIdAndUpdate(_id,{airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price})
        res.status(204).json({msg:'flight info has been updated'})
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})
flightRouter.delete('/:id',auth,async(req,res)=>{
    const _id=req.params.id
    try{
        await FlightModel.findByIdAndDelete(_id)
        res.status(202).json({msg:'flight info has been deleted'})
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})

module.exports={
    flightRouter
}
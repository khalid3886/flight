const express=require('express')
const app=express()
const {connection}=require('./db')
const {userRouter}=require('./routes/user.route')
const {flightRouter} = require('./routes/flight.route')
const {bookingRouter}=require('./routes/booking.route')

app.use(express.json())
app.use('/users',userRouter)
app.use('/flights',flightRouter)
app.use('/booking',bookingRouter)

app.get('/',(req,res)=>{
    res.send('home page')
})
app.listen(8080,async()=>{
    console.log('connected to server')
    try{
        await connection
        console.log('connected to db')
    }
    catch(err)
    {
        console.log(err)
    }
})
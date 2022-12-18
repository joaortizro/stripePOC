const express = require('express')
const path = require('path')
const {createPaymentIntent} = require('./createPaymentIntent')

const app = express()

const clientPath = path.join(__dirname,'../client/')

app.use(express.static(clientPath))
app.use(express.json())

app.get('/',(req,res)=>{
    res.sendFile(clientPath+'checkout.html')
})

app.post('/create-payment-intent',async (req,res)=>{

})

app.listen(3000,()=>console.log('started!'))
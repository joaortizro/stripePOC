const express = require('express')
const path = require('path')
const { allowedNodeEnvironmentFlags } = require('process')
const {createPaymentIntent} = require('./createPaymentIntent')
const {createSetupIntent} = require('./createSetupIntent')
const app = express()

const clientPath = path.join(__dirname,'../client/')

app.use(express.static(clientPath))
app.use(express.json())

app.get('/quickstart',(req,res)=>{
    res.sendFile(clientPath+'checkout.html')
})

app.get('/token',(req,res)=>{
    res.sendFile(clientPath+'token.html')
})

app.get('/secret', async (req, res) => {
    const customerId='cus_MwKhnmnXAN49Md'
    const intent = await createSetupIntent(customerId)
    res.json({clientSecret: intent.client_secret});
});

app.get('/setupfuture',(req,res)=>{
    res.sendFile(clientPath+'setupfuture.html')
})

app.get('/setupcomplete',(req,res)=>{
    console.log("SETUP COMPLETE",req,res)
    res.sendFile(clientPath+'setupcomplete.html')
})
app.post('/create-payment-intent',async (req,res)=>{
    const { items } = req.body;
    console.log("🚀 , file: server.js:38 , app.post , items", items)
    const response = await createPaymentIntent(items)
    console.log("🚀 , file: server.js:39 , app.post , response", response)
    res.send({
        clientSecret: response.client_secret,
     });
})

app.listen(3000,()=>console.log('started! on 3000'))
const config = {
    publicKey:process.env.PUBLIC_KEY,
    secretKey:process.env.SECRET_KEY
}

const stripe = require('stripe')

const stripeInstance = stripe(config.secretKey)

const calculateAmount= (items)=>{
    console.log(items)
    return items.reduce((i,j)=>Number(i.price+j.price))
}

const createPaymentIntent = async(items) =>{
    try{
        const paymentIntent = await stripeInstance.paymentIntents.create({
            amount : Math.ceil(calculateAmount(items)*100),
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        })
        return paymentIntent
    }catch(e){
        throw e
    }
}

module.exports = {createPaymentIntent};
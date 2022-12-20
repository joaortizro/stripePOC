
const config = {
    publicKey:process.env.PUBLIC_KEY,
    secretKey:process.env.SECRET_KEY
}

const stripe = require('stripe')

const stripeInstance = stripe(config.secretKey)

const createPaymentIntent = async() =>{
    try{
        const paymentIntent = await stripeInstance.paymentIntents.create({
            amount : 1000,
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
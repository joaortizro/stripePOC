const config = {
    publicKey:'pk_test_51Lk7XsJP7vwCwKXOBSerpCeQRlgu4yA9J8V13k2vHk1ZUdSVLL3tEafypsK6DrlyiKy0DBbfBpfU7xRMeMbFmq8x00mjWNklmG',
    secretKey:'sk_test_51Lk7XsJP7vwCwKXOFZxGRUXIVBNVup5CNZeBVdghdsgFu8evB6yWBhW8z5QHMsjThuJ5GvQRnlUD2Dft6f4BaIAD00S9vUBxig'
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

const createCustomer = async()=>{
    try{
        const customer = stripeInstance.customers.create()
        return customer
    }catch(e){
        throw e
    }
}

module.exports ={
    createCustomer,
    createPaymentIntent
}
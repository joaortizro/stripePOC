
const config = {
    publicKey:process.env.PUBLIC_KEY,
    secretKey:process.env.SECRET_KEY
}

const stripe = require('stripe')

const stripeInstance = stripe(config.secretKey)

const createSetupIntent = async(customerId) =>{
    try{
        const setupIntent = await stripeInstance.setupIntents.create({
            customer:customerId,
            payment_method_types: ['card'],
          });
        return setupIntent
    }catch(e){
        throw e
    }
}

module.exports = {createSetupIntent};
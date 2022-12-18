const config = {
    publicKey:'pk_test_51Lk7XsJP7vwCwKXOBSerpCeQRlgu4yA9J8V13k2vHk1ZUdSVLL3tEafypsK6DrlyiKy0DBbfBpfU7xRMeMbFmq8x00mjWNklmG',
    secretKey:'sk_test_51Lk7XsJP7vwCwKXOFZxGRUXIVBNVup5CNZeBVdghdsgFu8evB6yWBhW8z5QHMsjThuJ5GvQRnlUD2Dft6f4BaIAD00S9vUBxig'
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
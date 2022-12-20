
const config = {
    publicKey:process.env.PUBLIC_KEY,
    secretKey:process.env.SECRET_KEY
}

const stripe = require('stripe')

const stripeInstance = stripe(config.secretKey)

const createCheckoutSession = async () => {
    try {
        const session = await stripeInstance.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'T-shirt',
                        },
                        unit_amount: 2000,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/success.html`,
            cancel_url: `http://localhost:3000/cancel.html`,
        });
        console.log("🚀 , file: createCheckoutSession.js , line 29 , createCheckoutSession , session", session)
        return session
    } catch (e) {
        console.error(e)
    }
}

createCheckoutSession()

//module.exports = { createPaymentIntent };
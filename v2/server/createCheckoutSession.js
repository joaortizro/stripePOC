const config = {
    publicKey: 'pk_test_51Lk7XsJP7vwCwKXOBSerpCeQRlgu4yA9J8V13k2vHk1ZUdSVLL3tEafypsK6DrlyiKy0DBbfBpfU7xRMeMbFmq8x00mjWNklmG',
    secretKey: 'sk_test_51Lk7XsJP7vwCwKXOFZxGRUXIVBNVup5CNZeBVdghdsgFu8evB6yWBhW8z5QHMsjThuJ5GvQRnlUD2Dft6f4BaIAD00S9vUBxig'
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
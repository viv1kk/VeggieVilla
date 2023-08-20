const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
    [1, { price:10000, name:"Apple"}],
    [2, { price:100000, name:"Bpple"}]
])


const createCheckoutSession = async (req, res)=>{
    try{
        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types : ['card'],
            mode : 'payment',
            line_items : [{
                    price_data: {
                        currency: 'inr',
                        product_data : {
                            name : 'Apple'
                        },
                        unit_amount : 1000
                    },
                    quantity : 1
                }],
            success_url : 'http://127.0.0.1:3000/cart',
            cancel_url : 'http://127.0.0.1:3000/'
        })
        console.log(stripeSession.url)
        // sending the url
        res.status(201).json({url : stripeSession.url})
    }
    catch(error)
    {
        res.status(500).json({error : error.message})
    }
}

module.exports = { createCheckoutSession }
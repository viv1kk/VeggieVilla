const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
    [1, { price:10000, name:"Apple"}],
    [2, { price:100000, name:"Bpple"}]
])


const createCheckoutSession = async (req, res)=>{
    try{
        const stripeSession = await stripe.checkout.sessions.create({
            shipping_address_collection : {"allowed_countries": ["IN"]},
            shipping_options :[
                {
                "shipping_rate_data": {
                    "type": "fixed_amount",
                    "fixed_amount": {"amount": 18000, "currency": "inr"},
                    "display_name": "Shipping Cost",
                },
            }],
            payment_method_types : ['card'],
            mode : 'payment',
            line_items : [{
                    price_data: {
                        currency: 'inr',
                        product_data : {
                            name : 'Apple'
                        },
                        unit_amount : 1000,
                    },
                    quantity : 1
                }],
            success_url : 'http://127.0.0.1:3000/cart',
            cancel_url : 'http://127.0.0.1:3000/'
        })
        // sending the url
        res.status(201).json({url : stripeSession.url, session : stripeSession})
    }
    catch(error)
    {
        res.status(500).json({error : error.message})
    }
}

module.exports = { createCheckoutSession }
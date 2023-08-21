const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const createCheckoutSession = async (req, res)=>{
    try{
        const cartItems = req.cartItems;
        const checkoutData = req.checkoutData;

        const line_items = []
        cartItems.forEach(item => {
            const str = `
            {
                "price_data": {
                    "currency" : "inr",
                    "product_data"  : {
                        "name" : "${item.item_name} with GST(18%)"
                    },
                    "unit_amount" : ${(item.item_price*100)+(item.item_price*.18*100)}
                },
                "quantity" : ${item.quantity}
            }`
            line_items.push(JSON.parse(str))
        })

        const stripeSession = await stripe.checkout.sessions.create({
            shipping_address_collection : {"allowed_countries": ["IN"]},
            shipping_options :[
                {
                "shipping_rate_data": {
                    "type": "fixed_amount",
                    "fixed_amount": {"amount": checkoutData.deliveryCharge*100, "currency": "inr"},
                    "display_name": "Shipping Cost",
                },
            }],
            payment_method_types : ['card'],
            mode : 'payment',
            line_items : line_items,
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
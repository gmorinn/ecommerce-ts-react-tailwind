import StripeCheckout from 'react-stripe-checkout'

type StripeButtonProps = {
    price: number
}

const StripeButton = ({ price }:StripeButtonProps) => {
    const priceForStripe = price * 100
    const publishKey = process.env.REACT_APP_API_KEY_STRIPE

    const onToken = (token:any) => {
        console.log(token)
        alert("Sucess")
    }

    return (
        <div className="flex content-end mb-2">
            <StripeCheckout
                label="Pay Now"
                panelLabel="Pay Now"
                description={`${price} euros.`}
                token={onToken}
                shippingAddress
                billingAddress
                zipCode
                name="Starter-Pack"
                amount={priceForStripe}
                currency="EUR"
                image="https://stripe.com/img/documentation/checkout/marketplace.png"
                stripeKey={publishKey ? publishKey : ""}
           >
                <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Buy Now
                </button>
           </StripeCheckout>
        </div>
    )
}

export default StripeButton
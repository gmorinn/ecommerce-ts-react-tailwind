import { Button } from "@mui/material";
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
        <div className="d-flex justify-content-end mb-2">
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
                <Button size="small" className="px-4 pt-2 pb-2 text-white" type='submit' variant="contained">
                    Pay Now
                </Button>
           </StripeCheckout>
        </div>
    )
}

export default StripeButton
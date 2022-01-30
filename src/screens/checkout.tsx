import { FC, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import CartResume from "../components/products/CartResume";
import { cartItemsAtom } from "../store/cart";
import StripeButton from "../components/StripeButton";
import RemoveShoppingCartIcon from '../assets/icons/remove.svg';
import useRouter from '../hooks/useRouter'

const Checkout: FC = () => {
    const [displayItem, setDisplayItem] = useState<number>(0)
    const items = useRecoilValue(cartItemsAtom)
    const router = useRouter()

    useEffect(() => {
        setDisplayItem(() => items.reduce((q, item) => q + item.quantity * item.price, 0))
    }, [items])

    return (
        <>
        {
            displayItem <= 0 ? 
                <div className="text-center p-5">
                    <img src={RemoveShoppingCartIcon} alt="remove" className="mb-4 w-1/6 mx-auto"/>
                    <h2 className="mb-4">Your shopping cart is empty</h2> 
                    <button className="text-white bg-gradient-to-br from-black to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2" onClick={() => router.navigate('/shop')}>
                        Buy Now !
                    </button>
                </div> :
                <>
                    <table className="w-full text-center">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            items && items.length > 0 && items.map((v, i) => <CartResume key={i} item={v} />)
                        }
                        </tbody>
                    </table>
                    <div className="grid flex-col justify-items-end mt-4">
                        <h4 className="mb-2">TOTAL: {displayItem}€</h4>
                        <StripeButton price={displayItem} />
                        <small className="text-red-900">* Carte test: 4242 4242 4242 4242</small>
                    </div>
                </>
            }
        </>
    )
}

export default Checkout
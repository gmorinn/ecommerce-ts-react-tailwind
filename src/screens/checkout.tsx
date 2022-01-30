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
                    <img src={RemoveShoppingCartIcon} alt="" className="mb-4"/>
                    <h2 className="mb-4">Your shopping cart is empty</h2> 
                    <button className="px-4 pt-2 pb-2" onClick={() => router.navigate('/shop')}>
                        Buy Now !
                    </button>
                </div> :
                <>
                    <table>
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
                    <div className="d-flex flex-column mt-4">
                        <h4 className="d-flex justify-content-end mb-2">TOTAL: {displayItem}€</h4>
                        <StripeButton price={displayItem} />
                        <small className="text-danger d-flex justify-content-end">* Carte test: 4242 4242 4242 4242</small>
                    </div>
                </>
            }
        </>
    )
}

export default Checkout
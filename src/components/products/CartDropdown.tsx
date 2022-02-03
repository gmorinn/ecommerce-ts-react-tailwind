import { FC } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import '../../assets/scss/cartDropDown.scss'
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartHiddenAtom, cartItemsAtom } from "../../store/cart";

const CartDropdown: FC = () => {
    const cartItems = useRecoilValue(cartItemsAtom)
    const navigate = useNavigate()
    const setCartHidden = useSetRecoilState(cartHiddenAtom)

    return (
        <div className="cart-dropdown flex-col absolute flex overflow-auto bg-white">
            { cartItems && cartItems.length > 0 ?
                cartItems.map(v => {
                    return <CartItem key={v.id} id={v.id} cover={v.cover} name={v.name} price={v.price} quantity={v.quantity} category={v.category} />
                }) :
                <span className="flex content-center mx-auto mb-2 text-black">Card is empty</span>
            }
            <button onClick={() => {
                setCartHidden(v => !v)
                navigate("/checkout");
            }}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-2 py-2 text-center">
                GO TO CHECKOUT
            </button>
        </div>
    )
}

export default CartDropdown
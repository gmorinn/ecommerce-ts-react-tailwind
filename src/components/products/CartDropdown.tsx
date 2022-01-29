import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import CartItem from "./CartItem";
import '../../assets/scss/cartDropDown.scss'
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartHiddenAtom, cartItemsAtom } from "../../store/cart";

const CartDropdown: FC = () => {
    const cartItems = useRecoilValue(cartItemsAtom)
    const navigate = useNavigate()
    const setCartHidden = useSetRecoilState(cartHiddenAtom)

    return (
        <div className="cart-dropdown flex-column position-absolute d-flex overflow-auto bg-white">
            { cartItems && cartItems.length > 0 ?
                cartItems.map(v => {
                    return <CartItem key={v.id} id={v.id} cover={v.cover} name={v.name} price={v.price} quantity={v.quantity} category={v.category} />
                }) : 
                <span className="d-flex justify-content-center text-dark">Card is empty</span>
            }
            <Button variant="contained" color="primary" style={{marginTop: 'auto'}} onClick={() => {
                setCartHidden(v => !v)
                navigate("/checkout");
            }}>
                GO TO CHECKOUT
            </Button>
        </div>
    )
}

export default CartDropdown
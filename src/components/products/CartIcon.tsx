import { FC, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartHiddenAtom, cartItemsAtom } from "../../store/cart";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'


const CartIcon: FC = () => {
    const [displayItem, setDisplayItem] = useState<number>(0)
    const setCartHidden = useSetRecoilState(cartHiddenAtom)
    const cartItem = useRecoilValue(cartItemsAtom)

    useEffect(() => {
        setDisplayItem(() => cartItem.reduce((q, item) => q + item.quantity, 0))
    }, [cartItem])

    return (
        <div onClick={() => setCartHidden(v => !v)}>
            <span className="text-dark">
                <AddShoppingCartIcon />
                {displayItem}
            </span>
        </div>
    )
}

export default CartIcon
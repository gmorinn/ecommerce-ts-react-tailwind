import { useRecoilState } from "recoil";
import { cartItemsAtom } from "../../store/cart";
import { ProductDetails } from "../../utils/types";

type CartResumeProps = {
    item: ProductDetails
}

const CartResume = ({ item }:CartResumeProps) => {
    const [cartItem, setCartItem] = useRecoilState(cartItemsAtom)

    const addItem = (items:ProductDetails[], newItem: ProductDetails) => {
        const isExist = items.find(item => item.id === newItem.id)

        if (isExist?.id) {
            setCartItem(items.map(item => item.id === newItem.id 
                    ? {...item, quantity: item.quantity + 1} 
                    : item
            ))
        } else {
            setCartItem(() => [...items, { ...newItem, quantity: 1 }])
        }
    }

    const removeItem = (items:ProductDetails[], removeItem:ProductDetails) => {
        const itemToRemove = items.find(item => item.id === removeItem.id)
        if (itemToRemove?.quantity === 1) {
            setCartItem(items.filter(item => item.id !== removeItem.id))
        } else {
            setCartItem(items.map(item => item.id === removeItem.id 
                ? {...item, quantity: item.quantity - 1} 
                : item))
        }
    }

    return (
        <tr>
             <td>
                <img src={item.cover} alt="img"  className="mx-auto" style={{width: '170px'}} />
            </td>
            <td>
                <span>{item.name}</span>
            </td>
            <td>
                <span>
                    <span style={{cursor: 'pointer'}} onClick={() => removeItem(cartItem, item)}>&#10094;</span>
                        <span style={{margin: '0 10px'}}>{item.quantity}</span>
                    <span style={{cursor: 'pointer'}} onClick={() => addItem(cartItem, item)}>&#10095;</span>
                </span>
            </td>
            <td>
                <span>{item.price}$</span>
            </td>
            <td>
                <span style={{cursor: 'pointer'}} onClick={() => setCartItem(cartItem.filter(v => v.id !== item.id))}>&#10005;</span>
            </td>
        </tr>
    )
}

export default CartResume
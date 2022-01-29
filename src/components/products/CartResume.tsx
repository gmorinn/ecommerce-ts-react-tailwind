import { useRecoilState } from "recoil";
import { TableRow, TableCell } from '@mui/material';
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
        <TableRow>
             <TableCell>
                <img src={item.cover} alt="img" style={{width: '170px'}} />
            </TableCell>
            <TableCell>
                <span>{item.name}</span>
            </TableCell>
            <TableCell>
                <span>
                    <span style={{cursor: 'pointer'}} onClick={() => removeItem(cartItem, item)}>&#10094;</span>
                        <span style={{margin: '0 10px'}}>{item.quantity}</span>
                    <span style={{cursor: 'pointer'}} onClick={() => addItem(cartItem, item)}>&#10095;</span>
                </span>
            </TableCell>
            <TableCell>
                <span>{item.price}$</span>
            </TableCell>
            <TableCell>
                <span style={{cursor: 'pointer'}} onClick={() => setCartItem(cartItem.filter(v => v.id !== item.id))}>&#10005;</span>
            </TableCell>
        </TableRow>
    )
}

export default CartResume
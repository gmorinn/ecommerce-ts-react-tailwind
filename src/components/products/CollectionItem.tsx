import { Card, CardMedia, Button, CardContent } from '@mui/material';
import { useRecoilState } from "recoil";
import { cartItemsAtom } from "../../store/cart";
import { ProductDetails } from '../../utils/types';

type CollectionItemProps = {
    item: ProductDetails,
}

const CollectionItem = ({ item }:CollectionItemProps) => {
    const { name, price, cover } = item
    const [cartItem, setCartItem] = useRecoilState(cartItemsAtom)

    const addItem = (items:ProductDetails[], newItem:ProductDetails) => {
        const isExist = items.find(item => item.id === newItem.id)

        if (isExist) {
            setCartItem(items.map(item => 
                item.id === newItem.id 
                    ? {...item, quantity: item.quantity + 1} 
                    : item
            ))
        } else {
            setCartItem([...items, { ...newItem, quantity: 1 }])
        }
    }
    return (
            <Card>
                <CardMedia
                    className="product-items"
                    component="img"
                    height="400"
                    image={cover.substring(0, 4) !== "http" ? process.env.REACT_APP_API_URL + cover : cover}
                    alt="Items"
                />
                <CardContent className="">
                    <div className="mb-2">
                        <>{name}</><br />
                        <>{price}$</>
                    </div>
                    <Button  variant="contained" onClick={() => addItem(cartItem, item)}>
                        ADD TO CART
                    </Button>
                </CardContent>
            </Card>
    )
}

export default CollectionItem
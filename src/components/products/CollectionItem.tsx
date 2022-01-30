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
        <div className="w-full">
            <img
                className="product-items w-full object-fill"
                src={cover.substring(0, 4) !== "http" ? process.env.REACT_APP_API_URL + cover : cover}
                alt="Items"
            />
            <div className="flex justify-between items-center content-center">
                <div className="mb-2">
                    <>{name}</><br />
                    <>{price}$</>
                </div>
                <button 
                    type="button"
                    onClick={() => addItem(cartItem, item)}
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-2 py-2 text-center">
                    ADD TO CART
                </button>
            </div>
        </div>
    )
}

export default CollectionItem
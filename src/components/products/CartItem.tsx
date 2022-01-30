import { ProductDetails } from "../../utils/types";

const CartItem = ({ cover, name, price, quantity }:ProductDetails) => {
    return (
        <div className="w-full flex mb-2 text-black" style={{height: '80px'}}>
            <img src={cover} alt='test' style={{width: '30%'}}/>
            <div className="flex flex-col justify-center items-center" style={{width: '70%', padding: '10px 20px'}}>
                <span>{name}</span>
                <span>
                {price} x {quantity}
                </span>
            </div>
        </div>
    )
}

export default CartItem
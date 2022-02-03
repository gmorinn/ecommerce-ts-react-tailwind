import { FC, useEffect, useState } from "react";
import PreviewAll from "../components/products/PreviewAll";
import { useApi } from '../hooks/useApi'
import ErrorIcon from '../assets/icons/error.svg';

const Shop: FC = () => {
    const [shop, setShop] = useState([])
    const { Fetch } = useApi()

    useEffect(() => {
        Fetch(`/v1/web/products`).then(resp => {
            if (resp?.success && resp.products) {
                setShop(resp.products)
            }
        })
    // eslint-disable-next-line
    }, [])

    return (
        <>
            { shop && shop.length > 0 ?
            <>
                <PreviewAll title="men" items={shop}/>
                <PreviewAll title="women" items={shop}/>
                <PreviewAll title="sneaker" items={shop}/>
                <PreviewAll title="hat" items={shop}/>
                <PreviewAll title="jacket" items={shop}/>
            </> :
            <div className="w-100 h-100">
                <h3 className="text-center p-5 mt-auto">
                    <span><img src={ErrorIcon} alt="error" className="w-1/6 mx-auto" /> </span>
                    No product available.
                </h3>
            </div>
            }
        </>
    )
}

export default Shop
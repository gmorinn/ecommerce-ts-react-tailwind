import { FC, useEffect, useState } from "react";
import PreviewAll from "../components/products/PreviewAll";
import { useApi } from '../hooks/useApi'
import ErrorIcon from '@mui/icons-material/Error';

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
                <PreviewAll title="Men" items={shop}/>
                <PreviewAll title="Women" items={shop}/>
                <PreviewAll title="Sneaker" items={shop}/>
                <PreviewAll title="Hat" items={shop}/>
                <PreviewAll title="Jacket" items={shop}/>
            </> :
            <div className="w-100 h-100">
                <h3 className="text-center p-5 mt-auto">
                    <span><ErrorIcon fontSize='large'/> </span>
                    No product available.
                </h3>
            </div>
            }
        </>
    )
}

export default Shop
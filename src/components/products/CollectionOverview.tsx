import { FC, useEffect, useState } from "react";
import PreviewCollection from "./PreviewCollection";
import { useApi } from '../../hooks/useApi'
import ErrorIcon from '../../assets/icons/error.svg';
import { useParams } from "react-router-dom";
import { ProductDetails } from "../../utils/types";
import Loader from "../Loader";

const CollectionOverview:FC = () => {
    const { Fetch, loading } = useApi()
	let { category } = useParams<{category: string}>();
    const [collections, setCollections] = useState<ProductDetails[] | null>(null)

    useEffect(() => {
        Fetch(`/v1/web/products/category/${category}`).then(resp => {
            if (resp?.success && resp.products) {
                setCollections(resp.products)
            }
        })
    // eslint-disable-next-line
    }, [])

    return (
        <>
            {loading ? <Loader /> : collections && collections.length > 0 ? 
                <PreviewCollection items={collections} />
                :
                <div className="w-full h-full">
                    <h3 className="text-center">
                        <span><img src={ErrorIcon} className="w-1/6 mx-auto" alt="error" /></span>
                        No product available.
                    </h3>
            </div>
            }
        </>
    )
}

export default CollectionOverview
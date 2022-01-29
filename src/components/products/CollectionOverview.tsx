import { FC, useEffect, useState } from "react";
import PreviewCollection from "./PreviewCollection";
import { useApi } from '../../hooks/useApi'
import ErrorIcon from '@mui/icons-material/Error';
import { useParams } from "react-router-dom";

const CollectionOverview:FC = () => {
    const { Fetch } = useApi()
	let { category } = useParams<{category: string}>();
    const [collections, setCollections] = useState([])

    useEffect(() => {
        Fetch(`/v1/web/products/category/${category?.substring(0,category?.length-1)}`).then(resp => {
            if (resp?.success && resp.products) {
                setCollections(resp.products)
            }
        })
    // eslint-disable-next-line
    }, [])

    return (
        <>
            {collections && collections.length > 0 ? 
                <PreviewCollection items={collections} />
                :
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

export default CollectionOverview
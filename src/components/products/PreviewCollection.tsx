import CollectionItem from "./CollectionItem";
import { ProductDetails } from '../../utils/types';
import { useParams } from 'react-router-dom';

type PreviewCollectionProps = {
    items: ProductDetails[]
}

const PreviewCollection = ({ items }:PreviewCollectionProps) => {
	let { category } = useParams<{category: string}>();
    return (
        <>
            <h1 className="bloc">{category?.toUpperCase()}</h1>
            <div className="mb-5 grid grid-cols-3 gap-3">
                {items && items.length > 0 && items
                    .map((item) => {
                        return (
                            <div key={item.id}>
                                <CollectionItem item={item} />
                            </div>
                        )
                    })}
            </div>
        </>
    )
}

export default PreviewCollection
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
            <h1 className="bloc text-lg text-blue-600 mb-5">{category?.toUpperCase()}</h1>
            <div className="mb-5 grid  grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
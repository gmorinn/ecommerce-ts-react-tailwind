import { ProductDetails } from "../../utils/types";
import CollectionItem from "./CollectionItem";

type PreviewAllProps = {
    title: string,
    items: ProductDetails[]
}

const PreviewAll = ({ title, items }:PreviewAllProps) => {
    return (
        <>
            <h1 className="w-full text-4xl mb-5 text-blue-900 mt-5">{title}</h1>
            <div className="mb-5 grid grid-cols-3 gap-3">
                {items && items.length > 0 && items
                    .filter(v => v.category === title.toLowerCase())
                    .map(v => {
                        return  (
                        <div key={v.id} >
                            <CollectionItem item={v} />
                        </div>
                        )
                    })}
            </div>
        </>
    )

}

export default PreviewAll
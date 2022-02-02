import { PreviewAllProps } from "../../utils/types";
import CollectionItem from "./CollectionItem";


const PreviewAll = ({ title, items }:PreviewAllProps) => {
    return (
        <>
            <h1 className="w-full text-4xl mb-5 text-blue-900 mt-5">{title}</h1>
            <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {items && items.length > 0 && items
                    .filter(v => v.category === title.toLowerCase())
                    .map((v, i) => {
                        return  (
                        <div key={v.id} data-testid={`item-${i}`}>
                            <CollectionItem item={v} />
                        </div>
                        )
                    })}
            </div>
        </>
    )

}

export default PreviewAll
import { Grid } from '@mui/material';
import { ProductDetails } from "../../utils/types";
import CollectionItem from "./CollectionItem";

type PreviewAllProps = {
    title: string,
    items: ProductDetails[]
}

const PreviewAll = ({ title, items }:PreviewAllProps) => {
    return (
        <Grid container spacing={2} className="mb-5">
        <h1 className="w-100">{title}</h1>
            {items && items.length > 0 && items
                .filter(v => v.category === title.toLowerCase())
                .map(v => {
                    return  (
                    <Grid item xs={6} md={3} key={v.id} >
                        <CollectionItem item={v} />
                    </Grid>
                    )
                })}
        </Grid>
    )

}

export default PreviewAll
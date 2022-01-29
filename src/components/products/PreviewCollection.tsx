import { Grid } from '@mui/material';
import CollectionItem from "./CollectionItem";
import { ProductDetails } from '../../utils/types';
import { useParams } from 'react-router-dom';

type PreviewCollectionProps = {
    items: ProductDetails[]
}

const PreviewCollection = ({ items }:PreviewCollectionProps) => {
	let { category } = useParams<{category: string}>();
    return (
        <Grid container spacing={2} className="mb-5">
            <h1 className="w-100">{category?.toUpperCase()}</h1>
            {items && items.length > 0 && items
                .map((item) => {
                    return (
                        <Grid item xs={6} md={3} key={item.id} >
                            <CollectionItem item={item} />
                        </Grid>
                    )
                })}
        </Grid>
    )
}

export default PreviewCollection
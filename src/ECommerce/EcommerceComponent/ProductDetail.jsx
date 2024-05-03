import {
    Box,
    Typography,
    Grid,
    Button,
    IconButton,
    Divider,
    Rating,
    TextField,
    Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext } from 'react';
import { ProductContext } from '../../ContextApi/EcommerceContext';
import { useParams } from 'react-router-dom';


function ProductDetail({ product }) {

    const { selectedProduct } = useContext(ProductContext);
    console.log(selectedProduct);
    // const { title, price, photo, description } = selectedProduct;

    // const { productId } = useParams();
    // const { products } = useContext(ProductContext);
    // const product = products.find(product => product.id === productId);


    return (

        <div>
            <h2>{product.title}</h2>
            <p>Price: {product.price}</p>
            {/* Add other product details you want to display */}
        </div>

        // <Box p={2}>
        //     <Grid container spacing={2}>
        //         <Grid item xs={12} md={6}>
        //             <Paper style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        //                 <img src={product.photo} alt={product.title} style={{ width: '100%', height: 'auto', maxHeight: '100%' }} />
        //             </Paper>
        //         </Grid>
        //         <Grid item xs={12} md={6}>
        //             <Box pl={2}>
        //                 <Typography variant="h5" gutterBottom>
        //                     {product.title}
        //                 </Typography>
        //                 <Typography variant="body1" gutterBottom>
        //                     {product.description}
        //                 </Typography>
        //                 <Divider />
        //                 <Typography variant="subtitle1" gutterBottom>
        //                     Price: ${product.price}
        //                 </Typography>
        //                 <Typography variant="subtitle2" gutterBottom>
        //                     Discount Price: ${product.salesPrice}
        //                 </Typography>

        //                 <Box display="flex" alignItems="center" >
        //                     <IconButton  >
        //                         <RemoveIcon />
        //                     </IconButton>
        //                     <Typography variant="body1">1</Typography>
        //                     <IconButton >
        //                         <AddIcon />
        //                     </IconButton>
        //                 </Box>

        //                 <Box sx={{ display: 'flex', gap: "10px" }}>

        //                     <Rating name="read-only" value={product.rating} readOnly />
        //                     <Typography variant="subtitle2" color="textSecondary">
        //                         (236 reviews)
        //                     </Typography>
        //                 </Box>
        //                 <Box mt={2}>
        //                     <Button variant="contained" color="primary" onClick={handleAddToCart}>
        //                         Add to Cart
        //                     </Button>
        //                     <Button variant="contained" color="secondary" sx={{ ml: 1 }}>
        //                         Buy Now
        //                     </Button>
        //                 </Box>
        //             </Box>
        //         </Grid>
        //     </Grid>
        // </Box >
    )
}

export default ProductDetail;

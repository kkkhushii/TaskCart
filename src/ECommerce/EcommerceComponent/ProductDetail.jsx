import {
    Box,
    Typography,
    Grid,
    Button,
    IconButton,
    Divider,
    Rating,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext, useState, } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { ProductContext } from '../../ContextApi/EcommerceContext'



function ProductDetail({ product }) {

    const [selectedColor, setSelectedColor] = useState(null);
    const { addToCart } = useContext(ProductContext);
    const [quantity, setQuantity] = useState(0);

    if (!product) {
        return <Typography variant="body1">Product data is unavailable.</Typography>;
    }

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
    };
    return (

        <Box p={2}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>


                    <img src={product.photo} alt={product.title} style={{ width: '100%', height: 'auto', maxHeight: '100%' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box pl={2}>
                        <Typography variant="h5" gutterBottom>
                            {product.title}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {product.description}
                        </Typography>
                        <Divider />
                        <Typography variant="subtitle1" gutterBottom>
                            Price: ${product.price}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Discount Price: ${product.salesPrice}
                        </Typography>

                        <Box display="flex" alignItems="center" >
                            <IconButton  >
                                <RemoveIcon onClick={handleDecrement} />
                            </IconButton>
                            <Typography variant="body1">{quantity}</Typography>
                            <IconButton >
                                <AddIcon onClick={handleIncrement} />
                            </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', gap: "10px" }}>

                            <Rating name="read-only" value={product.rating} readOnly />
                            <Typography variant="subtitle2" color="textSecondary">
                                (236 reviews)
                            </Typography>
                        </Box>
                        <Divider></Divider>

                        <Box display="flex" flexWrap="wrap" gap={1}>
                            <Typography variant="body1" mr={1}>Colors:</Typography>
                            {product.colors.map((color, index) => (
                                <IconButton
                                    key={index}
                                    sx={{
                                        backgroundColor: color,
                                        width: 24,
                                        height: 24,
                                        borderRadius: '50%',
                                        marginRight: 1,
                                    }}
                                    onClick={() => setSelectedColor(color)}
                                >
                                    {selectedColor === color && <CheckIcon />}
                                </IconButton>
                            ))}
                        </Box>
                        <Box mt={2}>
                            <Button variant="contained" color="primary" onClick={() => addToCart({ ...product, quantity })}> Add to Cart </Button>
                            <Button variant="contained" color="secondary" sx={{ ml: 1 }}> Buy Now </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    )
}

export default ProductDetail;

import React from 'react'
import { Box, Typography, IconButton, Divider, Grid, Button, ButtonGroup } from '@mui/material'
import { ProductContext } from '../../ContextApi/EcommerceContext';
import { useContext } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function ProductCheckout() {
    const { cart, removeFromCart, decrementQuantity, incrementQuantity } = useContext(ProductContext);


    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };

    const calculateTotal = () => {
        let subtotal = 0;
        cart.forEach((product) => {
            subtotal += product.price * product.quantity;
        });
        return subtotal;
    };


    const calculateDiscount = () => {
        const subtotal = calculateTotal();
        return subtotal * 0.05;
    };

    const calculateGrandTotal = () => {
        const subtotal = calculateTotal();
        const discount = calculateDiscount();
        return subtotal - discount;
    };


    if (cart.length === 0) {
        return (
            <Box p={3}>
                <Typography variant="h4">No products in cart</Typography>
            </Box>
        );
    }
    return (

        <Box p={3} width={'100vw'}>
            <Typography variant="h4" gutterBottom>Products</Typography>
            <Divider />


            <Box mt={3} >
                {cart.map((product) => (
                    <Box key={product.id} mb={2}>
                        <Grid container alignItems="center" >
                            <Grid item xs={3} mr={2}>
                                <img src={product.photo} alt={product.name} style={{ width: "100%" }} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">{product.title}</Typography>
                                <Typography variant="body2" color="textSecondary">{product.categoryName}</Typography>

                                <IconButton onClick={() => handleRemoveFromCart(product.id)}>
                                    <DeleteIcon />
                                </IconButton>

                                <Box display="flex" alignItems="center">
                                    <IconButton onClick={() => decrementQuantity(product.id)} >
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography variant="body1">{product.quantity}</Typography>
                                    <IconButton onClick={() => incrementQuantity(product.id)}>
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography variant="body1"> ${product.price * product.quantity}</Typography>
                                <Typography variant="body2" color="textSecondary">Quantity: {product.quantity}</Typography>
                            </Grid>

                        </Grid>
                    </Box>
                ))}
            </Box>

            {/* Order Summary */}
            <Box mt={3}>
                <Typography variant="h6" gutterBottom>Order Summary</Typography>
                <Grid container justifyContent="space-between">
                    <Typography variant="body1">Subtotal</Typography>
                    <Typography variant="body1">${calculateTotal()}</Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                    <Typography variant="body1">Discount 5%</Typography>
                    <Typography variant="body1" sx={{ color: 'orange', fontWeight: 'bold' }}> -${calculateDiscount()}</Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                    <Typography variant="body1">Shipping</Typography>
                    <Typography variant="body1">Free</Typography>
                </Grid>
                <Divider />
                <Grid container justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h6">${calculateGrandTotal()}</Typography>
                </Grid>
            </Box>
        </Box>




    );

}

export default ProductCheckout

import {
    Box, Typography, Stack, Grid, Button,
    Rating,
    Tooltip,
    CardMedia,
    CardContent,
    Fab,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle

} from '@mui/material'
import ProductSearch from './ProductSearch'
import { useContext } from 'react'
import { ProductContext } from '../../ContextApi/EcommerceContext'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import emptyCart from '../../assets/Products/empty-shopping-cart.svg';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';


function ProductList({ onProductClick }) {

    const { filteredAndSortedProducts, selectCategory, updateSortBy, updatePriceRange, selectGender, loading, addToCart, deleteProduct } = useContext(ProductContext);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleResetFilters = () => {
        selectCategory('All');
        updateSortBy('newest');
        updatePriceRange('All');
        selectGender('All');
    }

    // const handleDeleteClick = (productId) => {
    //     deleteProduct(productId);

    // };

    const handleDeleteClick = (productId) => {
        setSelectedProductId(productId);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        deleteProduct(selectedProductId);
        setDeleteModalOpen(false);
    };

    const handleDeleteCancel = () => {
        setSelectedProductId(null);
        setDeleteModalOpen(false);
    };
    return (
        <>
            <Stack direction="row" justifyContent="space-between" pb={4} >
                <Typography variant="h5">Products</Typography>
                <Box p={0}>
                    <ProductSearch />
                </Box>
            </Stack>
            {loading ? (
                <Typography variant="h6">Loading products...</Typography>
            ) : (
                <Grid container spacing={3}>
                    {filteredAndSortedProducts && filteredAndSortedProducts.length > 0 ? (

                        <>
                            {filteredAndSortedProducts.map((product) => (

                                <Grid item xs={12} lg={4} md={4} sm={6} key={product.id}>
                                    <Card>
                                        <Box position="relative">
                                            <CardMedia component="img" width="100%" image={product.photo || product.image} alt="products" onClick={() => onProductClick(product.id, product)} />
                                            <Tooltip title="Add To Cart" placement="top-end">
                                                <Fab size="small" color="primary" style={{ position: 'absolute', bottom: '-17px', right: '8px' }}>

                                                    <ShoppingCartIcon onClick={() => addToCart({ ...product, quantity: 1 })} />
                                                </Fab>
                                            </Tooltip>
                                        </Box>
                                        <CardContent>
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Typography variant="h6" p={0}>{product.title}</Typography>


                                            </Box>
                                            <Box display="flex" alignItems="center">
                                                <Typography variant="subtitle1">${product.price}</Typography>
                                                <Typography variant="subtitle2" color="textSecondary" sx={{ ml: 1 }} style={{ textDecoration: 'line-through' }}>
                                                    ${product.salesPrice}
                                                </Typography>
                                                <Box sx={{ flexGrow: 1 }} />
                                                <Rating name="read-only" value={product.rating} readOnly sx={{ ml: 1 }} />
                                            </Box>
                                            <Box display="flex" gap="5px">


                                                <Tooltip title="Delete">
                                                    <Fab size="small" color="error" >
                                                        <DeleteIcon onClick={() => handleDeleteClick(product.id)} />
                                                    </Fab>
                                                </Tooltip>

                                                <Tooltip title="Edit">
                                                    <Fab size="small" color="primary">
                                                        <EditIcon />
                                                    </Fab>
                                                </Tooltip>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </>
                    ) : (
                        <Grid item xs={12}>

                            <Box textAlign="center" mt={6}>
                                <img src={emptyCart} alt="cart" width="200px" />
                                <Typography variant="h2">There are no products</Typography>
                                <Typography variant="h6" mb={3}>
                                    The product you are searching for is no longer available.
                                </Typography>
                                <Button variant="contained" onClick={handleResetFilters}>
                                    Try Again
                                </Button>
                            </Box>
                        </Grid>
                    )}

                </Grid >
            )
            }

            <Dialog open={deleteModalOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Delete Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this product?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>No</Button>
                    <Button onClick={handleDeleteConfirm} autoFocus>Yes</Button>
                </DialogActions>
            </Dialog>
        </>

    )
}

export default ProductList

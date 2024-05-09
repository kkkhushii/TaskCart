import { useContext, useState } from 'react'
import { ProductContext } from '../../ContextApi/EcommerceContext'
import { Button, TextField, Modal, Box, Typography, MenuItem, Grid, Avatar, FormControl, InputLabel, Select } from '@mui/material';
import { filterCategory } from '../../api/ecommerceApi/ProductFilter'


function ProductEdit({ product, onClose }) {
    const { updateProduct } = useContext(ProductContext);
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = () => {
        updateProduct(product.id, updatedProduct);
        onClose();
    };
    const handleImageUrlChange = (e) => {
        const imageUrl = e.target.value;
        setUpdatedProduct(prevState => ({
            ...prevState,
            photo: imageUrl,
        }));
    };
    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setUpdatedProduct(prevState => ({
            ...prevState,
            category: value,
        }));
    };

    const handleColorChange = (e) => {
        const { value } = e.target;
        setUpdatedProduct(prevState => ({
            ...prevState,
            colors: value.split(',').map(color => color.trim()),
        }));
    };


    return (

        <Modal open={true} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    width: 600,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Typography variant="h6" gutterBottom>Edit Product</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="ID"
                            name="id"
                            value={updatedProduct.id}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={updatedProduct.title}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            value={updatedProduct.price}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="salesPrice"
                            name="salesPrice"
                            value={updatedProduct.salesPrice}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={updatedProduct.description}
                            onChange={handleInputChange}
                            multiline
                            rows={4}
                            sx={{ mb: 2 }}
                        />
                        <FormControl sx={{ mb: 2 }}>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select labelId="category-label" id="category" name="category" label="Category" value={updatedProduct.category} onChange={handleCategoryChange}>
                                <MenuItem value="">Select Category</MenuItem>
                                {filterCategory.map((category) => (
                                    <MenuItem key={category.id} value={category.sort}>{category.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Discount"
                            name="discount"
                            value={updatedProduct.discount}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="created Date"
                            name="created"
                            value={new Date(updatedProduct.created).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: '2-digit',
                                year: 'numeric'
                            })}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Photo URL"
                            name="photo"
                            value={updatedProduct.photo}
                            onChange={handleImageUrlChange}
                            sx={{ mb: 2 }}
                        />
                        <Avatar alt="Product Image" src={updatedProduct.photo} sx={{ width: 100, height: 100, mb: 2, textAlign: "center" }} />

                        <TextField
                            fullWidth
                            select
                            label="Rating"
                            name="rating"
                            value={updatedProduct.rating}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        >
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <MenuItem key={rating} value={rating}>
                                    {rating}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            fullWidth
                            label="Colors"
                            name="colors"
                            value={updatedProduct.colors.join(', ')}
                            onChange={handleColorChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent="flex-end" gap="3px">
                    <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
                    <Button onClick={onClose} color="secondary" variant="contained">Cancel</Button>
                </Box>
            </Box>
        </Modal>




    )
}

export default ProductEdit

import { ProductContext } from '../../ContextApi/EcommerceContext'
import { useState, useContext } from 'react';
import { Button, TextField, Typography, Box, Select, MenuItem, FormControl, InputLabel, Modal, Grid } from '@mui/material';
import { filterCategory } from '../../api/ecommerceApi/ProductFilter'

function NewProductAdd({ onClose, open }) {
    const { addProduct } = useContext(ProductContext);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        price: '',
        salesPrice: '',
        rating: 1,
        stock: true,
        qty: '',
        colors: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const category = formData.category;
        addProduct(formData, category);
        setFormData({
            title: '',
            description: '',
            image: '',
            price: '',
            salesPrice: '',
            rating: 1,
            stock: true,
            qty: '',
            colors: '',

        });
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
            {/* <Box sx={{ width: 600, bgcolor: 'background.paper', padding: 2 }}> */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }} >

                <Typography variant="h5" mb={2}>Add New Product</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} sx={{ backgroundColor: "none" }}>
                        <Grid item xs={6}>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <TextField name="title" label="Title" value={formData.title} onChange={handleChange} fullWidth />
                                <TextField name="description" label="Description" value={formData.description} onChange={handleChange} fullWidth />
                                <TextField name="image" label="Image URL" value={formData.image} onChange={handleChange} fullWidth />
                                {formData.image && <img src={formData.image} alt="Product" style={{ maxWidth: '100%', marginTop: '10px' }} />}
                                <FormControl>
                                    <InputLabel id="category-label">Category</InputLabel>
                                    <Select labelId="category-label" id="category" name="category" value={formData.category} onChange={handleChange}>
                                        <MenuItem value="">Select Category</MenuItem>
                                        {filterCategory.map((category) => (
                                            <MenuItem key={category.id} value={category.sort}>{category.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    select
                                    label="Rating"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }} >
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <MenuItem key={rating} value={rating}>
                                            {rating}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <TextField name="price" type="number" label="Price" value={formData.price} onChange={handleChange} fullWidth />
                                <TextField name="salesPrice" type="number" label="Sales Price" value={formData.salesPrice} onChange={handleChange} fullWidth />
                                <TextField name="qty" type="number" label="Quantity" value={formData.qty} onChange={handleChange} fullWidth />
                                <TextField name="colors" label="Colors" value={formData.colors} onChange={handleChange} fullWidth />
                                <FormControl fullWidth>
                                    <InputLabel id="stock-label">Stock</InputLabel>
                                    <Select labelId="stock-label" id="stock" name="stock" value={formData.stock} onChange={handleChange} fullWidth>
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", gap: "4px" }}>
                        <Button type="submit" variant="contained" color="primary" mt={2}>Add</Button>
                        <Button type="submit" variant="contained" color="primary" mt={2} onClick={onClose}>close</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default NewProductAdd

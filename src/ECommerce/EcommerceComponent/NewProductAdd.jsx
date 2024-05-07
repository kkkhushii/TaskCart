import { ProductContext } from '../../ContextApi/EcommerceContext'
import { useState, useContext } from 'react';
import { Button, TextField, Typography, Rating, Box, Select, MenuItem, FormControl, InputLabel, Divider } from '@mui/material';
import { filterCategory } from '../../api/ecommerceApi/ProductFilter'
function NewProductAdd() {
    const { addProduct } = useContext(ProductContext);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        price: '',
        salesPrice: '',
        rating: 0,
        category: '',

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
            rating: 0,
            category: '',

        });

    };

    return (
        <Box>
            <Typography variant="h5">Add New Product</Typography>
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap={2}>


                    <Typography mt={2}>Product Detail</Typography>
                    <TextField
                        name="title"
                        label="Title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        name="description"
                        label="Description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    <TextField
                        name="image"
                        label="Image URL"
                        value={formData.image}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    {formData.image && (
                        <img src={formData.image} alt="Product" style={{ maxWidth: '100%', marginTop: '10px' }} />
                    )}
                </Box>
                <Divider></Divider>
                <Typography mt={2}>Product Price:</Typography>

                <TextField
                    name="price"
                    type="number"
                    label="Price"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    name="salesPrice"
                    type="number"
                    label="Sales Price"
                    value={formData.salesPrice}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <Box mt={2}>
                    <Typography>Rating:</Typography>
                    <Rating
                        name="rating"
                        value={formData.rating}
                        onChange={(event, newValue) => {
                            setFormData((prevFormData) => ({
                                ...prevFormData,
                                rating: newValue,
                            }));
                        }}
                    />
                </Box>

                <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <MenuItem value="">Select Category</MenuItem>
                        {filterCategory.map((category) => ( // Map over filterCategory array to generate menu items
                            <MenuItem key={category.id} value={category.sort}>{category.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" mt={2}>Add Product</Button>
            </form>
        </Box>

    )
}

export default NewProductAdd

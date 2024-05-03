import { ProductContext } from '../../ContextApi/EcommerceContext'
import { useState, useContext } from 'react';
import { Button, TextField, Typography, Rating, Box } from '@mui/material';


function NewProductAdd() {
    const { addProduct } = useContext(ProductContext);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        price: '',
        salesPrice: '',
        rating: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // setFormData((prevFormData) => ({
        //     ...prevFormData,
        //     [name]: value,
        // }));
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(formData);
        setFormData({
            title: '',
            image: '',
            price: '',
            salesPrice: '',
            rating: 0,
        });
    };

    return (
        <Box>
            <Typography variant="h5">Add New Product</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="title"
                    label="Title"
                    value={formData.title}
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
                <Button type="submit" variant="contained" color="primary" mt={2}>Add Product</Button>
            </form>
        </Box>
    )
}

export default NewProductAdd

import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useContext } from 'react';
import { ProductContext } from '../../ContextApi/EcommerceContext'

function ProductSearch() {


    const { searchProducts } = useContext(ProductContext);

    const handleChange = (event) => {
        searchProducts(event.target.value);
    };
    return (
        <TextField
            variant="outlined"
            id="outlined-search"
            placeholder="Search Product"
            size="small"
            type="search"
            onChange={handleChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon size="14" />
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default ProductSearch

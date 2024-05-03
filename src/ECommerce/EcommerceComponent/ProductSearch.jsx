import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import { ProductContext } from '../../ContextApi/EcommerceContext'

function ProductSearch() {


    const { searchProducts } = useContext(ProductContext);


    return (
        <TextField
            variant="outlined"
            id="outlined-search"
            placeholder="Search Product"
            size="small"
            type="search"
            onChange={(event) => searchProducts(event.target.value)}

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

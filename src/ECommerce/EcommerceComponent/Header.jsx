import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Box, Button, Modal } from '@mui/material';
import image1 from '../../assets/ChatBc.png'
import { ProductContext } from '../../ContextApi/EcommerceContext'
import { useContext, useState } from 'react';
import NewProductAdd from './NewProductAdd';

function Header() {

    const { toggleCheckout, toggleProductAdd, toggleListopen, toogleEditopen } = useContext(ProductContext);
    const [AddModalOpen, SetAddModalOpen] = useState(false);

    const handleCloseAddModal = () => {
        SetAddModalOpen(false);
    };

    return (
        <Grid container spacing={2} >
            <Grid >
                <Typography variant="h5" component="h5" sx={{ color: 'rgb(42, 53, 71)', fontWeight: '600', fontSize: "1.3125rem" }}>
                    Ecom-Shop
                </Typography>
                <Typography variant="h6" component="h6"> </Typography>
                <Typography variant="nav" component="nav" className='nav-box'>
                    <Breadcrumbs aria-label="breadcrumb" separator="">
                        <a href='/ecommerce'>
                            <Typography variant="p" component="p">Home</Typography>
                        </a>


                        <FiberManualRecordIcon sx={{ fontSize: 8 }} />
                        <a href='#'>
                            <Typography variant="p" component="p"> Shop</Typography>
                        </a>
                    </Breadcrumbs>
                </Typography>
                <Box sx={{ display: "flex", gap: "3px" }}>
                    <Button variant="contained" color="primary" sx={{ marginTop: 1 }} onClick={toggleCheckout}>Add to Cart </Button>
                    <Button variant="contained" color="primary" sx={{ marginTop: 1 }} onClick={() => { SetAddModalOpen(true) }}>Add Products</Button>

                    <Button variant="contained" color="primary" sx={{ marginTop: 1 }} onClick={toogleEditopen}>Edit Products</Button>
                    <Button variant="contained" color="primary" sx={{ marginTop: 1 }} onClick={toggleListopen}>List</Button>

                </Box>

            </Grid >
            <Box className="IMG-box">
                <img src={image1} alt='breadcrumbImg' />
            </Box>


            {AddModalOpen &&
                <Box sx={{ width: 400, bgcolor: 'background.paper' }}>
                    <NewProductAdd open={AddModalOpen} onClose={() => SetAddModalOpen(false)} />
                </Box>
            }

        </Grid >
    )
}

export default Header

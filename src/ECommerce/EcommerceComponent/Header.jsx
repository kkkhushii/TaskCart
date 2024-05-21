import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Box, Button, Link } from '@mui/material';
import image1 from '../../assets/ChatBc.png'
import { ProductContext } from '../../ContextApi/EcommerceContext'
import { useContext, useState } from 'react';
import NewProductAdd from './NewProductAdd';

function Header() {

    const { toggleCheckout, toggleListopen } = useContext(ProductContext);
    const [AddModalOpen, SetAddModalOpen] = useState(false);
    return (
        <Grid container spacing={2} >
            <Grid >
                <Typography variant="h5" component="h5" sx={{ color: 'rgb(42, 53, 71)', fontWeight: '600', fontSize: "1.3125rem" }}>
                    Ecom-Shop
                </Typography>
                <Typography variant="h6" component="h6"> </Typography>
                <Typography variant="nav" component="nav" className='nav-box'>
                    <Breadcrumbs aria-label="breadcrumb" separator="">
                        {/* <Link href="/ecommerce" underline="none"> */}
                        <Link href="/" underline="none">

                            <Typography variant="p" component="p">Home</Typography>
                        </Link>
                        <FiberManualRecordIcon sx={{ fontSize: 8 }} />
                        <Link href='#'>
                            <Typography variant="p" component="p"> Shop</Typography>
                        </Link>
                    </Breadcrumbs>
                </Typography >
                <Box sx={{ display: "flex", gap: "3px" }}>
                    <Button variant="contained" color="primary" sx={{ marginTop: 1 }} onClick={toggleCheckout}>Checkout</Button>
                    <Button variant="contained" color="primary" sx={{ marginTop: 1 }} onClick={() => { SetAddModalOpen(true) }}>Add Products</Button>
                    <Button variant="contained" color="primary" sx={{ marginTop: 1 }} onClick={toggleListopen}>List</Button>
                </Box>
            </Grid >
            <Box className="IMG-box">
                <img src={image1} alt='breadcrumbImg' />
            </Box>


            {
                AddModalOpen &&
                <Box sx={{ width: 400, bgcolor: 'background.paper' }}>
                    <NewProductAdd open={AddModalOpen} onClose={() => SetAddModalOpen(false)} />
                </Box>
            }

        </Grid >
    )
}

export default Header

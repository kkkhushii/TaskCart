import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Box } from '@mui/material';
import image1 from '../../assets/ChatBc.png'

function Header() {
    return (
        <Grid container spacing={2} >
            <Grid >
                <Typography variant="h5" component="h5" sx={{ color: 'rgb(42, 53, 71)', fontWeight: '600', fontSize: "1.3125rem" }}>
                    Ecom-Shop
                </Typography>
                <Typography variant="h6" component="h6"> </Typography>
                <Typography variant="nav" component="nav" className='nav-box'>
                    <Breadcrumbs aria-label="breadcrumb" separator="">
                        <a href='#'>
                            <Typography variant="p" component="p">Home</Typography>
                        </a>
                        <FiberManualRecordIcon sx={{ fontSize: 8 }} />
                        <a href='#'>
                            <Typography variant="p" component="p"> Shop</Typography>
                        </a>
                    </Breadcrumbs>
                </Typography>
            </Grid >
            <Box className="IMG-box">
                <img src={image1} alt='breadcrumbImg' />
            </Box>
        </Grid >
    )
}

export default Header

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../style/Home.css'
import Header from '../EcommerceComponent/Header';
import Home from '../EcommerceComponent/Home'
import { BrowserRouter as Router, Routes } from 'react-router-dom';



function Page() {
    return (
        <Container>
            <Box>
                <Header />
                <Home />
            </Box>
        </Container >

    )
}

export default Page

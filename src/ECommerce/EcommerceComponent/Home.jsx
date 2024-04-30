import ProductSidebar from './ProductSidebar'
import '../style/Home.css'
import { Paper, Drawer, Box } from '@mui/material'
import ProductDetail from './ProductList'


function Home() {
    return (

        <Paper component="div">

            <Drawer
                variant="permanent"
                sx={{
                    '& .MuiDrawer-paper': {
                        position: 'static',
                        width: 'fit-content',
                    },
                }}
                classes={{
                    root: 'MuiDrawer-root',
                    docked: 'MuiDrawer-docked',

                }}
            >
                <Paper>
                    <ProductSidebar />
                </Paper>


            </Drawer>
            <Box><ProductDetail /></Box>
        </Paper>




    )
}

export default Home

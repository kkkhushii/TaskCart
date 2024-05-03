import ProductSidebar from './ProductSidebar'
import '../style/Home.css'
import { Paper, Drawer, Box, Grid } from '@mui/material'
import ProductList from './ProductList'
import ProductCheckout from './ProductCheckout'
import { ProductContext } from '../../ContextApi/EcommerceContext'
import { useContext, useState } from 'react'
import ProductDetail from './ProductDetail'

function Home() {
    const { showCheckout } = useContext(ProductContext);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

    return (

        <Paper component="div">
            {showCheckout ? (
                <ProductCheckout />
            ) : (
                <>
                    {!selectedProduct && (
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
                    )}
                    <Box>
                        <ProductList onProductSelect={handleProductSelect} />

                    </Box>
                </>
            )}
        </Paper>



    )
}

export default Home

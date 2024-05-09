import ProductSidebar from './ProductSidebar'
import '../style/Home.css'
import { Paper, Drawer, Box, Grid } from '@mui/material'
import ProductList from './ProductList'
import ProductCheckout from './ProductCheckout'
import { ProductContext } from '../../ContextApi/EcommerceContext'
import { useContext, useState } from 'react'
import ProductDetail from './ProductDetail'
import ProductTableList from '../EcommerceComponent/ProductTableList'
function Home() {
    const { showCheckout, products, showList, setSelectedProduct, selectedProduct } = useContext(ProductContext);
    const [selectedProductDetails, setSelectedProductDetails] = useState(null);

    const handleProductClick = (productId, productDetails) => {
        setSelectedProduct(productId);
        setSelectedProductDetails(productDetails);
    };

    return (
        <Paper component="div">
            {showCheckout && <ProductCheckout />}
            {showList && <ProductTableList />}
            {(!showCheckout && !showList) && (
                <>
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
                    <Box>
                        {!selectedProduct ? (
                            <ProductList products={products} onProductClick={handleProductClick} />
                        ) : (
                            <ProductDetail product={selectedProductDetails} onClose={() => setSelectedProduct(null)} />
                        )}

                    </Box>
                </>
            )}
        </Paper>
    )
}

export default Home

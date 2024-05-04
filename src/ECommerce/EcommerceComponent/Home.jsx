import ProductSidebar from './ProductSidebar'
import '../style/Home.css'
import { Paper, Drawer, Box, Grid } from '@mui/material'
import ProductList from './ProductList'
import ProductCheckout from './ProductCheckout'
import { ProductContext } from '../../ContextApi/EcommerceContext'
import { useContext, useState } from 'react'
import NewProductAdd from './NewProductAdd'
import ProductDetail from './ProductDetail'
import ProductTableList from '../EcommerceComponent/ProductTableList'
function Home() {
    const { showCheckout, showProductAdd, products, showList } = useContext(ProductContext);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    return (

        <Paper component="div">
            {showProductAdd && <NewProductAdd />}
            {showCheckout && <ProductCheckout />}
            {showList && <ProductTableList />}


            {(!showProductAdd && !showCheckout && !showList) && (
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
                        {/* <ProductList /> */}
                        {!selectedProduct ? (
                            <ProductList products={products} onProductClick={handleProductClick} />
                        ) : (
                            <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />

                        )}

                    </Box>
                </>
            )}

        </Paper>
    )
}

export default Home

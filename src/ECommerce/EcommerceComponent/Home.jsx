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
import ProductEdit from '../EcommerceComponent/ProductEdit'
function Home() {
    const { showCheckout, showProductAdd, products, showList, setSelectedProduct, selectedProduct, EditProducts } = useContext(ProductContext);

    const [selectedProductDetails, setSelectedProductDetails] = useState(null);

    // const handleProductClick = (product) => {
    //     setSelectedProduct(product);
    // };
    const handleProductClick = (productId, productDetails) => {
        setSelectedProduct(productId);
        setSelectedProductDetails(productDetails);
    };

    return (

        <Paper component="div">
            {showProductAdd && <NewProductAdd />}
            {showCheckout && <ProductCheckout />}
            {showList && <ProductTableList />}
            {EditProducts && <ProductEdit productId={selectedProduct} productDetails={selectedProductDetails} onClose={() => setSelectedProduct(null)} />}

            {(!showProductAdd && !showCheckout && !showList && !EditProducts) && (
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
                            // <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
                            <ProductDetail product={selectedProductDetails} onClose={() => setSelectedProduct(null)} />
                        )}

                    </Box>
                </>
            )}

        </Paper>
    )
}

export default Home

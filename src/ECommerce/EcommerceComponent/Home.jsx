import ProductSidebar from './ProductSidebar'
import '../style/Home.css'
import { Paper, Drawer, Box, Grid } from '@mui/material'
import ProductList from './ProductList'
import ProductCheckout from './ProductCheckout'
import { ProductContext } from '../../ContextApi/EcommerceContext'
import { useContext, useState } from 'react'
import NewProductAdd from './NewProductAdd'

function Home() {
    const { showCheckout, showProductAdd } = useContext(ProductContext);

    return (

        <Paper component="div">
            {showProductAdd && <NewProductAdd />}
            {showCheckout && <ProductCheckout />}

            {(!showProductAdd && !showCheckout) && (
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
                        <ProductList />
                    </Box>
                </>
            )}

        </Paper>
    )
}

export default Home

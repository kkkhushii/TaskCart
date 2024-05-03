
import MainPage from '../ECommerce/EcommerceComponent/MainPage'
import { ProductProvider } from '../ContextApi/EcommerceContext'
import ProductDetail from '../ECommerce/EcommerceComponent/ProductDetail'

function Ecommerece() {
    return (
        <div>
            <ProductProvider>
                <MainPage />

            </ProductProvider>

        </div>
    )
}

export default Ecommerece

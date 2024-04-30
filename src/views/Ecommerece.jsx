import Header from '../ECommerce/EcommerceComponent/Header'
import ProductSidebar from '../ECommerce/EcommerceComponent/ProductSidebar'
import MainPage from '../ECommerce/EcommerceComponent/MainPage'
import { ProductProvider } from '../ContextApi/EcommerceContext'

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

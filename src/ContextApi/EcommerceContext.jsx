import { createContext, useState, useEffect } from 'react';
import axios from 'axios'

export const ProductContext = createContext();

const config = {
    products: [],
    searchProduct: '',
    selectedCategory: 'All',
    sortBy: 'newest',
    priceRange: 'All',
    selectedGender: 'All',
    selectedColor: 'All',
    loading: true,
    cart: [],
    showCheckout: false,
    showProductAdd: false,
    newProducts: [],
    showList: false,
    EditProducts: false,
    selectedProduct: null,
    editModalOpen: false,
    selectedProductForEdit: null,
}

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(config.products);
    const [searchProduct, setSearchProduct] = useState(config.searchProduct);
    const [selectedCategory, setSelectedCategory] = useState(config.selectedCategory);
    const [sortBy, setSortBy] = useState(config.sortBy);
    const [priceRange, setPriceRange] = useState(config.priceRange);
    const [selectedGender, setSelectedGender] = useState(config.selectedGender);
    const [selectedColor, setSelectedColor] = useState(config.selectedColor);
    const [loading, setLoading] = useState(config.loading);
    const [cart, setCart] = useState(config.cart);
    const [showCheckout, setShowCheckout] = useState(config.showCheckout);
    const [showList, setShowList] = useState(config.showList);
    const [selectedProduct, setSelectedProduct] = useState(config.selectedProduct);
    const [editModalOpen, setEditModalOpen] = useState(config.editModalOpen);
    const [selectedProductForEdit, setSelectedProductForEdit] = useState(config.selectedProductForEdit);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/data/eCommerce/ProductsData');
                setProducts(response.data);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching product data:', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);



    const filterProducts = (product) => {
        const matchesSearch = product?.title?.toLowerCase().includes(searchProduct.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || (product.category && product.category.includes(selectedCategory.toLowerCase()));
        const withinPriceRange = (priceRange === 'All') ||
            (priceRange === '0-50' && product.price <= 50) ||
            (priceRange === '50-100' && product.price > 50 && product.price <= 100) ||
            (priceRange === '100-200' && product.price > 100 && product.price <= 200) ||
            (priceRange === '200-99999' && product.price > 200);
        const matchesGender = selectedGender === 'All' || product.gender === selectedGender;
        const matchesColor = selectedColor === 'All' || product.colors.includes(selectedColor);

        return matchesSearch && matchesCategory && withinPriceRange && matchesGender && matchesColor;
    };
    const sortProducts = (filteredProducts) => {
        switch (sortBy) {
            case 'newest':
                return filteredProducts.sort((a, b) => new Date(b.created) - new Date(a.created));
            case 'priceDesc':
                return filteredProducts.sort((a, b) => b.price - a.price);
            case 'priceAsc':
                return filteredProducts.sort((a, b) => a.price - b.price);
            case 'discount':
                return filteredProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0));
            default:
                return filteredProducts;
        }
    };

    const filteredProducts = products.filter(filterProducts);

    const filteredAndSortedProducts = sortProducts(filteredProducts);

    const selectCategory = (category) => setSelectedCategory(category);

    const updateSortBy = (sortOption) => setSortBy(sortOption);

    const updatePriceRange = (range) => setPriceRange(range);

    const selectGender = (gender) => setSelectedGender(gender);

    const selectColor = (color) => setSelectedColor(color);

    const searchProducts = (searchText) => setSearchProduct(searchText);


    const addProduct = async (newProduct, category) => {
        try {
            const response = await axios.post('/api/data/eCommerce/AddProduct', newProduct);
            const addedProduct = { ...response.data, category };
            setProducts((prevProducts) => [...prevProducts, addedProduct]);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };


    const addToCart = (productWithQuantity) => {
        const { id, quantity } = productWithQuantity;
        const existingProductIndex = cart.findIndex((item) => item.id === id);

        if (existingProductIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity += (quantity || 1);
            setCart(updatedCart);
        } else {
            const productWithCategory = { ...productWithQuantity, categoryName: productWithQuantity.category, quantity: (quantity || 1) };
            setCart((prevCart) => [...prevCart, productWithCategory]);
        }
    };

    const removeFromCart = async (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };


    const incrementQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
            )
        );
    };

    const deleteProduct = (productId) => {
        setProducts(products.filter(product => product.id !== productId));
    };
    const deleteAllProducts = () => {
        setProducts([]);
    };

    const toggleCheckout = () => {
        setShowCheckout(true);
        setShowList(false);
    };

    const toggleListopen = () => {
        setShowList(true);
        setShowCheckout(false);
    }

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setSelectedProductForEdit(null);
    };

    const updateProduct = (productId, updatedProductData) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId ? { ...product, ...updatedProductData } : product
            )
        );

    };
    return (
        <ProductContext.Provider value={{
            products, deleteProduct, setSelectedProduct, selectedProduct, searchProducts, showList, toggleListopen, selectedCategory, addProduct,
            updateSortBy, selectCategory, showCheckout, incrementQuantity, decrementQuantity, removeFromCart, toggleCheckout,
            addToCart, loading, filteredAndSortedProducts, selectedColor, selectColor, setSelectedGender, updatePriceRange, selectGender, deleteAllProducts,
            sortBy, priceRange, setPriceRange, cart, editModalOpen, setEditModalOpen, selectedProductForEdit, setSelectedProductForEdit, handleCloseEditModal, updateProduct
        }}>
            {children}
        </ProductContext.Provider>
    );
};
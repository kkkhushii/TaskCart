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
    const [showProductAdd, setShowProductAdd] = useState(config.showProductAdd);
    const [showList, setShowList] = useState(config.showList);
    const [newProducts, setNewProducts] = useState(config.newProducts);
    const [EditProducts, setEditProducts] = useState(config.EditProducts);
    const [selectedProduct, setSelectedProduct] = useState(null);


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
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
            setLoading(false);
        } else {

            fetchProducts();
        }

    }, []);



    const removeFromCart = async (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const filterProducts = (product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchProduct.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category.includes(selectedCategory.toLowerCase());
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
            localStorage.setItem('products', JSON.stringify([...products, addedProduct]));
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const updateProduct = (productId, updatedProductData) => {

        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId ? { ...product, ...updatedProductData } : product
            )
        );
        localStorage.setItem('products', JSON.stringify(updatedProductData));
    };


    // const editProduct = async (updatedProductData) => {
    //     try {

    //         console.log('Updated product data:', updatedProductData);


    //         const response = await axios.post('/api/data/eCommerce/EditProduct', updatedProductData);
    //         const updatedProduct = response.data;
    //         console.log(response);

    //         setProducts((prevProducts) => {
    //             return prevProducts.map((product) => {
    //                 if (product.id === updatedProduct.id) {
    //                     return updatedProduct;
    //                 } else {
    //                     return product;
    //                 }
    //             });
    //         });

    //     } catch (error) {
    //         console.error('Error editing product:', error);
    //     }
    // };




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


    const toggleCheckout = () => {
        setShowCheckout(true);
        setShowProductAdd(false);
        setShowList(false);
        setEditProducts(false);
    };

    const toggleProductAdd = () => {
        setShowProductAdd(true);
        setShowCheckout(false);
        setShowList(false);
        setEditProducts(false);


    };
    const toggleListopen = () => {
        setShowList(true);
        setShowCheckout(false);
        setShowProductAdd(false);
        setEditProducts(false);
    }
    const toogleEditopen = () => {
        setEditProducts(true);
        setShowList(false);
        setShowCheckout(false);
        setShowProductAdd(false);
    }

    return (
        <ProductContext.Provider value={{ products, toogleEditopen, EditProducts, updateProduct, setEditProducts, setSelectedProduct, selectedProduct, searchProducts, showList, toggleListopen, selectedCategory, newProducts, addProduct, showProductAdd, toggleProductAdd, updateSortBy, selectCategory, showCheckout, incrementQuantity, decrementQuantity, removeFromCart, toggleCheckout, addToCart, loading, filteredAndSortedProducts, selectedColor, selectColor, setSelectedGender, updatePriceRange, selectGender, sortBy, priceRange, setPriceRange, cart }}>
            {children}
        </ProductContext.Provider>
    );
};
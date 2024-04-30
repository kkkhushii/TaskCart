import { createContext, useState, useEffect } from 'react';
import ProductsData from '../api/ecommerceApi/ProductData';
import axios from 'axios'

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [searchProduct, setSearchProduct] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('newest');
    const [priceRange, setPriceRange] = useState('All');
    const [selectedGender, setSelectedGender] = useState('All');
    const [selectedColor, setSelectedColor] = useState('All');
    const [loading, setLoading] = useState(true);

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



    const selectCategory = (category) => {
        setSelectedCategory(category);
    };

    const updateSortBy = (sortOption) => {
        setSortBy(sortOption);
    };

    const updatePriceRange = (range) => {
        setPriceRange(range);
    };
    const selectGender = (gender) => {
        setSelectedGender(gender);
    };
    const selectColor = (color) => {
        setSelectedColor(color);
    };
    const searchProducts = (searchText) => {
        setSearchProduct(searchText);
    };


    const filteredProducts = products.filter(filterProducts);
    const filteredAndSortedProducts = sortProducts(filteredProducts);




    return (
        <ProductContext.Provider value={{ products, searchProducts, selectCategory, selectedCategory, loading, filteredAndSortedProducts, selectedColor, selectColor, setSelectedGender, updateSortBy, updatePriceRange, selectGender, sortBy, priceRange, setPriceRange }}>
            {children}
        </ProductContext.Provider>
    );
};
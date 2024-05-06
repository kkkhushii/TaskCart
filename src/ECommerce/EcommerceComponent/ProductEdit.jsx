import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';
import { ProductContext } from '../../ContextApi/EcommerceContext'

function ProductEdit({ productId, productDetails }) {
    const { editProduct, products, updateProductData, setSelectedProduct, updateProduct } = useContext(ProductContext);

    const [editedProduct, setEditedProduct] = useState({ ...productDetails });





    useEffect(() => {
        setEditedProduct(productDetails); // Use the passed product details
    }, [productDetails]);

    const handleChange = (e) => {
        setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
    };



    // const handleSave = async () => {
    //     try {
    //         await editProduct(editedProduct); // Pass the productId and updated product data
    //         console.log('Product edited successfully');
    //     } catch (error) {
    //         console.error('Error editing product:', error);
    //     }
    // };
    // const handleSave = async () => { }



    const handleSave = () => {

        updateProduct(productId, editedProduct);
        console.log('Updated Product Data:', editedProduct);
    };

    if (!editedProduct) {
        return <div>Loading...</div>;
    }
    return (

        <div>
            <h1>Edit Product</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>

                {Object.keys(editedProduct).map((fieldName) => (
                    <label key={fieldName}>
                        {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
                        <input
                            type="text"
                            name={fieldName}
                            value={editedProduct[fieldName]}
                            onChange={(e) => handleChange(e, fieldName)}
                        />
                    </label>
                ))}
                <button type="submit">Save</button>
            </form>

        </div>





    )
}

export default ProductEdit

import { useContext, useState, useEffect } from 'react'
import axios from 'axios';
import { ProductContext } from '../../ContextApi/EcommerceContext'

function ProductEdit({ productDetails }) {
    const { updateProduct } = useContext(ProductContext);

    const [editedProduct, setEditedProduct] = useState({ ...productDetails });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };
    const handleSave = () => {
        updateProduct(editedProduct.id, editedProduct); // Call updateProduct with edited data
        console.log('Product edited successfully');
    };

    useEffect(() => {
        setEditedProduct(productDetails); // Use the passed product details
    }, [productDetails]);


    // const handleSave = async () => {
    //     try {
    //         await updateProduct(productId, editedProduct); // Update the product
    //         console.log('Product edited successfully');
    //     } catch (error) {
    //         console.error('Error editing product:', error);
    //     }
    // };

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

import { useContext, useState } from 'react'
import {

    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Button
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { ProductContext } from '../../ContextApi/EcommerceContext';




function ProductTableList() {

    const { products, deleteProduct, deleteAllProducts } = useContext(ProductContext);
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [selectedProductId, setSelectedProductId] = useState(null);



    const handleSelectAll = () => {
        if (selectAll) {
            setSelected([]);
        } else {
            setSelected(products.map(product => product.id));
        }
        setSelectAll(!selectAll);
    };
    const handleSelect = (productId) => {
        if (selected.includes(productId)) {
            setSelected(selected.filter(id => id !== productId));
        } else {
            setSelected([...selected, productId]);
        }
    };

    const handleDeleteSelected = (productId) => {
        setSelectedProductId(productId);
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        deleteProduct(selectedProductId);
        setSelected(selected.filter(id => id !== selectedProductId));
        setShowConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    const handleDeleteAll = () => {
        setShowConfirmation(true);
    };

    const handleConfirmDeleteAll = () => {
        deleteAllProducts();
        setSelected([]);
        setShowConfirmation(false);
    };
    return (



        <div>
            {(products.length === 0) ? (
                <h2>No products available</h2>
            ) : (
                <div>

                    {showConfirmation && (
                        <Dialog open={showConfirmation} onClose={handleCancelDelete}>
                            <DialogTitle>Delete Product</DialogTitle>
                            <DialogContent>
                                <DialogContentText>Are you sure you want to delete this product?</DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCancelDelete}>No</Button>
                                <Button onClick={selected.length > 1 ? handleConfirmDeleteAll : handleConfirmDelete} autoFocus>
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    )}
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th>Product</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Price</th>
                                <th>Actions</th>
                                <th>
                                    <Button onClick={handleDeleteAll}>
                                        <DeleteIcon />
                                    </Button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(product.id)}
                                            onChange={() => handleSelect(product.id)}
                                        />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>{new Date(product.created).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: '2-digit',
                                        year: 'numeric'
                                    })}</td>
                                    <td>{product.stock ? 'In Stock' : 'Out of Stock'}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <button>Edit</button>

                                        <button onClick={() => handleDeleteSelected(product.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ProductTableList

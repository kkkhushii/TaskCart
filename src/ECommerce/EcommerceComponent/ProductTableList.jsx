import { useContext, useState, useEffect } from 'react'
import {

    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    IconButton,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Pagination
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { ProductContext } from '../../ContextApi/EcommerceContext';
import EditIcon from '@mui/icons-material/Edit';
import ProductEdit from './ProductEdit';

function ProductTableList() {

    const { products, deleteProduct, deleteAllProducts, updateProduct, selectedProductForEdit, editModalOpen, setSelectedProductForEdit, setEditModalOpen, handleCloseEditModal } = useContext(ProductContext);
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);



    // const handleSelectAll = () => {
    //     if (selectAll) {
    //         setSelected([]);
    //     } else {
    //         setSelected(products.map(product => product.id));
    //     }
    //     setSelectAll(!selectAll);
    // };
    // const handleSelect = (productId) => {
    //     if (selected.includes(productId)) {
    //         setSelected(selected.filter(id => id !== productId));
    //     } else {
    //         setSelected([...selected, productId]);
    //     }
    // };
    // const handleDeleteSelected = (productId) => {
    //     setSelectedProductId(productId);
    //     setShowConfirmation(true);
    // };

    // const handleConfirmDelete = () => {
    //     deleteProduct(selectedProductId);
    //     setSelected(selected.filter(id => id !== selectedProductId));
    //     setShowConfirmation(false);
    // };

    // const handleCancelDelete = () => {
    //     setShowConfirmation(false);
    // };

    // const handleDeleteAll = () => {
    //     setShowConfirmation(true);
    // };

    // const handleConfirmDeleteAll = () => {
    //     deleteAllProducts();
    //     setSelected([]);
    //     setShowConfirmation(false);
    // };


    // const handleEdit = (productId) => {
    //     setSelectedProductId(productId);
    //     setEditModalOpen(true);
    // };
    //new

    const handleSelectAll = () => {
        const newSelected = !selected.length || selected.length < products.length ? products.map((product) => product.id) : [];
        setSelected(newSelected);
    };

    const handleSelect = (productId) => {
        setSelected((prevSelected) => {
            if (prevSelected.includes(productId)) {
                return prevSelected.filter((id) => id !== productId);
            } else {
                return [...prevSelected, productId];
            }
        });
    };

    const handleDeleteSelected = (productId) => {
        setSelectedProductId(productId);
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        deleteProduct(selectedProductId);
        setSelected((prevSelected) => prevSelected.filter((id) => id !== selectedProductId));
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

    const handleEdit = (productId) => {
        setSelectedProductId(productId);
        setEditModalOpen(true);
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    // const endIndex = startIndex + rowsPerPage;
    // const paginatedProducts = products.slice(startIndex, endIndex);
    const endIndex = Math.min(startIndex + rowsPerPage, products.length);
    const paginatedProducts = products.slice(startIndex, endIndex);
    return (
        // <div>
        //     {(products.length === 0) ? (
        //         <h2>No products available</h2>
        //     ) : (
        //         <div>
        //             {showConfirmation && (
        //                 <Dialog open={showConfirmation} onClose={handleCancelDelete}>
        //                     <DialogTitle>Delete Product</DialogTitle>
        //                     <DialogContent>
        //                         <DialogContentText>Are you sure you want to delete this product?</DialogContentText>
        //                     </DialogContent>
        //                     <DialogActions>
        //                         <Button onClick={handleCancelDelete}>No</Button>
        //                         <Button onClick={selected.length > 1 ? handleConfirmDeleteAll : handleConfirmDelete} autoFocus>
        //                             Yes
        //                         </Button>
        //                     </DialogActions>
        //                 </Dialog>
        //             )}
        //             <table>
        //                 <thead>
        //                     <tr>
        //                         <th>
        //                             <input
        //                                 type="checkbox"
        //                                 checked={selectAll}
        //                                 onChange={handleSelectAll} />
        //                         </th>
        //                         <th>Product</th>
        //                         <th>Date</th>
        //                         <th>Status</th>
        //                         <th>Price</th>
        //                         <th>Actions</th>
        //                         <th>
        //                             <Button onClick={handleDeleteAll}>
        //                                 <DeleteIcon />
        //                             </Button>
        //                         </th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {products.map((product) => (
        //                         <tr key={product.id}>
        //                             <td>
        //                                 <input
        //                                     type="checkbox"
        //                                     checked={selected.includes(product.id)}
        //                                     onChange={() => handleSelect(product.id)} />
        //                             </td>
        //                             <td><img style={{ borderRadius: "50%", height: "50px", width: "50px" }} src={product.photo || product.image} alt="product image" /></td>
        //                             <td>{product.title}</td>
        //                             <td>{new Date(product.created).toLocaleDateString('en-US', {
        //                                 weekday: 'short',
        //                                 month: 'short',
        //                                 day: '2-digit',
        //                                 year: 'numeric'
        //                             })}</td>
        //                             <td>
        //                                 <IconButton
        //                                     sx={{
        //                                         backgroundColor: product.stock ? 'green' : 'red',
        //                                         width: 9,
        //                                         height: 9,
        //                                         borderRadius: '50%',
        //                                         marginRight: 1,
        //                                     }} />
        //                                 {product.stock ? 'In Stock' : 'Out of Stock'}
        //                             </td>

        //                             <td>{product.price}</td>
        //                             <td>
        //                                 <EditIcon onClick={() => handleEdit(product.id)} />
        //                                 <DeleteIcon onClick={() => handleDeleteSelected(product.id)} />
        //                             </td>
        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             </table>
        //         </div>
        //     )}
        //     {editModalOpen && (
        //         <ProductEdit
        //             product={products.find(product => product.id === selectedProductId)}
        //             onClose={handleCloseEditModal} />
        //     )}
        // </div>



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
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Checkbox
                                    checked={selected.length === products.length}
                                    indeterminate={selected.length > 0 && selected.length < products.length}
                                    onChange={handleSelectAll}
                                />
                            </TableCell>
                            {/* <TableCell>
                                <Checkbox
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            </TableCell> */}
                            <TableCell>Product</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Actions</TableCell>
                            <TableCell>
                                <Button onClick={handleDeleteAll}>
                                    <DeleteIcon />
                                </Button>
                            </TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selected.includes(product.id)}
                                        onChange={() => handleSelect(product.id)}
                                    />
                                </TableCell>
                                <TableCell><img style={{ borderRadius: "50%", height: "50px", width: "50px" }} src={product.photo || product.image} alt="product image" /></TableCell>
                                <TableCell>{new Date(product.created).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: '2-digit',
                                    year: 'numeric'
                                })}</TableCell>
                                <TableCell>
                                    <IconButton
                                        sx={{
                                            backgroundColor: product.stock ? 'green' : 'red',
                                            width: 9,
                                            height: 9,
                                            borderRadius: '50%',
                                            marginRight: 1,
                                        }} />
                                    {product.stock ? 'In Stock' : 'Out of Stock'}
                                </TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                    <EditIcon onClick={() => handleEdit(product.id)} />
                                    <DeleteIcon onClick={() => handleDeleteSelected(product.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={Math.ceil(products.length / rowsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
            />
            {editModalOpen && (
                <ProductEdit
                    product={products.find(product => product.id === selectedProductId)}
                    onClose={handleCloseEditModal} />
            )}
        </div>
    );

}

export default ProductTableList

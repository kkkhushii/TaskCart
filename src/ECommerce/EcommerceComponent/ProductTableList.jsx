import { useContext, useState } from 'react'
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
    Pagination, Box
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { ProductContext } from '../../ContextApi/EcommerceContext';
import EditIcon from '@mui/icons-material/Edit';
import ProductEdit from './ProductEdit';

function ProductTableList() {

    const { products, deleteProduct, deleteAllProducts, editModalOpen, setEditModalOpen, handleCloseEditModal } = useContext(ProductContext);
    const [selected, setSelected] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);



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
    const endIndex = Math.min(startIndex + rowsPerPage, products.length);
    const paginatedProducts = products.slice(startIndex, endIndex);
    return (
        <Box sx={{ width: '100%', margin: 'auto' }}>
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
                <Table >
                    <TableHead>
                        <TableRow >
                            <TableCell>
                                <Checkbox
                                    checked={selected.length === products.length}
                                    indeterminate={selected.length > 0 && selected.length < products.length}
                                    onChange={handleSelectAll} />
                            </TableCell>
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
                            <TableRow key={product.id} >
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
                onChange={handleChangePage} />
            {editModalOpen && (
                <ProductEdit
                    product={products.find(product => product.id === selectedProductId)}
                    onClose={handleCloseEditModal} />
            )}
        </Box>
    );
}

export default ProductTableList

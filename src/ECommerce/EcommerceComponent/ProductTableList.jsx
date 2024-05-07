import { useContext, useState } from 'react'
import { Box, Toolbar, Typography, Paper, TableContainer, TableBody, Table, TableCell, TableHead, TablePagination, TableRow, Checkbox, IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { ProductContext } from '../../ContextApi/EcommerceContext';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${TableCell} `]: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: 'white',

    },

    '&.inStock': {
        backgroundColor: theme.palette.primary.light,
    },
    '&.outOfStock': {
        backgroundColor: theme.palette.error.white,
    },
}));


function ProductTableList() {
    const { products } = useContext(ProductContext);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectAll, setSelectAll] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const handleClick = (event, id) => {
        if (
            event.target.tagName === 'BUTTON' ||
            event.target.tagName === 'INPUT'
        ) {
            return;
        }

        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = [...selected, id];
        } else {
            newSelected = selected.filter((itemId) => itemId !== id);
        }

        setSelected(newSelected);
    };
    const handleSelectAllClick = () => {
        if (selectAll) {
            setSelected([]);
        } else {
            const selectedIds = products.map((product) => product.id);
            setSelected(selectedIds);
        }
        setSelectAll(!selectAll);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const isChecked = (id) => {
        return isSelected(id) || selectAll;
    };


    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Toolbar>
                    <Typography variant="subtitle1" component="div">
                        {selected.length}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />

                    <Tooltip title="Delete">
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>


                </Toolbar>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size="medium"
                    >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell padding="checkbox">
                                    <Checkbox checked={selectAll} onChange={handleSelectAllClick} /> </StyledTableCell>
                                <StyledTableCell align="left">Product</StyledTableCell>
                                <StyledTableCell align="left">Date</StyledTableCell>
                                <StyledTableCell align="left">Status</StyledTableCell>
                                <StyledTableCell align="right">Price</StyledTableCell>
                                <StyledTableCell align="right">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                                <StyledTableRow
                                    key={product.id}
                                    className={product.inStock ? 'inStock' : 'outOfStock'}
                                    onClick={(event) => handleClick(event, product.id)}
                                >
                                    <TableCell padding="checkbox" >
                                        <Checkbox checked={isChecked(product.id)} />

                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {/* Product image and title */}
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <img src={product.photo || product.image} alt={product.title} style={{ width: 50, height: 50, borderRadius: '50%' }} />
                                            <Typography variant="body1">{product.title}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="left"> {new Date(product.created).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: '2-digit',
                                        year: 'numeric'
                                    })} </TableCell>
                                    <TableCell align="left">

                                        {product.stock ? (
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'rgb(19, 222, 185)', marginRight: 5 }} />
                                                <Typography variant="body2">In Stock</Typography>
                                            </Box>
                                        ) : (
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'rgb(250, 137, 107)', marginRight: 5 }} />
                                                <Typography variant="body2">Out of Stock</Typography>
                                            </Box>
                                        )}
                                    </TableCell>
                                    <TableCell align="right">{product.price}</TableCell>
                                    <TableCell align="right">

                                        <Tooltip title="Edit">
                                            <IconButton>
                                                <MoreVertIcon onClick={(e) => { e.stopPropagation(); }} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>

                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </Box >
    )
}

export default ProductTableList

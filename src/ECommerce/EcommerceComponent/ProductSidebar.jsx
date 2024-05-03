import { List, Typography, Divider, ListItemButton, ListItemIcon, ListItemText, Box, FormGroup, FormControlLabel, Radio, Stack, Avatar, Button, RadioGroup } from '@mui/material'
import { filterCategory, filterbySort, filterbyPrice } from '../../api/ecommerceApi/ProductFilter'
import { ProductContext } from '../../ContextApi/EcommerceContext'
import { useContext } from 'react';
import CheckIcon from '@mui/icons-material/Check';



function ProductSidebar({ colors }) {
    const { selectCategory, sortBy, updateSortBy, updatePriceRange, priceRange, selectGender, selectedGender, selectColor, selectedCategory, selectedColor, products } = useContext(ProductContext);


    const handleResetFilters = () => {
        selectCategory('All');
        updateSortBy('newest');
        updatePriceRange('All');
        selectGender('All');
    };


    function getUniqueData(data, attr) {
        let uniqueValues = data.map((curElem) => curElem[attr]);
        if (attr === 'colors') {
            uniqueValues = uniqueValues.flat();
        }

        uniqueValues = ['All', ...new Set(uniqueValues)];

        return uniqueValues;
    }
    // const getUniqueData = (data, attr) => {
    //     let uniqueValues = data.map((curElem) => curElem[attr]);

    //     // Check if the attribute is 'colors' to handle flattening
    //     if (attr === 'colors') {
    //         uniqueValues = uniqueValues.flat();
    //     } else if (attr === 'price') { // Handle price ranges
    //         const prices = uniqueValues.map((price) => {
    //             if (price < 50) {
    //                 return '$0 - $50';
    //             } else if (price < 100) {
    //                 return '$50 - $100';
    //             } else if (price < 200) {
    //                 return '$100 - $200';
    //             } else {
    //                 return '$200+';
    //             }
    //         });

    //         uniqueValues = prices;
    //     }

    //     // Return unique values including 'All'
    //     return ['All', ...new Set(uniqueValues)];
    // };

    const filterbyGender = getUniqueData(products, 'gender');
    const filterbyColors = getUniqueData(products, 'colors');
    // const filterbyPrice = getUniqueData(products, 'price');


    return (
        <List>
            {/* filterCategory */}
            {filterCategory.map((filter) => {
                if (filter.filterbyTitle) {
                    return (
                        <Typography variant="subtitle2" fontWeight={600} px={3} mt={2} pb={2} key={filter.id}>
                            {filter.filterbyTitle}
                        </Typography>
                    );
                } else if (filter.devider) {
                    return <Divider key={filter.id} />;
                }


                return (
                    <ListItemButton
                        sx={{ mb: 1, mx: 3, borderRadius: '7px', backgroundColor: selectedCategory === filter.sort ? 'rgb(236, 242, 255)' : 'transparent', }}
                        key={filter.id}
                        onClick={() => selectCategory(filter.sort)}
                    >
                        <ListItemIcon sx={{ minWidth: '30px' }}>
                            <filter.icon stroke="1.5" size="19" />
                        </ListItemIcon>
                        <ListItemText>{filter.name}</ListItemText>
                    </ListItemButton>
                );
            })}

            {/* filterbySort */}
            <Typography variant="subtitle2" fontWeight={600} px={3} mt={3} pb={2}>
                Sort By
            </Typography>
            {
                filterbySort.map((filter) => {
                    return (
                        <ListItemButton
                            sx={{ mb: 1, mx: 3, borderRadius: '7px', backgroundColor: sortBy === filter.value ? 'rgb(236, 242, 255)' : 'transparent', }}
                            key={filter.id}
                            onClick={() => updateSortBy(filter.value)}

                        >
                            <ListItemIcon sx={{ minWidth: '30px' }}>
                                <filter.icon stroke="1.5" size={19} />
                            </ListItemIcon>
                            <ListItemText>{filter.label}</ListItemText>
                        </ListItemButton>
                    );
                })
            }
            <Divider></Divider>

            {/* filter gender */}
            <Box p={3}>
                <Typography variant="subtitle2" fontWeight={600}>
                    By Gender
                </Typography>
                <br />
                <RadioGroup>
                    {filterbyGender.map((gen) => (
                        <FormControlLabel
                            key={gen}
                            control={
                                <Radio
                                    value={gen}
                                    checked={selectedGender === gen}
                                    onClick={() => selectGender(gen)}

                                />
                            }
                            label={gen}
                        />
                    ))}

                </RadioGroup>
            </Box>
            <Divider></Divider>

            {/* filter by price */}
            <Typography variant="h6" px={3} mt={3} pb={2}>
                By Pricing
            </Typography>
            <Box p={3} pt={0}>
                <FormGroup>
                    {filterbyPrice.map((price) => (
                        <FormControlLabel
                            key={price.label}
                            control={
                                <Radio
                                    value={price.value}
                                    checked={priceRange === price.value}
                                    onClick={() => updatePriceRange(price.value)}
                                />
                            }
                            label={price.label}
                        />
                    ))}

                </FormGroup>

            </Box>
            <Divider></Divider>

            {/* Filter By colors */}

            <Typography variant="h6" px={3} mt={3} pb={2}>
                By Colors
            </Typography>
            <Box p={3} pt={0}>
                <Stack direction={'row'} flexWrap="wrap" gap={1}>
                    {filterbyColors.map((curColor) => {
                        if (curColor !== 'All') {
                            return (
                                <Box
                                    sx={{
                                        backgroundColor: curColor,
                                        width: 24,
                                        height: 24,
                                        cursor: 'pointer',
                                        borderRadius: '60px'
                                    }}
                                    onClick={() => selectColor(curColor)}

                                    aria-label={curColor}
                                    key={curColor}
                                >
                                    {selectedColor === curColor && <CheckIcon size="13" />}

                                </Box>
                            );
                        } else {
                            return <Box key={curColor} sx={{ display: 'none' }}></Box>;
                        }
                    })}
                </Stack>
            </Box >
            <Divider></Divider>

            {/* Reset button*/}

            <Box p={3}>
                <Button variant="contained" fullWidth onClick={handleResetFilters}>
                    Reset Filters
                </Button>
            </Box>

        </List >
    )
}

export default ProductSidebar;

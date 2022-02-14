import { Box, Container, Grid, Pagination, Stack } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { productContext} from "../../../Contexts/ProductContext";
import ProductCard from '../ProductCard/ProductCard';

const ProductList = () => {
    const { products, getProducts, paginatedPages } = useContext(productContext)
    const search = new URLSearchParams(window.location.search)
    
    const [searchParams, setSearhParams] = useSearchParams()
    const [limit, setLimit] = useState(3)
    const [page, setPage] = useState(searchParams.get("_page") ? searchParams.get("_page") : 1) 
    const navigate = useNavigate()
    
    useEffect(() => {
        getProducts()
    }, [])
    
    useEffect(() => {
        setSearhParams({
            "_limit": limit,
            "_page": page
        })
    }, [limit, page])
    
    const handlePage = (e, pageVal) => {
        let newPath = `${window.location.pathname}?${search.toString}`
        navigate(newPath)
        setSearhParams({"_page": pageVal, "_limit": limit})
        getProducts()
        setPage(pageVal)
    }
    
    return (
        <Box sx={{flexGrow: 1, margin: 4}}>
            <Container maxWidth="md">
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                    {
                        products ? (
                            products.map((item, index) => (
                                <Grid item xs={2} sm={4} md={4} key={index}>
                                    <ProductCard item={item} key={index}/>
                                </Grid>
                            ))
                        ) : (<h1>Please wait while loading...</h1>)
                    }
                </Grid>
            
                <Stack spacing={2}>
                        <Pagination 
                            count={paginatedPages}
                            onChange={handlePage}
                            page={+page}
                        />
                </Stack>
            </Container> 
        </Box>
    );
};

export default ProductList;
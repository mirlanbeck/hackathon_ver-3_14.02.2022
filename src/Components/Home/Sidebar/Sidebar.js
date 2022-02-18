import React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { productContext } from '../../../Contexts/ProductContext';
import { useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Slider } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Sidebar = () => {
    const search = new URLSearchParams(window.location.search)
    const navigate = useNavigate()
    const { getProducts } = useContext(productContext) 
    const [ type, setType ] = useState(search.get("type") || "")
    const [ price, setPrice ] = useState(search.get("price_lte") || "")
    
    const filterProducts = (key, value) => {
        search.set(key, value)
        let newPath = `${window.location.pathname}?${search.toString()}`
        navigate(newPath)
        setType(search.get("type") || " ")
        setPrice(search.get("price_lte" || ""))
        getProducts()
        
    }
    
    const handleChangeType = (e, value) => {
        search.set(e, value)
        let newPath = `${window.location.pathname}?${search.toString()}`
        navigate(newPath)
        setType (search.get("type")|| "")
        getProducts()    
    }
    
    const resetFilter = () => {
        navigate("/")
        setType("")
        setPrice("")
        getProducts("")
    }
    
    return (
        <Box sx={{ flexGrow: 1}} style={{marginLeft: "20px", marginTop: "20px"}}>
            <Grid container spacing={1}>
                <Grid item md={2}>
                    <Paper elevation={2} style={{width:'200px', padding: '10px', marginTop: '10px'}}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">
                                Type
                            </FormLabel>
                            <RadioGroup aria-label='gender' name="gender1" value={type} 
                                onChange={(e) => handleChangeType("type", e.target.value)}>
                                <FormControlLabel 
                                    value="Camera" 
                                    control={<Radio/>}
                                    label="Camera"
                                />
                                <FormControlLabel 
                                    value="Lens" 
                                    control={<Radio/>}
                                    label="Lens"
                                />
                            </RadioGroup>
                        </FormControl>
                        <Grid>
                            <Slider 
                                onChange={(e) => filterProducts("price_lte", e.target.value)}
                                valueLabelDisplay="auto"
                                max={20000}
                                step={50}
                            />
                        </Grid>
                        <Button onClick={resetFilter} variant="contained" color="warning">
                            Reset
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Sidebar;
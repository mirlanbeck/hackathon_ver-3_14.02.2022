import { Box, Button, Paper, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productContext } from '../../../Contexts/ProductContext';


export default function EditProduct() {
    const [values, setValues] = useState({
        title: "",
        image: "",
        price: "",
        type: ""
    })
    
    const { edit, editProduct, saveEditedProduct} = useContext(productContext)
    
    const {id} = useParams()
    
    useEffect(() => {
        editProduct(id)
    }, [id])
    
    useEffect(() => {
        if(edit) {
            setValues(edit)
        }
    }, [edit])
    
    const handleEditInp = (e) => {
        let obj = {
            ...values,
            [e.target.name]: e.target.value
        }
        setValues(obj)
    }
    
    const handleSave = () => {
        saveEditedProduct(values)
    }
    
    return (
        <Box 
            sx={{
                display: "flex",
                flexWrap: "wrap",            
                '& > :not(style)': {
                    m: "40px auto",
                    maxWidth: 1000,
                    height: "auto"},
            }}
        >
        <Paper elevation={3}>
            <h3 style={{textAlign: "center"}}>Edit product info</h3>
            <div style={{display: "flex", justifyContent: "space-around", color: "black"}}>
                <div>
                    <img width="300" src={values.image} alt={values.title}/>
                </div>
                <div style={{
                    width: "450px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center"
                }}>
                    <form noValidate autoComplete='off' style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <TextField
                            style={{padding: "10px"}}
                            name="title"
                            onChange={handleEditInp}
                            value={values.title}
                            variant="outlined"
                            label="Title"
                        />
                        <TextField
                            style={{padding: "10px"}}
                            name="image"
                            onChange={handleEditInp}
                            value={values.image}
                            variant="outlined"
                            label="Image"
                        />
                        <TextField
                            style={{padding: "10px"}}
                            name="price"
                            onChange={handleEditInp}
                            value={values.price}
                            variant="outlined"
                            label="Price"
                        />
                        <TextField
                            style={{padding: "10px"}}
                            name="type"
                            onChange={handleEditInp}
                            value={values.type}
                            variant="outlined"
                            label="Type"
                        />
                    </form>
                    <Link to="/"> 
                        <Button onClick={handleSave} variant="contained" color="warning">
                            Save
                        </Button>
                    </Link>
                </div>
            </div>
        </Paper>
        </Box>
    );
};


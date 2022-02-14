import { Box, TextField, Paper, Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productContext } from '../../../Contexts/ProductContext';

export default function AddProduct() {
    const [values, setValues] = useState({
        title: "",
        image: "",
        price: ""
    })
    
    const { addProduct } = useContext(productContext)
    const navigate = useNavigate()
    
    const handleInp = (e) => {
        let obj = {
            ...values,
            [e.target.name]: e.target.value
        }
        setValues(obj)
    }
    
    const handleSave = () => {
        if(!values.image)
        values.image = "https://avatars.mds.yandex.net/i?id=cebc3eb6daaeb423fcc51088637ee1b8-5875933-images-thumbs&n=13&exp=1"
        addProduct({...values, price: +values.price})
        navigate("/")
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
              <h3  style={{textAlign: "center"}}>Add product</h3>
              <div style={{display: "flex", justifyContent: "space-around", color: "black"}}>
                  <div>
                      <img width="300" src={values.image ? values.image : "https://avatars.mds.yandex.net/i?id=cebc3eb6daaeb423fcc51088637ee1b8-5875933-images-thumbs&n=13&exp=1"}/>
                  </div>
                  <div>
                      <form noValidate autoComplete='off' style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center"
                      }}>
                          <TextField
                            style={{padding: "10px"}}
                            name="title"
                            onChange={handleInp}
                            value={values.title}
                            variant="outlined"
                            label="Title"
                            />
                          <TextField
                            style={{padding: "10px"}}
                            name="image"
                            onChange={handleInp}
                            value={values.image}
                            variant="outlined"
                            label="Image"
                            />
                          <TextField
                            style={{padding: "10px"}}
                            name="price"
                            onChange={handleInp}
                            value={values.price}
                            variant="outlined"
                            label="Price"
                            />
                      </form>
                      <Button onClick={handleSave} variant='contained' color='warning'>Add product</Button>
                  </div>
              </div>
          </Paper>
        </Box>
      );
    
};
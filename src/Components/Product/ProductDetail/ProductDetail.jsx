import { Paper, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productContext } from '../../../Contexts/ProductContext';

const ProductDetail = () => {
    const {id} = useParams()
    const {detail, getDetail} = useContext(productContext)

    useEffect(() => {
        getDetail(id)
    }, [id])
    return (
        <Paper elevation={3} variant='outlined'>
            <Typography variant='h2' style={{textAlign: 'center'}}>About product</Typography>
            {
                detail ? (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <div>
                            <img src={detail.image} width={450} />
                        </div>
                        <div
                            style={{
                                width: '450px', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'flex-start',
                                 justifyContent: 'center'}}
                        >
                            <Typography variant='h3'>{detail.title}</Typography>
                            <Typography variant='h4'>{detail.price}</Typography>
                            <Typography variant='h4'>{detail.type}</Typography>
                        </div>
                    </div>
                ) : (<h1>Please wait while loading...</h1>)
            }
        </Paper>
    );
};

export default ProductDetail;
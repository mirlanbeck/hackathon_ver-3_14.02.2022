import { Grid } from '@mui/material';
import React from 'react';
import Content from './Content/Content';

const Home = () => {
    return (
        <div>
            <div class="container-fluid bg-white text-dark p-5">
                <div class="container bg-white p-5">
                    <img src="https://cdn.shopify.com/s/files/1/0543/1637/files/slide_2_1024x_1080x.jpg?v=1484839485" class="display-4 fw-bold"></img>
                    {/* <hr> */}
                    <a href="https://leica-camera.com/en-int" class="btn btn-primary ml-5">Our Best Product</a>
                </div>
            </div>
            <Grid spacing-md={3} spacing-sm={3}>
                <Content />
            </Grid>  
        </div>
    );
};

export default Home;    
import { Container, Grid } from '@mui/material';
import React from 'react';
import ProductList from '../../Product/ProductList/ProductList';
import Sidebar from '../Sidebar/Sidebar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Content = () => {
    return (
        <Container >
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <Grid>
                    <ProductList />
                </Grid>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-evenly', marginBottom: "50px"}}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{
                            backgroundColor: "gainsboro",
                            maxWidth: "400px auto",
                            color: "black",
                            textAlign: "center"
                        }}
                    >
                        <Typography>Filter items</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div > 
                            <Grid>
                                <Sidebar />
                            </Grid>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Container>
    );
};

export default Content;
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddProduct from './Components/Admin/AddProduct/AddProduct';
import ProductContextProvider from './Contexts/ProductContext';
import Home from './Components/Home/Home'
import EditProduct from './Components/Admin/EditProduct/EditProduct';
import MyNavbar from "./Components/Header/MyNavbar";
import Register from './Components/Auth/Register/Register';

const MyRoutes = () => {
    return (
        <ProductContextProvider>
            <BrowserRouter>
                <MyNavbar />
                <Routes>
                    <Route path="/add" element={<AddProduct/>} />
                    <Route path="/" element={<Home/>} />
                    <Route path="/edit/:id" element={<EditProduct/>} />
                    <Route path="/register" element={<Register/>} />
                </Routes>
            </BrowserRouter>
        </ProductContextProvider>
    );
};

export default MyRoutes;
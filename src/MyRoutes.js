import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddProduct from './Components/Admin/AddProduct/AddProduct';
import ProductContextProvider from './Contexts/ProductContext';
import Home from './Components/Home/Home'
import EditProduct from './Components/Admin/EditProduct/EditProduct';
import Register from './Components/Auth/Register/Register';
import MyNavbar from './Components/Header/MyNavbar';
import ProductDetail from './Components/Product/ProductDetail/ProductDetail';
import Cart from './Components/Cart/Cart';
import Login from './Components/Auth/Login/Login';
import Payment from './Components/Payment/Payment';

const MyRoutes = () => {
    return (
        <ProductContextProvider>
            <BrowserRouter>
            <MyNavbar/>
                <Routes>
                    <Route path="/add" element={<AddProduct/>} />
                    <Route path="/" element={<Home/>} />
                    <Route path="/edit/:id" element={<EditProduct/>} />
                    <Route path="/detail/:id" element={<ProductDetail/>} />
                    <Route path="/cart" element={<Cart/>} />
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/payment" element={<Payment/>} />
                </Routes>
            </BrowserRouter>
        </ProductContextProvider>
    );
};

export default MyRoutes;
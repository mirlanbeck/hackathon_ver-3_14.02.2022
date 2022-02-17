import axios from 'axios';
import React, { createContext, useEffect, useReducer, useState } from 'react';
import { API } from '../Helpers/Constants';
import { auth } from '../Firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { calcSubPrice, calcTotalPrice } from '../Helpers/CalcPrice';

export const productContext = createContext()

const INIT_STATE = {
    products: null,
    edit: null,
    cart: {},
    cartLength: 0,
    paginatedPages: 1,
    detail: {}
}

const reducer = (state = INIT_STATE, action) => {
    switch(action.type) {
        case "GET_PRODUCTS":
            return {...state, products: action.payload.data,
                paginatedPages: Math.ceil(action.payload.headers["x-total-count"] / 3)
            }
        case "GET_EDIT_PRODUCT":
            return {...state, edit: action.payload}
        case "CHANGE_CART_COUNT":
            return {...state, cartLength: action.payload}
        case "GET_CART":
            return {...state, cart: action.payload}
        case "GET_DETAIL_PRODUCT":
            return {...state, detail: action.payload}
        default:
            return state
    }
}

const ProductContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)
    
    //! Create product
    const addProduct = async (newProduct) => {
        try {
            await axios.post(API, newProduct)
            getProducts()
        } catch (error) {
            alert(error)
        }
    }
    
    //! Read 
    const getProducts = async () => {
        try {
            let res = await axios.get(`${API}${window.location.search}`)
            let action = {
                type: "GET_PRODUCTS",
                payload: res
            }
            dispatch(action)
        } catch (error) {
            alert(error)
        }
    }
    
    //! Update product
    const editProduct = async (id) => {
        try {
            let res = await axios(`${API}/${id}`)
            let action = {
                type: "GET_EDIT_PRODUCT",
                payload: res.data
            }
            dispatch(action)
        } catch (error) {
            console.log(error);
        }
    }
    
    //! Save edited product
    const saveEditedProduct = async (updatedProduct) => {
        try {
            await axios.patch(`${API}/${updatedProduct.id}`, updatedProduct)
            getProducts()
        } catch (error) {
            console.log(error);
        }
    }
    
    //! Delete product
    const deleteProduct = async (id) => {
       await axios.delete(`${API}/${id}`)
       getProducts()
    }

    //! Cart - add to cart functionality
    
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newProduct = {
            item: product,
            count: 1,
            subPrice: 0
        }
        
        let filteredCart = checkProductInCart(product.id)
        if(filteredCart === true) {
            cart.products = cart.products.filter(elem => elem.item.id !== product.id)
        }
        else {
            cart.products.push(newProduct)
        }
        
        newProduct.subPrice = calcSubPrice(newProduct)
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: "CHANGE_CART_COUNT",
            payload: cart.products.length
        })
    }
    
    //! counts products in a cart
    const getCartLength = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "CHANGE_CART_COUNT",
            payload: cart.products.length
        })
    }
    
    //! to fetch and reflect data from cart (localstorage)
    const getCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "GET_CART",
            payload: cart
        })
    }
    
    const changeProductCount = (count, id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.products = cart.products.map(elem => {
            if (elem.item.id === id) {
                elem.count = count
                elem.subPrice = calcSubPrice(elem)
            }
            return elem
        })
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
    }
    
    //! Check product in cart 
    
    const checkProductInCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newCart = cart.products.filter(elem => elem.item.id === id)
        return newCart.length > 0 ? true : false
    }
    
    //! Delete product in cart
    const deleteProductInCart = (id) => {
        let deleteCart = JSON.parse(localStorage.getItem('cart'))
        deleteCart.products = deleteCart.products.filter(
            (elem) => elem.item.id !== id
        )
        localStorage.setItem("cart", JSON.stringify(deleteCart))
        getCart()
        dispatch({
            type: "CHANGE_CART_COUNT",
            payload: deleteCart.products.length
        })
    }
    
    //! Get detail functionality
    
    const getDetail = async (id) => {
        const res = await axios(`${API}/${id}`)
        let action = {
            type: "GET_DETAIL_PRODUCT",
            payload: res.data
        }
        dispatch(action)
    }
    
    
    // ! SIGN IN, SIGN UP

    function signUp(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }


    function signIn(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        return signOut(auth)
    }

    function useAuth(){
        const [currentUser, setCurrentUser] = useState()

        useEffect(() => {
            const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
            return unsub
        }, [])

        return currentUser
    }    

    return (
        <productContext.Provider value={{
            addProduct,
            getProducts,
            editProduct,
            saveEditedProduct,
            deleteProduct,
            addToCart,
            getCartLength,
            getCart,
            checkProductInCart,
            changeProductCount,
            deleteProductInCart,
            getDetail,
            useAuth,
            signUp,
            signIn,
            logout,
            edit: state.edit,
            products: state.products,
            paginatedPages: state.paginatedPages,
            cartLength: state.cartLength,
            cart: state.cart,
            detail: state.detail
        }}>
            {children}           
        </productContext.Provider>
    );
};

export default ProductContextProvider;
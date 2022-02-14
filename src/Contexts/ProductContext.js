import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import { API } from '../Helpers/Constants';

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
    
    return (
        <productContext.Provider value={{
            addProduct,
            getProducts,
            editProduct,
            saveEditedProduct,
            deleteProduct,
            edit: state.edit,
            products: state.products,
            paginatedPages: state.paginatedPages
            
        }}>
            {children}           
        </productContext.Provider>
    );
};

export default ProductContextProvider;
import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state => kondisi awal state
const initialState = {
    transactions: [],
    error: null,
    loading: true
}

// Create context => react me-render komponen yang menerima objek 
//Context ini akan membaca nilai context saat ini dari pencocokan terdekat provider di atasnya (parent) dalam diagram.
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    //mengambil state dan dispatch dr app reducer
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions => mengirim action dan state ke app reducer
    async function getTransactions() {
        try {
          const res = await axios.get('/api/v1/transactions');
    
          dispatch({
            type: 'GET_TRANSACTIONS',
            // data from backend
            payload: res.data.data
          });
        } catch (err) {
          dispatch({
            type: 'TRANSACTION_ERROR',
            payload: err.response.data.error
          });
        }
      }
    
      async function deleteTransaction(id) {
        try {
          await axios.delete(`/api/v1/transactions/${id}`);
    
          dispatch({
            type: 'DELETE_TRANSACTION',
            // data from backend
            payload: id
          });
        } catch (err) {
          dispatch({
            type: 'TRANSACTION_ERROR',
            payload: err.response.data.error
          });
        }
      }
    
      async function addTransaction(transaction) {
        // Because we are sending data, we must add Content-Type
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
    
        try {
          const res = await axios.post('/api/v1/transactions', transaction, config);
    
          dispatch({
            type: 'ADD_TRANSACTION',
            // data from backend
            payload: res.data.data
          });
        } catch (err) {
          dispatch({
            type: 'TRANSACTION_ERROR',
            payload: err.response.data.error
          });
        }
      }

    return (
        //memungkinkan komponen konsumsi (child) untuk menerima perubahan context
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            error: state.error,
            loading: state.loading,
            getTransactions,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </GlobalContext.Provider>);
}
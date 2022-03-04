import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()
const INITIAL_STATE = {
  loading: false,
  cart : cartItems,
  total : 0,
  amount : 3
}
const AppProvider = ({ children }) => {
  const [state,dispatch] = useReducer(reducer,INITIAL_STATE)
  const fetchData= async() =>{
    dispatch({type:'LOADING'})
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({type:'FETCHED_DATA',payload:cart});
  }
  useEffect(()=>{
    fetchData();
  },[])
  useEffect(()=>{
    dispatch({type:'GET_TOTAL'})
  },[state.cart])
  const clearCart = () =>{
    dispatch({type:'CLEAR_CART'});
  }
  const DeleteItem = (id) =>{
    dispatch({type:'DELETE_ITEM',payload:id})
  }
  const incAmount = (id)=>{
    dispatch({type:'INCREASE_AMOUNT',payload:id});
  }
  const decAmount = (id)=>{
    dispatch({type:'DECREASE_AMOUNT',payload:id});
  }
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        DeleteItem,
        incAmount,
        decAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

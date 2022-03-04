const reducer = (state,action) => {
  switch(action.type){
    case 'CLEAR_CART':{
      return {...state,cart:[],amount:0};
    }
    case 'DELETE_ITEM':{
      return {...state,cart:deleteItem(state.cart,action.payload),amount:state.amount-1};
    }
    case 'INCREASE_AMOUNT':{
      const tempCart = state.cart.map((item)=>{
        if(item.id===action.payload)
          return {...item,amount:item.amount+1};
        return item;
      })
      return {...state,cart:tempCart};
    }
    case 'DECREASE_AMOUNT':{
      const tempCart = state.cart.map((item)=>{
        if(item.id===action.payload)
          return {...item,amount:item.amount-1};
        return item;
      }).filter((item)=>item.amount!=0)
      return {...state,cart:tempCart};
    }
    case 'GET_TOTAL':{
      let {finalAmount,total} = state.cart.reduce(
        (cartTotal,cartItem)=>{
          const {amount,price} = cartItem;
          cartTotal.finalAmount+=amount;
          cartTotal.total+=(price*amount);
          return cartTotal
      },
        {                           //Initail values of cartTotal(accumulator)
          finalAmount: 0,
          total: 0,
        })
        total=parseFloat(total.toFixed(2));
        return {...state,amount:finalAmount,total};
    }
    case 'LOADING':{
      return {...state,loading:true};
    }
    case 'FETCHED_DATA':{
      return {...state,loading:false,cart:action.payload}
    }
    default :
      return state
  }
}

const deleteItem = (cart,id) =>{
  return cart.filter((item)=>{
    return item.id!=id
  })
}

export default reducer
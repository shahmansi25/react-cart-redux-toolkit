import { createReducer } from  '@reduxjs/toolkit';

export const cartReducer = createReducer({
    cartItems: [],
    subTotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
},
    {
        addToCart: (state, action) => {
            const item = action.payload;
            const isItemExist = state.cartItems.find((i) => i.id === item.id);
            if (isItemExist) { 
                state.cartItems.forEach(i => {
                    if (item.id === i.id) {
                        i.quantity += 1;
                    }
                })
            }
            else {
                state.cartItems.push(item);
            }
        
        },
        remove: (state,action) => {
            const item = state.cartItems.find((i) => i.id === action.payload);  
            if (item.quantity > 1) { 
                state.cartItems.forEach(i => {
                    if (action.payload === i.id) {
                        i.quantity -= 1;
                    }
                })
            }
        },
        deleteFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
        },
        calculatePrice: (state) => {
            let sum = 0;
            state.cartItems.forEach(item => {
                sum += (item.price * item.quantity);
            })
            state.subTotal = parseFloat(sum);
            state.shipping = parseFloat(state.subTotal > 1000 ? 0 : 100);
            state.tax = parseFloat(state.subTotal * 0.18).toFixed(2);
            state.total = parseFloat(sum + state.tax + state.shipping).toFixed(2);
        }
    },

   
    
)
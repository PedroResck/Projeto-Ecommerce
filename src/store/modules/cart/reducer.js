import { createReducer } from '@reduxjs/toolkit';
import {
  addToCart,
  removeFromCart,
  updateAmount,
} from './actions';

const cart = createReducer([], {
  [addToCart]: (state, action) => {
    const { payload } = action;
    const { id } = payload;

    const itemExists = state.find(item => item.id === id);
    
    if (itemExists) {
      itemExists.amount = itemExists.amount + 1;
    } else {
      payload.amount = 1;
      state.push(payload);
    }
  },
  [removeFromCart]: (state, action) => {
    const productIndex = state.findIndex(item => item.id === action.payload);

    if (productIndex >= 0) {
      state.splice(productIndex, 1);
    }
  },
  [updateAmount]: (state, action) => {
    const { id, amount } = action.payload;
    const itemExists = state.find(item => item.id === id);

    if (itemExists) {
      console.log(action.payload)
      const itemIndex = state.findIndex(item => item.id === itemExists.id);

      if (itemIndex >= 0 && amount >= 0) {
        state[itemIndex].amount = Number(amount);
      }
    }

    return state;
  },
});

export default cart

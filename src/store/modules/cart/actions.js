import { createAction } from '@reduxjs/toolkit';

export const addToCart = createAction('cart/add_item');
export const removeFromCart = createAction('cart/remove_item');
export const updateAmount = createAction('cart/update_amount');

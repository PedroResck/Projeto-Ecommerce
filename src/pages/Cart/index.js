import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FiPlusCircle, FiMinusCircle, FiXCircle } from 'react-icons/fi'

import * as CartActions from '../../store/modules/cart/actions';
import './styles.css';

export default function Cart() {
  const cart = useSelector(state =>
    state.cart.map(item => ({
      ...item,
      subtotal: item.price * item.amount,
    }))
  );

  const total = useSelector(state =>
    state.cart.reduce((totalSum, product) => {
      return totalSum + product.price * product.amount;
    }, 0)
  );

  const dispatch = useDispatch();

  function increment(item) {
    dispatch(CartActions.updateAmount({
      id: item.id,
      amount: item.amount + 1,
    }));
  }

  function decrement(item) {
    dispatch(CartActions.updateAmount({
      id: item.id,
      amount: item.amount - 1,
    }));
  }

  return (
    <main className="container">
      <div className="bag-container">
        <table className="item-table">
          <thead>
            <tr>
              <th />
              <th>Product</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.title} />
                </td>
                <td>
                  <strong>{item.title}</strong>
                  <span>€ {item.price}</span>
                </td>
                <td>
                  <div>
                    <button type="button" onClick={() => decrement(item)}>
                      <FiMinusCircle size={20} color="#eb5c30" />
                    </button>
                    <input type="number" readOnly value={item.amount} />
                    <button type="button" onClick={() => increment(item)}>
                      <FiPlusCircle size={20} color="#eb5c30" />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>€ {item.subtotal.toFixed(3).slice(0,-1)}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => dispatch(CartActions.removeFromCart(item.id))}
                  >
                    <FiXCircle size={20} color="#eb5c30" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <footer>
          <button type="button">Buy now!</button>

          <div className="total">
            <span>Total</span>
            <strong>€ {total.toFixed(3).slice(0,-1)}</strong>
          </div>
        </footer>
      </div>
    </main>
  );
}

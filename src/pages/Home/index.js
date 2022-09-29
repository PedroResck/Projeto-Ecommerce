import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FiShoppingCart } from 'react-icons/fi';

import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';

import './styles.css';

export default function Home() {
  const [items, setItems] = useState([]);
  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, item) => {
      sumAmount[item.id] = item.amount;

      return sumAmount;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadItems() {
      const response = await api.get('/items');

      setItems(response.data);
    }

    loadItems();
  }, []);

  function handleAddProduct(item) {
    dispatch(CartActions.addToCart(item));
  }

  return (
    <main className="container">
      <ul className="item-catalog">
        {items.map(item => (
          <li key={item.id} className="item-container">
            <img src={item.image} alt={item.title} />
            <strong>{item.title}</strong> 
            <span>€ {item.price}</span>

            <button type="button" onClick={() => handleAddProduct(item)}>
              <div>
                <FiShoppingCart size={16} color="black" />{' '}
                {amount[item.id] || 0}
              </div>

              <span>Add</span>
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

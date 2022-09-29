import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FiShoppingCart } from 'react-icons/fi';
import './styles.css';

import logo from '../../assets/3d-cube.png';

export default function Header() {;
  const cartSize = useSelector(state => state.cart.length);
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img className="logo-icon" src={logo} alt="Rocketshoes" />
        <span className="logo-text">3D Shop</span>
      </Link>

      <Link to="/cart" className="header-cart">
        <div>
          <strong>CART</strong>
          <span>
            <strong>{cartSize}</strong> Products
          </span>
        </div>
        <FiShoppingCart size={36} color="black" />
      </Link>
    </header>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';

import imgPathEmpty from '../assets/img/empty-cart.png';

export const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Корзина пустая <icon>😕</icon>
      </h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={imgPathEmpty} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default CartEmpty;

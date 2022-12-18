/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiPath } from '../utils/config';
import { addItem, CartItem } from '../redux/slices/cartSlice';

const FullPizza = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const nav = useNavigate();

  const [pizza, setPizza] = React.useState<CartItem>();

  React.useEffect(() => {
    const fethPizza = async () => {
      try {
        const { data } = await axios.get(`${apiPath}/${id}`);
        // console.log(data);

        const item: CartItem = {
          id: data?.id,
          imageUrl: data?.imageUrl,
          price: data?.price,
          title: data?.title,
          count: 1,
          type: 'тонкая',
          size: 30,
        };
        setPizza(item);
      } catch (error) {
        nav('/');
        alert('Такой питсы нетЪ!');
      }
    };

    fethPizza();
  }, []);

  if (!pizza) {
    return <h1>''</h1>;
  }
  return (
    <div className="container__full">
      <img src={pizza.imageUrl} alt="pizza" />
      <div>
        <h2>{pizza.title}</h2>
        <div className="short-description">
          Мясной Микс {pizza.size} см, традиционное тесто, 600 г
        </div>
        <div className="options">
          Запеченная буженина из свинины, острая чоризо, пикантная пепперони,
          бекон, моцарелла, фирменный томатный соус
        </div>
        <div className="cart__bottom-buttons">
          <button
            onClick={() => dispatch(addItem(pizza))}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
          </button>
          <Link
            to="/"
            className="button button--outline button--add go-back-btn"
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13L1 6.93015L6.86175 1"
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;

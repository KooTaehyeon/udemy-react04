import React, { useContext, useEffect, useState } from 'react';
import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const numberOfCartItem = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const [btnIsHigh, setBtnHigh] = useState(false);
  const { items: int } = cartCtx;
  const btnClasses = `${styles.button} ${btnIsHigh ? styles.bump : ''}`;
  useEffect(() => {
    if (int.length === 0) {
      return;
    }
    setBtnHigh(true);
    const times = setTimeout(() => {
      setBtnHigh(false);
    }, 300);
    return () => {
      clearTimeout(times);
    };
  }, [int]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        {' '}
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItem}</span>
    </button>
  );
};

export default HeaderCartButton;

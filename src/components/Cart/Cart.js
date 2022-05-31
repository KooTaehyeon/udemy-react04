import React, { useContext, useState } from 'react';
import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
const Cart = (props) => {
  const [isCheck, setIsCheck] = useState(false);
  const [isSubmitTing, setIsSubmitTing] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const orderHandler = () => {
    setIsCheck(true);
  };
  const submitOrderHandler = async (userData) => {
    setIsSubmitTing(true);
    await fetch(
      'https://udemy-react-f19a8-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitTing(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };
  console.log(isCheck);
  const cartItem = (
    <ul className={styles['cart-items']}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );
  const moalAcions = (
    <div className={styles.actions}>
      <button className={styles['button-alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles['button']} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <React.Fragment>
      {cartItem}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheck && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheck && moalAcions}
    </React.Fragment>
  );
  const isSubmitTingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={styles.actions}>
        <button className={styles['button-alt']} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitTing && !didSubmit && cartModalContent}
      {isSubmitTing && isSubmitTingModalContent}
      {!isSubmitTing && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;

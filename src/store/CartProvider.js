import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  itmes: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updateItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return { item: updateItems, totalAmount: updatedTotalAmount };
  } else if (action.type === 'REMOVE') {
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartState({ type: 'ADD', item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartState({ type: 'REMOVE', id: id });
  };

  const cartContext = {
    items: cartState.itmes,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

import React, { useContext } from "react";
import Modal from "../screen/Modal";
import classes from "./Cart.module.css";
import CartContext from "../store/CartContext";
import CartItems from "./CartItems";

function Cart(props) {
  const cartCtx = useContext(CartContext);
  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const addCartItemHandler = (item) => {
    cartCtx.addItem(item);
  };

  const removeCartItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((items) => (
        <CartItems
          key={items.id}
          name={items.name}
          amount={items.amount}
          price={items.price}
          onRemove={removeCartItemHandler.bind(null, items.id)}
          onAdd={addCartItemHandler.bind(null, items)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;

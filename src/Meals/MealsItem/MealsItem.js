import React, { useContext } from "react";
import CartContext from "../../store/CartContext";
import classes from "./MealsItems.module.css";
import MealsItemsForm from "./MealsItemsForm";

function MealsItem(props) {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealsItemsForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}

export default MealsItem;

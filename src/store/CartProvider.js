import React, { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const alreadyHasCartItem = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItems = state.items[alreadyHasCartItem];
    let updateItems;
    if (existingCartItems) {
      const updateItem = {
        ...existingCartItems,
        amount: existingCartItems.amount + action.item.amount,
      };
      updateItems = [...state.items];
      updateItems[alreadyHasCartItem] = updateItem;
    } else {
      updateItems = state.items.concat(action.item);
    }
    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const alreadyHasCartItem = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[alreadyHasCartItem];
    let updateTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
      console.log("update==>", updatedItems);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[alreadyHasCartItem] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updateTotalAmount,
    };
  }
  return defaultCartState;
};

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addCartItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeCartItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addCartItemHandler,
    removeItem: removeCartItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;

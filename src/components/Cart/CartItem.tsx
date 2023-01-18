import { useState, useContext } from "react";
import { CartItemObject } from "../../common/types/common.types";
import StyledCartItem from "./CartItemStyles";

import { UserContext } from "../../store/user-context";

const CandyItem: React.FC<CartItemObject> = (props) => {
  const [amount, setAmount] = useState(props.amount);
  const { addItem, removeItem, cartItems } = useContext(UserContext);

  const btnCartMinusHandler = () => {
    setAmount((prevState) => {
      return prevState <= 1 ? prevState : --prevState;
    });

    //guard clause
    if (amount <= 1) return;

    addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: -1,
      image: props.image,
    });
  };
  const btnCartPlusHandler = () => {
    setAmount((prevState) => {
      return prevState >= 99 ? prevState : ++prevState;
    });

    //guard clause
    if (amount >= 99) return;

    addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: 1,
      image: props.image,
    });
  };

  return (
    <StyledCartItem>
      <img alt="" src={props.image} />
      <h3 className="cart-item__title">{props.name}</h3>
      <p className="item__price">{props.price} zł</p>
      <p className="cart-item--signs"> x </p>
      <div className="btns-add-remove">
        <button type="button" onClick={btnCartMinusHandler}>
          -
        </button>
        <p>{amount}</p>
        <button type="button" onClick={btnCartPlusHandler}>
          +
        </button>
      </div>
      <p className="cart-item--signs"> = </p>
      <p className="item__price-total">{props.price * amount} zł</p>
    </StyledCartItem>
  );
};

export default CandyItem;

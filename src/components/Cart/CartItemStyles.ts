import styled from "styled-components";
import {
  Container,
  Item,
  Image,
  ButtonLittle,
} from "../../common/styles/componentsStyles";
import { theme } from "../../common/styles/theme";

const StyledCartItem = styled(Item)`
  align-items: center;
  justify-content: space-between;

  //TODO:
  @media only screen and ${theme.devices.mobileXS} {
    /* GRID MOBILE*/
  }

  & .cart-item__title {
    font-size: 1.5rem;
    text-align: left;
    width: 40%;

    @media only screen and ${theme.devices.mobileXS} {
      font-size: 1.2rem;
      width: 30%;
    }
  }

  & .item__price {
    width: 2.5rem;
    min-width: 2.5rem;
  }

  & .item__price-total {
    width: 3.5rem;
  }
`;

export const CartImage = styled(Image)`
  height: 4rem;
  width: 4rem;
`;

export const BtnsAddRemoveContainer = styled(Container)`
  padding: 0 4rem;
  gap: 0.5rem;
  width: 2rem;

  @media only screen and ${theme.devices.mobileXS} {
    padding: 0 2.5rem;
    gap: 0.2rem;
  }
`;

export const ButtonDelete = styled(ButtonLittle)`
  padding: 0;
`;

export default StyledCartItem;

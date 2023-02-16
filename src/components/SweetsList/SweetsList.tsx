import { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../../store/user-context";
import { useNavigate } from "react-router-dom";
import { navKeys } from "../../routes/routes";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import {
  getAvailableCandies,
  setLocalStorageSortType,
} from "../../common/service/common-service";
import { isSortType, sortCandies, filterCandies } from "../../common/helpers";

import CandyItem from "./CandyItem";

import { CartIcon } from "../../assets/icons";

import {
  Container,
  EmptyListMsg,
  Input,
  Label,
  Select,
  VFlexBox,
} from "../../common/styles/componentsStyles";
import { ContainerEnd, StyledSweetsList } from "./SweetsListStyles";
import { CartButton } from "../Layout/MainHeader/MainHeaderStyles";

import { CandyItemObject, SortTypes } from "../../common/types/common.types";

import { useTheme } from "styled-components";

import Loader from "../../common/styles/loader";
import toast from "react-hot-toast";

const SweetsList = () => {
  const [sweets, setSweets] = useState<CandyItemObject[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<CandyItemObject[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const { sortType, setSortType } = useContext(UserContext);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  const theme = useTheme();

  const fetchCandies = useCallback(async () => {
    setIsLoading(true);
    setError(false);

    try {
      const data = await getAvailableCandies();
      if (!data) {
        throw new Error("no data available");
      }
      setSweets(data);
    } catch (e: any) {
      toast.error(`Failed to fetch sweets (${e.message})`);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCandies();
  }, [fetchCandies]);

  useEffect(() => {
    const sortedCandies = sortCandies(sweets, sortType);
    setSweets(sortedCandies);
  }, [sweets, sortType]);

  useEffect(() => {
    const filteredCandies = filterCandies(searchInputValue, sweets);
    setFilteredSweets(filteredCandies);
  }, [sweets, sortType, searchInputValue]);

  const sortTypeChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const sortValue = event.target.value;
    if (isSortType(sortValue)) {
      setSortType(sortValue);

      setLocalStorageSortType(sortValue);
    }
  };

  const searchInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setSearchInputValue(inputValue);

    const filteredCandies = filterCandies(inputValue, sweets);
    setFilteredSweets(filteredCandies);
  };

  const handleNavToCart = () => {
    navigate(navKeys.cart);
  };

  return (
    <StyledSweetsList>
      <ContainerEnd>
        <div>
          <Label htmlFor="Search">Search:</Label>
          <Input
            id="search"
            placeholder="Enter candy name..."
            onChange={searchInputChangeHandler}
          />
        </div>
        <div>
          <Label htmlFor="sortType">Sort:</Label>
          <Select
            name="sortType"
            id="sortType"
            data-testid="sortSelect"
            value={sortType}
            onChange={sortTypeChangeHandler}
          >
            <option value={SortTypes.ALFABETICAL_ASC}>Afabetical &darr;</option>
            <option value={SortTypes.ALFABETICAL_DSC} data-testid="sortOption">
              Afabetical &uarr;
            </option>
            <option value={SortTypes.BY_PRICE_ASC}>By price &darr;</option>
            <option value={SortTypes.BY_PRICE_DSC}>By price &uarr;</option>
          </Select>
        </div>
      </ContainerEnd>
      {filteredSweets &&
        filteredSweets.map((item) => (
          <CandyItem
            id={item.id}
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      {error && !isLoading && (
        <VFlexBox $hasError={error}>
          <div className="error-message">Failed to load sweets</div>
        </VFlexBox>
      )}
      {isLoading && !error && (
        <VFlexBox>
          <p>Loading...</p>
          <Loader className="loader"></Loader>
        </VFlexBox>
      )}
      {sweets.length === 0 && !isLoading && !error && (
        <EmptyListMsg>
          No sweets available at this moment. Please try Again later.
        </EmptyListMsg>
      )}
      {filteredSweets.length === 0 &&
        sweets.length !== 0 &&
        !isLoading &&
        !error && <EmptyListMsg>No sweets match searching name.</EmptyListMsg>}

      <Container className="btn-go-to-cart__container">
        <CartButton
          data-testid="cartBtn"
          className="call-to-action"
          onClick={handleNavToCart}
        >
          {width > theme.screens.large ? <span>Go to Cart</span> : <CartIcon />}
        </CartButton>
      </Container>
    </StyledSweetsList>
  );
};

export default SweetsList;

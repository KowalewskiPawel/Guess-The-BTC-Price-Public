import ADD_PRICE from "./ADD_PRICE";

const addPrice = (price) => {
  return {
    type: ADD_PRICE,
    price: price,
  };
};

export default addPrice;

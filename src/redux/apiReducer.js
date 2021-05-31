import ADD_PRICE from "./ADD_PRICE";

const apiReducer = (
  state = {
    price: 0,
  },
  action
) => {
  switch (action.type) {
    case ADD_PRICE:
      return Object.assign(
        { ...state },
        {
          price: action.price,
        }
      );
    default:
      return state;
  }
};

export default apiReducer;

import addPrice from "./addPrice";

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewPrice: (data) => {
      dispatch(addPrice(data));
    },
  };
};

export default mapDispatchToProps;

const initialState = {
  loading: false,
  cartItem: [],
};

export const RootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UpdateCart":
      return {
        ...state,
        cartItem: [...state.cartItem, action.payload],
      };
    case "Update_Q":
      return {
        ...state,
        cartItem: state.cartItem.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    default:
      return state;
  }
};

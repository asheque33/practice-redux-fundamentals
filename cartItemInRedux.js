const GET_CART_ITEMS = "GET_CART_ITEMS";
const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";

// initialState
const initialCartState = {
  cart: ["egg"],
  numberOfCartItems: 1,
};

// action creators(type,payload)
const getCartItems = () => {
  return {
    type: GET_CART_ITEMS,
  };
};
const addToCartItem = (cartItem) => {
  return {
    type: ADD_ITEM_TO_CART,
    payload: cartItem,
  };
};
const cartItemReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case GET_CART_ITEMS:
      return {
        ...state,
      };
    case ADD_ITEM_TO_CART:
      return {
        cart: [...state.cart, action.payload],
        numberOfCartItems: state.numberOfCartItems + 1,
      };
    default:
      return state;
  }
};

// creating store
const { createStore } = require("redux");
const store = createStore(cartItemReducer);

// subscribe to changes
store.subscribe(() => {
  console.log(store.getState());
});

// dispatch action
store.dispatch(getCartItems());
store.dispatch(addToCartItem("Coconut Oil"));

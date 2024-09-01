/*
 * state(initialState)
 **action(function er moddhe action make korbe => 2ta props thakbe 1.type 2. payload)
 ***reducer(object)
 **** store
 */
const { createStore } = require("redux");
// constants
const GET_USERS = "GET_USERS";
const ADD_USER = "ADD_USER";
// state(initialState)
const usersInitialState = {
  users: ["asheque"],
  count: 1,
};
// action
const getUsers = () => {
  return {
    type: "GET_USERS",
    // payload: fetch('https://jsonplaceholder.typicode.com/users')
    //    .then(response => response.json())
    //    .then(data => data)
  };
};
const addUser = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};
const userReducer = (state = usersInitialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
      };
    case ADD_USER:
      return {
        users: [...state.users, action.payload],
        count: state.count + 1,
      };
    // Add more cases as needed. For example, ADD_POST, DELETE_POST, UPDATE_POST...

    default:
      state;
  }
};
const store = createStore(userReducer);
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(getUsers());
store.dispatch(addUser("Mahmud"));

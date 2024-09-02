const { default: axios } = require("axios");
const { createStore, applyMiddleware } = require("redux");
const { thunk } = require("redux-thunk");

// constants
const GET_TODOS_REQUEST = "GET_TODOS_REQUEST";
const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
const GET_TODOS_FAILURE = "GET_TODOS_FAILURE";
API_URL = "https://jsonplaceholder.typicode.com/todos";

// initialState
const initialTodosState = {
  isLoading: false,
  error: null,
  todos: ["axios"],
};
// actions[type,paload]
const getTodosRequest = () => {
  return {
    type: GET_TODOS_REQUEST,
  };
};
const getTodosSuccess = (todos) => {
  return {
    type: GET_TODOS_SUCCESS,
    payload: todos,
  };
};
const getTodosFailure = (error) => {
  return {
    type: GET_TODOS_FAILURE,
    payload: error,
  };
};

const todosData = () => {
  return async (dispatch) => {
    dispatch(getTodosRequest());
    try {
      await axios.get(API_URL).then((res) => {
        const todos = res.data;
        const titles = todos.map((t) => t.title);
        dispatch(getTodosSuccess(titles));
      });
    } catch (error) {
      const errorMessage = error.message;
      dispatch(getTodosFailure(errorMessage));
    }
  };
};
// reducer
const todosReducer = (state = initialTodosState, action) => {
  switch (action.type) {
    case GET_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: [...state.todos, ...action.payload],
        // todos: action.payload,
      };
    case GET_TODOS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
// store
const store = createStore(todosReducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
});
// action dispatch
store.dispatch(todosData());

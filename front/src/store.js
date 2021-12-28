import { createStore, combineReducers } from 'redux'

import {loginFormReducer, isLoggedInReducer} from "./login";
import {areaReducer} from "./area";


let reducer = combineReducers({
    isLoggedIn: isLoggedInReducer,
    loginForm: loginFormReducer,
    area: areaReducer,
});

export const store = createStore(
    reducer, /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

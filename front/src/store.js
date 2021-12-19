import { createStore, combineReducers } from 'redux'
import {loginReducer} from "./app";
import {loginFormReducer} from "./login";
import {areaReducer} from "./area";


let reducer = combineReducers({
    isLoggedIn: loginReducer,
    loginForm: loginFormReducer,
    area: areaReducer,
});

export let store = createStore(
    reducer, /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

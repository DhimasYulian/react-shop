import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { productReducer } from './reducer/productReducer';
import { cartReducer } from './reducer/cartReducer';

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
    products: productReducer,
    cart: cartReducer
}),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

export default store;
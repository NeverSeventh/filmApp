import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import initialState from './initialState';
import reducer from './reducers/combined';
import filmReducer from './reducers/filmReducer';
import userReducer from './reducers/userReducer';








const store = createStore(reducer,initialState, composeWithDevTools(applyMiddleware(thunk)));



export default store;
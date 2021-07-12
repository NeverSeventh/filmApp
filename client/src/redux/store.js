import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import initialState from './initialState';
import reducer from './reducers/combined';









const store = createStore(reducer,initialState, composeWithDevTools(applyMiddleware(thunk)));



export default store;
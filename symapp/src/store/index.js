import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';

// So build a Redux store, we need the "initialState"
// and all of our reducer functions that return
// new state.
//import initialState from './initialState';
import initialState from './initialState';
import AppStore from './AppStore';


// The "createStore()" and "combineReducers()" functions
// perform all of the heavy-lifting.
export default createStore(combineReducers({
  AppStore
}),
initialState


);

import { combineReducers } from "redux";
import { ALL_FILMS, LOGIN, LOGOUT, SIGNUP,CURRENT_FILM } from "../types";

const reducer = (state=[],action) => {

    switch(action.type) {

        // Film Reducer
        case ALL_FILMS:
            return {
                ...state,
                films:action.payload
            }
        case CURRENT_FILM:
            return {
                ...state,
                currentFilm:action.payload
            }



        // User Reducer
        case LOGIN:
            return state;

        case SIGNUP:
            return state;

        case LOGOUT:
            return state
    

        default:
            return state;
    }
}




export default reducer;
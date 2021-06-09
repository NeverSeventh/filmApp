import { combineReducers } from "redux";
import { ALL_FILMS, LOGIN, LOGOUT, SIGNUP,CURRENT_FILM, CURRENT_USER } from "../types";

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
            return {
                ...state,
                userid:action.payload
            } 
            
                

        
        case CURRENT_USER:
            return {
                ...state,
                currentUser:action.payload
            }

        case SIGNUP:
            return {
                ...state,
                userid:action.payload
            }

        case LOGOUT:
            return state
    

        default:
            return state;
    }
}




export default reducer;
import { combineReducers } from "redux";
import { ALL_FILMS, LOGIN, LOGOUT, SIGNUP,CURRENT_FILM, CURRENT_USER, ADD_TO_FAVOURITES, ADD_COMMENT, RATE_FILM, FILM_RATING_USER } from "../types";

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
        case ADD_TO_FAVOURITES:
            return state;
        case ADD_COMMENT:
            return {
                ...state,
                ...state.currentFilm,
                comments:[...state.currentFilm.comments, action.payload]
            }
        case RATE_FILM: 
            return state
        case FILM_RATING_USER:
            return {
                ...state,
                ...state.currentFilm,
                currentRating:action.payload
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
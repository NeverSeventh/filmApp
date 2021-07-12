
import { ALL_FILMS, LOGIN, LOGOUT, SIGNUP,CURRENT_FILM, CURRENT_USER, ADD_TO_FAVOURITES, ADD_COMMENT, RATE_FILM, FILM_RATING_USER,IS_ADMIN,ERROR,TOKEN, EDIT_FILM,NO_ERROR } from "../types";

const reducer = (state=[],action) => {
   
    switch(action.type) {
        
        // Film Reducer
        case ALL_FILMS:
            return {
                ...state,
                films:action.payload,
                
            }
        case FILM_RATING_USER:
            return {
                ...state,
                currentRating:action.payload
            }
        case CURRENT_FILM:
            
            return {
                ...state,
                currentFilm:action.payload,
                
            }
        case ADD_TO_FAVOURITES:
            return state;
        case ADD_COMMENT:

            return {
                ...state,
                currentFilm: {
                    ...state.currentFilm,
                    comments:[...state.currentFilm.comments, action.payload]
                }
                
            }
        case RATE_FILM: 
            return state



        // User Reducer
        case LOGIN:
            return state;
            
        
                

        
        case CURRENT_USER:
            return {
                ...state,
                currentUser:action.payload,
                
            }

        case SIGNUP:
            return state;

        case LOGOUT:
            return {
                ...state,
                userid:undefined,
                currentUser:{},
                isAdmin:false
            }
        
        case IS_ADMIN:
            return {
                ...state,
                isAdmin:action.payload
            }

        //admin reducer

        case EDIT_FILM:
            return state;

        case ERROR:
            return {
                ...state,
                errorMesg:action.payload,
            }
        case NO_ERROR:
            return {
                ...state,
                errorMesg:''
            }

        default:
            return state;
    }
}




export default reducer;
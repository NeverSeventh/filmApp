
import { LOGIN, SIGNUP, LOGOUT } from "../types";

const initialState = {
    films:[],
    favouriteFilms:[],
    currentFilm:{},
    currentUser:{},
    userid:undefined,
    currentRating:0,
    errorMesg:'',
    authToken:''
    
}


const userReducer = (state=initialState,action) => {

    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                authToken:action.payload
            }

        case SIGNUP:
            return state;

        case LOGOUT:
            return state

        default:
            return state;
    }
}

export default userReducer;
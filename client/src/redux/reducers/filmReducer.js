
import { ADD_FILM, ALL_FILMS } from "../types";

const initialState = {
    films:[],
    favouriteFilms:[],
    
}

const filmReducer = (state=initialState,action) => {

    switch(action.type) {
        case ALL_FILMS:
            return {
                ...state,
                films:action.payload
            }


        default:
            return state;
    }
}


export default filmReducer;
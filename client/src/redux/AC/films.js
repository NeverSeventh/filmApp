import { ALL_FILMS,CURRENT_FILM  } from "../types"


const allFilmsActionCreator = (payload) => {
    return {type:ALL_FILMS, payload:payload}
}

const fetchAllFilms = () => async(dispatch,getState) => {
    const responce = await fetch("http://localhost:6970/film/all");
    const films = await responce.json();
   
    dispatch(allFilmsActionCreator(films));
}

const currentFilmActionCreator = (payload) => {
    return {type:CURRENT_FILM, payload:payload}
}

const fetchCurrentFilm = (title) => async(dispatch,getState) => {
    const responce = await fetch(`http://localhost:6970/film/${title}`);
    const film = await responce.json();
    
    dispatch(currentFilmActionCreator(film));
}

export {fetchAllFilms,fetchCurrentFilm}


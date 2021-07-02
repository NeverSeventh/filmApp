import { ADD_COMMENT, ADD_TO_FAVOURITES, ALL_FILMS,CURRENT_FILM, FILM_RATING_USER, RATE_FILM  } from "../types"


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

const addToFavouritesActionCreator = (payload) => {
    return {type:ADD_TO_FAVOURITES, payload:payload}
}

const fetchAddToFavourites = (userid,filmTitle) => async(dispatch,getState) => {
    const responce = await fetch('http://localhost:6970/film/add',{
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body:JSON.stringify({userid:userid,film:filmTitle})
       });
    const message = await responce.json();
    dispatch(addToFavouritesActionCreator(message));
}

const addCommentActionCreator = (payload) => {
    return{type:ADD_COMMENT, payload:payload}
}

const fetchAddComment = (title,userid,text) => async (dispatch,getState) => {
    const responce = await fetch(`http://localhost:6970/film/${title}`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body:JSON.stringify({userid:userid,title:title, commentText:text})
       });
    const comment = await responce.json();
    dispatch(addCommentActionCreator(comment))
}

const rateFilmActionCreator = (payload) => {
    return{type:RATE_FILM,payload:payload}
}

const fetchRateFilm = (title,userid,value) => async (dispatch,getState) => {
    const responce = await fetch(`http://localhost:6970/film/${title}`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body:JSON.stringify({userid:userid,title:title, rating:value})
       });
    
    
    dispatch(rateFilmActionCreator());
    
}

const filmRatingUserActionCreator = (payload) => {
    return {type:FILM_RATING_USER,payload:payload}
}

const fetchFilmRatingUser = (title,userid) => async (dispatch,getState) => {
    const responce = await fetch(`http://localhost:6970/film/${title}/rating`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body:JSON.stringify({userid:userid,title:title})
       });
       
    const rating = await responce.json();
       
    dispatch(filmRatingUserActionCreator(rating));
    
}

export {fetchAllFilms,fetchCurrentFilm, fetchAddToFavourites, fetchAddComment,fetchRateFilm,fetchFilmRatingUser}


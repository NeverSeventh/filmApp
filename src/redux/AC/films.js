import { ADD_COMMENT, ADD_TO_FAVOURITES, ALL_FILMS,CURRENT_FILM, FILM_RATING_USER, RATE_FILM  } from "../types"
import { noErrorActionCreator } from "./error";

const allFilmsActionCreator = (payload) => {
    return {type:ALL_FILMS, payload:payload}
}

const fetchAllFilms = () => async(dispatch,getState) => {
    const responce = await fetch("https://filmappserver.herokuapp.com/film/all");
    const films = await responce.json();
   if(responce.status ===200) {
    dispatch(allFilmsActionCreator(films));
    dispatch(noErrorActionCreator())
   }

    
}

const currentFilmActionCreator = (payload) => {
    return {type:CURRENT_FILM, payload:payload}
}

const fetchCurrentFilm = (title) => async(dispatch,getState) => {
    const responce = await fetch(`https://filmappserver.herokuapp.com/film/${title}`, {
        method:'GET',
        headers:{"Authorization": `${localStorage.getItem('token')}`}
    });

    if(responce.status===200) {
        const film = await responce.json();

    
    
        dispatch(currentFilmActionCreator(film));
    }

}

const addToFavouritesActionCreator = (payload) => {
    return {type:ADD_TO_FAVOURITES, payload:payload}
}

const fetchAddToFavourites = (filmTitle) => async(dispatch,getState) => {
    const responce = await fetch('https://filmappserver.herokuapp.com/film/add',{
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8',
        "Authorization": `${localStorage.getItem('token')}`},
        body:JSON.stringify({filmTitle})
       });

       if(responce.status===200) {
       
    const message = await responce.json();
    dispatch(addToFavouritesActionCreator(message));
    }


}

const addCommentActionCreator = (payload) => {
    return{type:ADD_COMMENT, payload:payload}
}

const fetchAddComment = (title,text) => async (dispatch,getState) => {
    const responce = await fetch(`https://filmappserver.herokuapp.com/film/${title}`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8',
        "Authorization": `${localStorage.getItem('token')}`},
        body:JSON.stringify({title:title, commentText:text})
       });

       if (responce.status === 200) {
        const comment = await responce.json();
    
        dispatch(addCommentActionCreator(comment))
       }

}

const rateFilmActionCreator = (payload) => {
    return{type:RATE_FILM,payload:payload}
}

const fetchRateFilm = (title,value) => async (dispatch,getState) => {
    const responce = await fetch(`https://filmappserver.herokuapp.com/film/${title}/rating`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json;charset=utf-8',
        "Authorization": `${localStorage.getItem('token')}`},
        body:JSON.stringify({title:title, rating:value})
       }); 
    
    if (responce.status === 200) {
        dispatch(rateFilmActionCreator());
    }
    
    
}

const filmRatingUserActionCreator = (payload) => {
    return {type:FILM_RATING_USER,payload:payload}
}

const fetchFilmRatingUser = (title) => async (dispatch,getState) => {
    const responce = await fetch(`https://filmappserver.herokuapp.com/film/${title}/rating`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8',
        "Authorization": `${localStorage.getItem('token')}`},
        body:JSON.stringify({title:title})
       });
    if (responce.status ===200) {
        const rating = await responce.json();
    
        dispatch(filmRatingUserActionCreator(rating));
    }

    
}

export {fetchAllFilms,fetchCurrentFilm, fetchAddToFavourites, fetchAddComment,fetchRateFilm,fetchFilmRatingUser}


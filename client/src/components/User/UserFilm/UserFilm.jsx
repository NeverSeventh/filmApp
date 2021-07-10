import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentFilm } from "../../../redux/AC/films";
import FilmPreview from "../../AllFilms/FilmPreview/FilmPreview"
import Rating from "../../Rating/Rating"




const UserFilm = ({userid,film}) => {
   


    


    return (
        <>
        <FilmPreview link={'/film/'} film={film}/>
        { <Rating  title={film.title}/>}
        </>
    )
}


export default UserFilm;
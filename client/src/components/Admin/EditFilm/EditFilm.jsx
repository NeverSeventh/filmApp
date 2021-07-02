import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCurrentFilm } from "../../../redux/AC/films";




const EditFilm = () => {

    let {title} = useParams();

   // let currentFilm = useSelector(state=> state.currentFilm);
    const dispatch = useDispatch();
    const editFilmHandler = (e) => {
        e.preventDefault();
    }
    
    const [elements,setEl] = useState('');


    
    useEffect(()=> {
        const fetchFilm = async() => {
            const responce = await fetch(`http://localhost:6970/film/${title}`);
            const filmData = await responce.json();
            
            const {film} = filmData;

            setEl(<form onSubmit={editFilmHandler}>
                
                <textarea name=""  id="input" cols="30" rows="10"   defaultValue={film.title}></textarea>
                
                
                <textarea name="" id="" cols="30" rows="10" defaultValue={film.description}></textarea>
                <button type="submit">Редактировать</button>
    
            </form>)
        
        }
        fetchFilm();
       
        
       
    },[]);
    
    

    
    return (
        <>
         {elements}</>
       
        // <form onSubmit={editFilmHandlet}>
        //     <h1 className="currentFilm__title">{currentFilm?.film?.title}</h1>
        //     <textarea name=""  id="input" cols="30" rows="10"   defaultValue={currentFilm?.film?.title}></textarea>
            
            
        //     <textarea name="" id="" cols="30" rows="10" defaultValue={currentFilm?.film?.description}></textarea>
        //     <button type="submit">Редактировать</button>
        // </form>
    )
}



export default EditFilm;
import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchEditFilm } from "../../../redux/AC/admin";




const EditFilm = () => {

    let {title} = useParams();

   
    const dispatch = useDispatch();

    const history = useHistory();
    const [elements,setEl] = useState('');

    const editFilmHandler = (e) => {
        e.preventDefault();
        const {title,desc} = e.target;

        dispatch(fetchEditFilm(title.id,title.value,desc.value));
        history.push(`/film/${title.value}`)
    }
    
    useEffect(()=> {
        const fetchFilm = async() => {
            const responce = await fetch(`http://localhost:6970/film/${title}`);
            const filmData = await responce.json();
            
            const {film} = filmData;
            setEl(<form onSubmit={editFilmHandler}>
                
                <textarea name="title"  id={film?.id} cols="30" rows="10"   defaultValue={film?.title}></textarea>
                
                
                <textarea name="desc" id="" cols="30" rows="10" defaultValue={film?.description}></textarea>
                <button type="submit">Редактировать</button>
    
            </form>)
        
        }
        fetchFilm();
       
        
       
    },[]);
    
    

    
    return (
        <>
         {elements}</>
       
    )
}



export default EditFilm;
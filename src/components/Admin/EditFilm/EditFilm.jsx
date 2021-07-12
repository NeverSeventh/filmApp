import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchEditFilm } from "../../../redux/AC/admin";
import '../admin.scss';



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
            const responce = await fetch(`https://filmappserver.herokuapp.com/film/${title}`);
            const filmData = await responce.json();
            
            const {film} = filmData;
            setEl(<form onSubmit={editFilmHandler}>
                <div className="admin__block"><input className="admin__title" name="title"  id={film?.id}  defaultValue={film?.title}></input></div>
                
                
                
                <textarea name="desc" className="admin__desc" id="" cols="60" rows="10" defaultValue={film?.description}></textarea>
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
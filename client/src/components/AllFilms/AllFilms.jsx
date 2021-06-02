import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAllFilms } from '../../redux/AC/films';

const AllFilms = () => {

   
    const films = useSelector(state=>state.films);
    
    const dispatch = useDispatch();
    

    
    useEffect(()=> {
        dispatch(fetchAllFilms());
    },[]) 
    
    const filmsLinks = films?.map(el=> {
        return <li> <NavLink  to={"/film/"+el.filmLink}>{el.title}</NavLink></li>
    })
    

   
    return(
        <ul>
            {filmsLinks}
        </ul>
    )
}


export default AllFilms;
import FilmPreview from "../../AllFilms/FilmPreview/FilmPreview"
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchAllFilms } from "../../../redux/AC/films";
const AdminFilms = () => {

   const films = useSelector(state=>state.films);
    
   const dispatch = useDispatch();
   
   
   
   useEffect(()=> {
       dispatch(fetchAllFilms());
   },[]) 

   const filmsLinks = films?.map(el=> {
      return <li> <FilmPreview film={el} link = "/admin/"></FilmPreview></li>
  })

   return (
   <ul>
      {filmsLinks}
   </ul>
   )
}


export default AdminFilms;